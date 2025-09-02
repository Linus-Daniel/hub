import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// Handler for Next.js App Router (app/api/auth/[...nextauth]/route.ts)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
