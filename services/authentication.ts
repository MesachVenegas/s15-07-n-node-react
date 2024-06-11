'use server'


import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { UserProps } from "@/types/interface";
import { LoginSchema, RegisterSchema } from '@/validations/auth';


/**
 * Authenticates a user in the database.
 *
 * @param {z.infer<typeof LoginSchema>} data - The user credentials for authentication.
 * @returns {Promise<string | null>} Returns a message if authentication fails, or null if successful.
 * @throws {Error} If an error occurs during authentication.
 */
export async function Authenticate(data: z.infer<typeof LoginSchema>): Promise<void> {
  try {
    await signIn("credentials", {
      ...data,
      redirectTo: '/first-steps',
    });

    return;
  } catch (error) {
    if(error instanceof AuthError){
      throw error.cause?.err?.message;
    }
    throw error
  }
}


/**
 * Authenticates a user using the specified provider.
 *
 * @param {string} provider - The provider to use for authentication. Must be one of 'google', 'github', or 'linkedin'.
 * @return {Promise<void>} - A promise that resolves when the authentication is successful, or rejects with an error if authentication fails.
 * @throws {Error} - If an error occurs during the authentication process.
 */
export async function ProviderAuth(provider: 'google' | 'github' | 'linkedin'): Promise<void> {
  // TODO: Add verification if user has already goal configured to redirect to app or first steps.
  try {
    await signIn(provider, {
      redirectTo: '/first-steps',
    })

    return;
  } catch (error) {
    throw error;
  }
}


/**
 * Registers a new user in the database.
 *
 * @param {z.infer<typeof RegisterSchema>} data - The user data to be registered.
 * @return {Promise<User>} The newly created user.
 */
export async function registerNewuser(data: z.infer<typeof RegisterSchema>): Promise<UserProps>{
  try {
    const {username, email, password} = data

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = prisma.user.create({
      data :{
        username,
        email,
        password: hashedPassword
      }
    })

    const { password: _, ...user } = await newUser

    return user;
  } catch (error) {
    throw error;
  }
}
