import { UNAUTHORIZED_MESSAGE } from '@/lib/constants';
import { db } from '@/lib/prisma';
import { createWorkspaceSchema } from '@/schemas/workspace-schemas';
import { getUser } from '@/utils/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const workspaceRoutes = new Hono()
  .get('/get-workspaces', async (c) => {
    const user = await getUser();
    if (!user || !user.id) {
      return c.json({ success: false, message: UNAUTHORIZED_MESSAGE }, 401);
    }

    try {
      const workspaces = await db.workspace.findMany({
        where: {
          userId: user.id,
        },
      });

      return c.json({ success: true, data: workspaces }, 200);
    } catch {
      return c.json({ success: false, message: 'Unable to get workspaces!' }, 500);
    }
  })
  .post('/create-workspace', zValidator('json', createWorkspaceSchema), async (c) => {
    const user = await getUser();
    if (!user || !user.id) {
      return c.json({ success: false, message: UNAUTHORIZED_MESSAGE }, 401);
    }

    const { name } = c.req.valid('json');

    try {
      await db.workspace.create({
        data: {
          name,
          userId: user.id,
        },
      });
      return c.json({ success: true, message: 'Successfully created workspace' }, 200);
    } catch {
      return c.json({ success: false, message: 'Unable to create workspace!' }, 500);
    }
  });

export default workspaceRoutes;
