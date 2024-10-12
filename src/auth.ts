import authConfig from '@/auth.config';
import { db } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

const adapter = PrismaAdapter(db);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter,
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
  pages: {
    signIn: '/sign-in',
  },
});
