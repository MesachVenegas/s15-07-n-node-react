'use server'

import { z } from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from "@/auth";
import prisma from "@/lib/prisma"
import { LoginSchema } from '@/validations/auth';
import { LoginProps } from "@/types/interface";
import credentials from 'next-auth/providers/credentials';



/**
 * Authenticates a user in the database.
 *
 * @param {LoginSchema} data - The user credentials for authentication.
 * @returns {Promise<LoginProps | null>} Returns a message and the user data if authentication is successful.
*/
export default async function Authenticate(data: z.infer<typeof LoginSchema>) {
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
