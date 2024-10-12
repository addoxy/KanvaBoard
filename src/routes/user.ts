import { signIn } from '@/auth';
import { db } from '@/lib/prisma';
import { signInSchema, signUpSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/utils/db';
import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcryptjs';
import { Hono } from 'hono';
import { AuthError } from 'next-auth';

const userRoutes = new Hono()
  .post('/sign-in', zValidator('json', signInSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      return c.json({ success: true, message: 'Successfully signed in!' });
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

      return c.json({ success: true, message: 'Account created successfully!' }, 200);
    } catch {
      return c.json({ success: false, message: 'Unable to create account!' }, 500);
    }
  });

export default userRoutes;
