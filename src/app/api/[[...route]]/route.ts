import userRoutes from '@/routes/user';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

const routes = app.route('/user', userRoutes);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
