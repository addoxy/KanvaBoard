import userRoutes from '@/app/api/routes/user';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import workspaceRoutes from '../routes/workspace';

const app = new Hono().basePath('/api');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/user', userRoutes).route('/workspace', workspaceRoutes);

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
