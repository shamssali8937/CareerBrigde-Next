import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { handleSignIn } from "@/controllers/oauthController";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {

   async signIn({ user, account, profile, credentials, email }) {
  // const type = account?.type;
  // const role = account?.role;

  const dbUser = await handleSignIn({ user, account, profile });

  if (!dbUser) return false;

  user.id = dbUser.id;
  user.email = dbUser.email;
  user.role = dbUser.role;

  return true;

  // return await handleSignIn({ user, account, profile });
},

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/Auth/Signin",
    error: "/Auth/Signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };