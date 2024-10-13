import { signIn } from '@/auth';
import { db } from '@/lib/prisma';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/resend';
import {
  changePasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from '@/schemas/auth';
import {
  generatePasswordResetToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getUserByEmail,
  getVerificationTokenByToken,
} from '@/utils/db';
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
          { success: false, message: 'Account created but unable to send verification link!' },
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
  )
  .post('/send-reset-password-email', zValidator('json', resetPasswordSchema), async (c) => {
    const { email } = c.req.valid('json');

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return c.json({ success: false, message: 'User does not exist!' }, 400);
    }

    try {
      const passwordResetToken = await generatePasswordResetToken(email);
      await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

      return c.json({ success: true, message: 'Verification email sent!' }, 200);
    } catch {
      return c.json({ success: true, message: 'Unable to send reset link!' }, 200);
    }
  })
  .post('/change-password', zValidator('json', changePasswordSchema), async (c) => {
    const { password, token } = c.req.valid('json');

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return c.json({ success: false, message: 'Password reset token does not exist!' }, 400);
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return c.json({ success: false, message: 'Password reset token has expired!' }, 400);
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return c.json({ success: false, message: 'Email does not exist!' }, 400);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });

      return c.json({ success: true, message: 'Successfully reset password!' }, 200);
    } catch {
      return c.json({ success: false, message: 'Unable to reset password!' }, 500);
    }
  });

export default userRoutes;
