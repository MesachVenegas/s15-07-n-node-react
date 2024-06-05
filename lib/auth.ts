import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { NextAuthOptions, User, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { loginUser } from "@/services";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       username: string;
//       email: string;
//       image: string;
//       token: string;
//     };
//   }
// }

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter( prisma ),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    async jwt( { token, user } ) {
      if ( user ) {
        token = { ...token, ...user };
      }

      return token;
    },
    async session( { session, token } ) {
      if ( token ) {
        session.user = {
          ...session.user,
          ...token,
        } as any;
      }

      return session;
    },
    async signIn( { account, profile } ) {
      if ( account?.provider === "google" ) {
        if ( profile?.email && profile.name ) {
          // Verificar si el usuario ya existe en la base de datos
          let userFound = await prisma.user.findUnique( {
            where: { email: profile.email },
          } );
          // Si el usuario no existe, crear uno nuevo
          if ( !userFound ) {
            await prisma.user.create( {
              data: {
                username: profile.name,
                email: profile.email,
                image: profile.image,
              },
            } );
          } else {
            // Si el usuario ya existe, actualizar la información
            userFound = await prisma.user.update( {
              where: { email: profile.email },
              data: {
                username: profile.name,
                email: profile.email,
                image: profile.image,
                // googleAccountId: account.id, // Actualizar el ID de la cuenta de Google
              },
            } );
          }
        }
      }
      if ( account?.provider === "github" ) {
        if ( profile?.email && profile.name ) {
          // Verificar si el usuario ya existe en la base de datos
          let userFound = await prisma.user.findUnique( {
            where: { email: profile.email },
          } );
          // Si el usuario no existe, crear uno nuevo
          if ( !userFound ) {
            await prisma.user.create( {
              data: {
                username: profile.name,
                email: profile.email,
                image: profile.image || null,
              },
            } );
          } else {
            // Si el usuario ya existe, actualizar la información
            userFound = await prisma.user.update( {
              where: { email: profile.email },
              data: {
                username: profile.name,
                email: profile.email,
                image: profile.image,
              },
            } );
          }
        }
      }
      return true;
    },
  },
  providers: [
    Credentials( {
      name: "Credentials",
      credentials: {},
      async authorize( credentials: any ) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const userFound = await prisma.user.findUnique( {
          where: { email },
        } );

        if ( !userFound ) throw new Error( "Usuario no encontrado" );

        let matchPassword = false;

        if ( userFound && userFound.password ) {
          matchPassword = await bcrypt.compare( password, userFound.password );
        }

        if ( !matchPassword )
          throw new Error(
            "Contraseña incorrecta. Por favor, inténtalo de nuevo."
          );

        const { password: _, ...resto } = userFound;
        return resto;
      }
    } ),
    GoogleProvider( {
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    } ),
    GitHubProvider( {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    } ),
    LinkedInProvider( {
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    } ),
  ],
};

export const { handlers, auth, signIn, signOut } = nextAuth( authOptions );
