import authConfig from '@/auth.config';
import { db } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'database',
  },
  ...authConfig,
});
