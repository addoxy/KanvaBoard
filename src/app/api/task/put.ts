import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT_TASKS(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return SendResponse(errors.unauthorized, 401);
  }

  const user = session.user;

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user?.email as string,
    },
  });

  if (!prismaUser) {
    return SendResponse(errors.forbidden, 403);
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    console.log("no query");
    return SendResponse(errors.badRequest, 400);
  }

  if (query === "update") {
    const newContent = searchParams.get("newContent");
    const id = searchParams.get("id");

    if (!newContent || !id) {
      console.log("query: update, no newContent, id");
      return SendResponse(errors.badRequest, 400);
    }
    try {
      await prisma.task.update({
        where: {
          id,
        },
        data: {
          content: newContent,
        },
      });
      return SendResponse("Successfully updated thet task", 200);
    } catch (error) {
      return SendResponse("Unable to update the task", 500);
    }
  }

  if (query === "reorderSame") {
    console.log("reordering same");
    const columnId = searchParams.get("columnId");
    const activeTaskId = searchParams.get("activeTaskId");
    const activeOrder = searchParams.get("activeOrder");
    const overOrder = searchParams.get("overOrder");

    if (!columnId || !activeTaskId || !activeOrder || !overOrder) {
      console.log("query: reorderSame, missing stuff");
      return SendResponse(errors.badRequest, 400);
    }

    if (overOrder > activeOrder) {
      // ttb: active + 1 to over: order - 1
      // active: newOrder
      try {
        await prisma.$transaction([
          prisma.task.updateMany({
            where: {
              columnId: columnId,
              order: {
                gte: parseInt(activeOrder) + 1,
                lte: parseInt(overOrder),
              },
            },
            data: {
              order: {
                decrement: 1,
              },
            },
          }),
          prisma.task.update({
            where: {
              id: activeTaskId,
            },
            data: {
              order: parseInt(overOrder),
            },
          }),
        ]);
        console.log("done reordering same");
        return SendResponse("Successfully updated task order", 200);
      } catch (error) {
        return SendResponse("Unable to update task order", 500);
      }
    } else {
      // btt: over to active - 1: order + 1
      // active: newOrder
      try {
        await prisma.$transaction([
          prisma.task.updateMany({
            where: {
              columnId: columnId,
              order: {
                gte: parseInt(overOrder),
                lte: parseInt(activeOrder) - 1,
              },
            },
            data: {
              order: {
                increment: 1,
              },
            },
          }),
        ]);
        console.log("done reordering same");
        return SendResponse("Successfully updated task order", 200);
      } catch (error) {
        return SendResponse("Unable to update task order", 500);
      }
    }
  }

  if (query === "dropInColumn") {
    console.log("placing task in solo column");
    const taskId = searchParams.get("taskId");
    const activeOrder = searchParams.get("activeOrder");
    const overOrder = searchParams.get("overOrder");
    const oldColumnId = searchParams.get("oldColumnId");
    const newColumnId = searchParams.get("newColumnId");

    if (!taskId || !activeOrder || !oldColumnId || !newColumnId || !overOrder) {
      console.log("query: dropInColumn, missing stuff");
      return SendResponse(errors.badRequest, 400);
    }

    try {
      await prisma.$transaction([
        prisma.task.updateMany({
          where: {
            columnId: oldColumnId,
            order: {
              gte: parseInt(activeOrder) + 1,
            },
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        }),
        prisma.task.update({
          where: {
            id: taskId,
          },
          data: {
            columnId: newColumnId,
            order: parseInt(overOrder),
          },
        }),
      ]);
      console.log("done placing task in solo column");
      return SendResponse("Successfully updated task order", 200);
    } catch (error) {
      return SendResponse("Unable to update task order", 500);
    }
  }

  if (query === "dropDifferent") {
    console.log("reordering different");
    const taskId = searchParams.get("taskId");
    const oldColumnId = searchParams.get("oldColumnId");
    const newColumnId = searchParams.get("newColumnId");
    const activeOrder = searchParams.get("activeOrder");
    const overOrder = searchParams.get("overOrder");

    if (!taskId || !oldColumnId || !newColumnId || !activeOrder || !overOrder) {
      console.log("query: dropDifferent, missing stuff");
      return SendResponse(errors.badRequest, 400);
    }

    try {
      // oldColumn: order of all tasks from active + 1 to end: -1
      // newColumn: order of all tasks from over to end: +1
      // task: overOrder
      await prisma.$transaction([
        prisma.task.updateMany({
          where: {
            columnId: oldColumnId,
            order: {
              gte: parseInt(activeOrder) + 1,
            },
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        }),
        prisma.task.updateMany({
          where: {
            columnId: newColumnId,
            order: {
              gte: parseInt(overOrder),
            },
          },
          data: {
            order: {
              increment: 1,
            },
          },
        }),
        prisma.task.update({
          where: {
            id: taskId,
          },
          data: {
            columnId: newColumnId,
            order: parseInt(overOrder),
          },
        }),
      ]);
      console.log("done reordering different");
      return SendResponse("Successfully reordered tasks", 200);
    } catch (error) {
      return SendResponse("Unable to reorder tasks", 500);
    }
  }
  console.log("invalid query");
  return SendResponse(errors.badRequest, 400);
}
