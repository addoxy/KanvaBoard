import authConfig from '@/auth.config';
import { db } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { getUserById } from './utils/db';

const adapter = PrismaAdapter(db);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ account, user }) {
      // allow oauth to sign in without email verification
      if (account?.provider !== 'credentials') {
        return true;
      }

      if (!user.id) {
        return false;
      }

      // prevent credentials sign in without email verification
      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
  ...authConfig,
});
