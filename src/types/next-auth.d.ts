import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      emailVerified?: Date | null;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    emailVerified?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    emailVerified?: Date | null;
    provider?: string;
    accessToken?: string;
  }
}
