'use server'

import bcrypt from 'bcryptjs';

import { z } from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from "@/auth";
import prisma from "@/lib/prisma"
import { LoginSchema, RegisterSchema } from '@/validations/auth';
import { UserProps } from "@/types/interface";


/**
 * Authenticates a user in the database.
 *
 * @param {z.infer<typeof LoginSchema>} data - The user credentials for authentication.
 * @returns {Promise<string | null>} Returns a message if authentication fails, or null if successful.
 * @throws {Error} If an error occurs during authentication.
 */
export async function Authenticate(data: z.infer<typeof LoginSchema>) {
  try {
    await signIn("credentials", {
      ...data,
      redirectTo: '/first-steps',
    });

    return;
  } catch (error) {
    if(error instanceof AuthError){
      return error.cause?.err?.message;
    }
    throw error
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
