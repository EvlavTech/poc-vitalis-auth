import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
  // session: {
  //   maxAge: 360000,
  // },
  // jwt: {
  //   maxAge: 360000,
  // },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return "/";
    // },
    async jwt({ token, account, user }) {
      if (account) {
        console.log("token", token);
        console.log("account", account);
        console.log("user", user);
      }

      return token;
    },
    async session({ session, token }) {
      console.log("session", session);
      console.log("token", token);
      if (session) {
        session = Object.assign({}, session, {
          id_token: token.id_token,
        });
        session = Object.assign({}, session, {
          authToken: token.myToken,
        });
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST, handler };
