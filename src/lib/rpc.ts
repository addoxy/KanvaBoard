import { AppType } from '@/app/api/[[...route]]/route';
import { hc } from 'hono/client';

const client = hc<AppType>(process.env.NEXT_PUBLIC_URL!);

export const api = client.api;
