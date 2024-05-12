import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      type: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          placeholder: "email",
          type: "email",
        },
        password: {
          type: "password",
          label: "password",
          placeholder: "password",
        },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        // console.log("cred", credentials, "req", req);
        //check user in db
        const user = await prisma?.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) throw new Error("user not found");
        //check password
        const checkPassword = await bcrypt.compare(
          credentials?.password!,
          user?.password
        );
        if (!checkPassword) throw new Error("password incorrect");
        return {
          email: user.email,
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params) {
      return params.token;
    },
    session({ session, token }) {
      //@ts-ignore
      const newSesion = {
        ...session,
        user: { ...session.user, id: token.sub },
      };
      return newSesion;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
