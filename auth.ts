import NextAuth from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from "@/lib/prisma"
import config from '@/aut.config';


export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  callbacks: {
    async session({ session}){
      return session;
    },
    async jwt({ token }){
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...config,
});
