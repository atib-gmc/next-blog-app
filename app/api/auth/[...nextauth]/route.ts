import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      //@ts-ignore
      async authorize(credentials, _req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(
          credentials?.password!,
          user.password
        );

        if (!checkPassword) {
          throw new Error("Password is incorrect");
        }

        return {
          email: user.email,
          id: user.id,
          name: user.name,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
