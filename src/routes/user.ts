import { db } from '@/lib/prisma';
import { signInSchema, signUpSchema } from '@/schemas/auth';
import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcrypt';
import { Hono } from 'hono';

const userRoutes = new Hono()
  .post('/sign-in', zValidator('json', signInSchema), (c) => {
    const { email, password } = c.req.valid('json');

    return c.json({ success: 'ok' });
  })
  .post('/sign-up', zValidator('json', signUpSchema), async (c) => {
    const { email, password } = c.req.valid('json');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email has been taken
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      console.log(existingUser);
      return c.json({ success: false, message: 'Email already in use!' }, 409);
    }

    // Create the user if the email has not been taken
    await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return c.json({ success: true, message: 'Account created successfully!' }, 200);
  });

export default userRoutes;
