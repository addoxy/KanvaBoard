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
    const columns = searchParams.get("columns");

    if (!boardId || !columns) {
      return SendResponse(errors.badRequest, 400);
    }

    try {
      const newColumns = JSON.parse(columns);
      console.log(newColumns);

      for (let i = 0; i < newColumns.length; i++) {
        await prisma.column.update({
          where: {
            id: newColumns[i].id,
          },
          data: {
            order: i + 1,
          },
        });
      }

      return SendResponse("Successfully reordered columns", 200);
    } catch (error) {
      return SendResponse("Unable to update column order", 500);
    }
  }

  return SendResponse(errors.badRequest, 400);
}
