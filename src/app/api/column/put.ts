import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT_COLUMNS(req: Request, res: Response) {
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

  if (query === "title") {
    const columnId = searchParams.get("columnId");
    const newTitle = searchParams.get("newTitle");

    if (!columnId || !newTitle) {
      return SendResponse(errors.badRequest, 400);
    }

    try {
      await prisma.column.update({
        where: {
          id: columnId,
        },
        data: {
          title: newTitle,
        },
      });

      return SendResponse("Successfully updated column title", 200);
    } catch (error) {
      return SendResponse("Unable to update column title", 500);
    }
  }

  if (query === "reorder") {
    const boardId = searchParams.get("boardId");
    const activeColumnId = searchParams.get("activeColumnId");
    const activeOrder = searchParams.get("activeOrder");
    const overOrder = searchParams.get("overOrder");

    if (!activeColumnId || !activeOrder || !overOrder || !boardId) {
      return SendResponse(errors.badRequest, 400);
    }

    if (overOrder > activeOrder) {
      // left to right
      // active + 1 to over(included): order - 1
      // active: overOrder
      try {
        await prisma.$transaction([
          prisma.column.updateMany({
            where: {
              boardId: boardId,
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
          prisma.column.update({
            where: {
              id: activeColumnId,
            },
            data: {
              order: parseInt(overOrder),
            },
          }),
        ]);

        return SendResponse("Successfully reorder columns", 200);
      } catch (error) {
        return SendResponse("Unable to reorder columns", 500);
      }
    } else {
      // right to left
      // over(included) to active - 1: order + 1
      // active: overOrder
      try {
        await prisma.$transaction([
          prisma.column.updateMany({
            where: {
              boardId: boardId,
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
          prisma.column.update({
            where: {
              id: activeColumnId,
            },
            data: {
              order: parseInt(overOrder),
            },
          }),
        ]);
        return SendResponse("Successfully reorder columns", 200);
      } catch (error) {
        return SendResponse("Unable to reorder columns", 500);
      }
    }
  }

  return SendResponse(errors.badRequest, 400);
}
