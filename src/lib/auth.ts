import NextAuth  from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validators";
import TalentUser  from "@/models/User";
import { connectDB } from "./mongodb";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const validated = loginSchema.safeParse(credentials);

        if (!validated.success) {
          throw new Error("Invalid input");
        }

        const { email, password } = validated.data;

        const user = await TalentUser.findOne({ email }).select("+password");
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        // Update last login timestamp
        user.updatedAt = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          name: user.fullname,
          email: user.email,
          institution: user.institution,
          phone: user.phone,
          avatar: user.avatar || user.profilePicture,
          emailVerified: user.emailVerified,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.institution = (user as any).institution;
        token.phone = (user as any).phone;
        token.avatar = (user as any).avatar;
        token.branch = (user as any).branch;
        token.emailVerified = (user as any).emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        (session.user as any).institution = token.institution as string;
        (session.user as any).phone = token.phone as string;
        (session.user as any).avatar = token.avatar as string;
        (session.user as any).branch = token.branch as string;
        (session.user as any).emailVerified =
          token.emailVerified as Date | null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth", // custom login page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
