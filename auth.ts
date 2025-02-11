import NextAuth from "next-auth"
import { db } from '@/lib/db'
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})