import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
