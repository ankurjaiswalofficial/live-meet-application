import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: await bcrypt.hash(credentials.password, 10),
              image: "",
              name: credentials.email.split("@")[0],
              provider: "credentials",
            },
          });
          return newUser;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  // session: {
  //   strategy: "database",
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  callbacks: {
    // async jwt({ token, user }) {
    //   // if (user) {
    //   //   token.id = user.id;
    //   // }
    //   return token;
    // },
    // async session({ session, token }) {
    //   // if (session?.user) {
    //   //   // @ts-ignore
    //   //   session.user.id = token.id as string;
    //   // }
    //   return session;
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   // if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   // else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    async signIn({ user, account }) {
      const { email } = user;
      if (!account) { return false; }
      if (account.provider === "google" || account.provider === "github") {
        // Check if an account exists with this email
        const existingUser = await prisma.user.findFirst({
          where: { email: email! },
        });

        if (existingUser) {
          // If the account exists but the provider is not linked, update the provider
          await prisma.user.update({
            where: { email: email! },
            data: {
              name: user.name,
              image: user.image,
              provider: account.provider, // Linking the new provider
            },
          });
          // if (!existingUser.password) {
          //   // This means the user signed up with OAuth, no need to check for password
          // } else {
          //   // If they signed up with credentials and are now using OAuth, link the provider
          //   await prisma.user.update({
          //     where: { email: email! },
          //     data: {
          //       provider: account.provider, // Link the new provider
          //       name: user.name,
          //       image: user.image,
          //     },
          //   });
          // }
        } else {
          // If no existing user, create a new account with OAuth provider
          await prisma.user.create({
            data: {
              name: user.name,
              email: email!,
              image: user.image,
              provider: account.provider, // Store the provider
              password: "", // No password for OAuth users
            },
          });
        }
      }
      return true;
    },
  },
  // pages: {
  //   signIn: "/api/auth/signin",
  //   // error: '/auth/error', // Custom error page
  // },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
