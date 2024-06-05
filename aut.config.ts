import type { NextAuthConfig } from "next-auth";

import bcrypt from 'bcryptjs';

import Google from 'next-auth/providers/google';
import Linkedin from 'next-auth/providers/linkedin';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from "./services";

const getUser = async () => {
  return null
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Linkedin({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (Credentials) => {
        const { email, password } = Credentials;
        // verify if user exists
        const existingUser = await getUserByEmail(email as string);
        if(!existingUser) throw new Error('User not found');
        // if user exists, verify password match and return user data.
        const { data } = existingUser;
        if(existingUser) {
          const match = await bcrypt.compare(password as string , data?.password as string);
          if(!match) throw new Error('Invalid password');

          return data;
        }
        // return null if credentials are invalid
        return null
      }
    }),
  ],
} satisfies NextAuthConfig;