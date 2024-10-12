import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { signInSchema } from './schemas/auth';
import { getUserByEmail } from './utils/db';

export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          /* Need to check for password because the user could try to login using his OAuth email */
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            console.log('-------------ALL CHECKS PASSED-------------');
            console.log(user);
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
