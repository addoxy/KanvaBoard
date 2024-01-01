import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT_BOARDS(req: Request, res: Response) {
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

  if (query === "favorite") {
    const boardId = searchParams.get("boardId");
    const isFavorited = searchParams.get("isFavorited");

    if (!boardId || !isFavorited) {
      return SendResponse(errors.badRequest, 400);
    }

    const favoriteStatus = JSON.parse(isFavorited);

    try {
      await prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          favorite: !favoriteStatus,
        },
      });
      return SendResponse(
        "Successfully updated favorite status of project",
        200
      );
    } catch (error) {
      return SendResponse("Unable to update favorite status of project", 500);
    }
  }

  if (query === "recent") {
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return SendResponse(errors.badRequest, 400);
    }

    try {
      await prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          viewedAt: new Date(),
        },
      });
      return SendResponse("Successfully updated the view date of project", 200);
    } catch (error) {
      return SendResponse("Unable to update the view date of project", 500);
    }
  }

  return SendResponse(errors.badRequest, 400);
}
