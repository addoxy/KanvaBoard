import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET_BOARDS(req: Request, res: Response) {
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

  if (query === "boards") {
    try {
      const boards = await prisma.board.findMany({
        where: {
          userId: prismaUser.id,
        },
        select: {
          id: true,
          title: true,
          favorite: true,
          viewedAt: true,
        },
        orderBy: {
          viewedAt: "desc",
        },
      });

      return SendResponse(JSON.stringify(boards), 200);
    } catch (error) {
      return SendResponse("Unable to fetch your projects", 500);
    }
  }

  if (query === "board") {
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return SendResponse(errors.badRequest, 400);
    }

    try {
      const board = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
        include: {
          columns: {
            orderBy: {
              order: "asc",
            },
          },
          tasks: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });

      return SendResponse(JSON.stringify(board), 200);
    } catch (error) {
      return SendResponse("Unable to fetch this project", 500);
    }
  }

  return SendResponse(errors.badRequest, 400);
}
