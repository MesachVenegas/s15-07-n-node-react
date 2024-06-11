'use server'

import { z } from "zod";
import prisma from "@/lib/prisma"; // Asegúrate de que este camino sea correcto
import {
  RegisterUser,
  ChangePasswordUser,
  ForgetPasswordUser,
  ChangePasswordSchema,
} from "@/validations/auth";
import { RegisterSchema } from "@/validations/auth";
import {
  RegisterSetting,
  registerSettingSchema,
} from "@/validations/settingSchema"; // Ajusta el camino según sea necesario
import bcrypt from "bcryptjs"; // Ensure you have bcryptjs installed
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { render } from "@react-email/components";
import Email from "@/emails";
import { LoginProps, SettingProps, UserProps } from '@/types/interface';

// TODO: fix resend instance to work;
// const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Registers a new user in the database if the email is not already taken.
 *
 * This function checks if a user with the provided email already exists. If not,
 * it hashes the password and creates a new user record in the database.
 *
 * @example
 * const { message, data } = await registerUser({
 *   name: 'John Doe',
 *   email: 'johndoe@example.com',
 *   password: 'securePassword123',
 *   image: 'path/to/image.png'
 * });
 *
 * @param {RegisterUser} data - The user data to be registered.
 * @returns {Promise<{message: string; data: UserProps | null}>} Returns a message and the user data (without the password) if registration is successful.
 */

export async function registerUser(
  data: z.infer<typeof RegisterSchema>
): Promise<{ message: string; data: UserProps | null }> {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        image: data.image,
      },
    });

    return {
      message: "User registered successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        image: newUser.image,
      },
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Authenticates a user in the database.
 *
 * This function checks if a user with the provided email exists. If so,
 * it verifies the password and returns the user data if authentication is successful.
 *
 * @example
 * const { message, data } = await loginUser({
 *   email: 'johndoe@example.com',
 *   password: 'securePassword123'
 * });
 *
 * @param {LoginUser} data - The user credentials for authentication.
 * @returns {Promise<{message: string; data: LoginProps | null}>} Returns a message and the user data if authentication is successful.
 */

export async function getUserByEmail(
  email: string
): Promise<{ message: string; data: UserProps | null }> {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    return { message: "success", data: user };
  } catch (error) {
    console.error(error);
    throw new Error("Login failed");
  }
}

/**
 * Changes the password for a user in the database.
 *
 * This function validates the new password and updates it in the database
 * if the user exists.
 *
 * @example
 * const { message } = await changePassword({
 *   userId: 1,
 *   password: 'NewSecurePassword123',
 *   confirm: 'NewSecurePassword123'
 * });
 *
 * @param {number} userId - The ID of the user changing the password.
 * @param {ChangePasswordUser} data - The new password data.
 * @returns {Promise<{message: string}>} Returns a message indicating the result of the operation.
 */

export async function changePassword(
  userId: number,
  data: ChangePasswordUser
): Promise<{ message: string }> {
  try {
    // Validate input data against schema
    ChangePasswordSchema.parse(data);

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: String(userId) },
    });

    if (!user) {
      return { message: "User not found" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { id: String(userId) },
      data: { password: hashedPassword },
    });

    return { message: "Password changed successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Password change failed");
  }
}

/**
 * Handles password reset request.
 *
 * This function checks if a user with the provided email exists. If so,
 * it generates a password reset token and simulates sending an email
 * with instructions to reset the password.
 *
 * @example
 * const { message } = await forgetPassword({
 *   email: 'johndoe@example.com'
 * });
 *
 * @param {ForgotPasswordUser} data - The email for password reset.
 * @returns {Promise<{message: string}>} Returns a message indicating the result of the operation.
 */

export async function forgetPassword(
  data: ForgetPasswordUser
): Promise<{ message: string }> {
  try {
    const email = data.email;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      return { message: "User not found" };
    }

    const token = jwt.sign({ data: user.username }, "secreto", {
      expiresIn: "86400",
    });

    const resetPasswordLink = `${process.env.NEXTAUTH_URL}/token=${token}`;
    const userFirstname = user.username;

    // TODO: Fix resend instance to send emails.
    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: email,
    //   subject: "Change password",
    //   html: render(Email({ userFirstname, resetPasswordLink })),
    // });

    return { message: "Password reset instructions sent to your email" };
  } catch (error) {
    console.error(error);
    throw new Error("Password reset request failed");
  }
}

/**
 * Registers a new setting in the database.
 *
 * This function validates the setting data using a schema, ensures the user ID is valid,
 * and creates a new setting record in the database.
 *
 * @example
 * const { message, data } = await registerSetting({
 *   currency: 'USD',
 *   notify: true,
 *   userId: 'some-user-id'
 * });
 *
 * @param {RegisterSetting} data - The setting data to be registered.
 * @returns {Promise<{message: string; data: SettingProps}>} Returns a message and the setting data if registration is successful.
 */

export async function registerSetting(
  data: RegisterSetting
): Promise<{ message: string; data: SettingProps }> {
  try {
    // Validar los datos utilizando el esquema de Zod
    const validatedData = registerSettingSchema.parse(data);

    // Asegurar que userId no es undefined
    if (!validatedData.users) {
      throw new Error(
        "The 'users' field is required and cannot be undefined."
      );
    }

    // Crear el registro en la base de datos usando Prisma
    const newSetting = await prisma.setting.create({
      data: {
        currency: validatedData.currency,
        notify: validatedData.notify,
        userId: validatedData.users, // Asegúrate de que siempre se proporcione un userId válido
      },
    });

    return {
      message: "Setting registered successfully",
      data: {
        currency: newSetting.currency,
        notify: newSetting.notify,
        userId: newSetting.userId,
      },
    };
  } catch (error) {
    throw new Error("Registration failed");
  }
}
