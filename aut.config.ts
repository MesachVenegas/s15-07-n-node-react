import type { NextAuthConfig } from "next-auth";

import Apple from 'next-auth/providers/apple';
import Google from 'next-auth/providers/google';
import Linkedin from 'next-auth/providers/linkedin';
import Credentials from 'next-auth/providers/credentials';


export default {
  providers: [
    Apple({
      clientId: '',
      clientSecret: '',
    }),
    Google({
      clientId: '',
      clientSecret: '',
    }),
    Linkedin({
      clientId: '',
      clientSecret: '',
    }),
    Credentials({
      authorize: async (Credentials) => {
        const { email, password } = Credentials;
        
        return null
      }
    }),
  ],
} satisfies NextAuthConfig;