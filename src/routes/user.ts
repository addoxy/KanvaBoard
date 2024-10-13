import { signIn } from '@/auth';
import { db } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/resend';
import { signInSchema, signUpSchema } from '@/schemas/auth';
import { generateVerificationToken, getUserByEmail, getVerificationTokenByToken } from '@/utils/db';
import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcryptjs';
import { Hono } from 'hono';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const userRoutes = new Hono()
  .post('/sign-in', zValidator('json', signInSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return c.json({ success: false, message: 'User does not exist!' }, 400);
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email);
      await sendVerificationEmail(verificationToken.email, verificationToken.token);

      return c.json({ success: true, message: 'Verification email sent!' }, 200);
    }

    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      return c.json({ success: true, message: 'Successfully signed in!' }, 200);
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.type === 'CredentialsSignin') {
          return c.json({ success: false, message: 'Invalid credentials!' }, 401);
        }
      }

      return c.json({ success: false, message: 'Unable to sign in!' }, 500);
    }
  })
  .post('/sign-up', zValidator('json', signUpSchema), async (c) => {
    const { email, password } = c.req.valid('json');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email has been taken
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return c.json({ success: false, message: 'Email already in use!' }, 409);
    }

    try {
      // Create the user if the email has not been taken
      await db.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });

      try {
        // send verfication email
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return c.json({ success: true, message: 'Verification email sent!' }, 200);
      } catch (error) {
        return c.json(
          { success: false, message: 'Account created but unable to send verification token!' },
          500
        );
      }
    } catch {
      return c.json({ success: false, message: 'Unable to create account!' }, 500);
    }
  })
  .post(
    '/verify-email',
    zValidator(
      'json',
      z.object({
        token: z.string(),
      })
    ),
    async (c) => {
      const { token } = c.req.valid('json');

      const existingToken = await getVerificationTokenByToken(token);
      if (!existingToken) {
        return c.json({ success: false, message: 'Verification token does not exist!' }, 400);
      }

      const hasExpired = new Date(existingToken.expires) < new Date();
      if (hasExpired) {
        return c.json({ success: false, message: 'Verification token has expired!' }, 400);
      }

      const existingUser = await getUserByEmail(existingToken.email);
      if (!existingUser) {
        return c.json({ success: false, message: 'Email does not exist!' }, 400);
      }

      try {
        await db.user.update({
          where: { id: existingUser.id },
          data: {
            emailVerified: new Date(),
            email: existingToken.email,
          },
        });

        await db.verificationToken.delete({
          where: {
            id: existingToken.id,
          },
        });

        return c.json({ success: true, message: 'Successfully verified email!' }, 200);
      } catch (error) {
        return c.json({ success: false, message: 'Something went wrong!' }, 500);
      }
    }
  );

export default userRoutes;
