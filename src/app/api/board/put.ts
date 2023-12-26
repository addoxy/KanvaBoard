import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT_BOARDS(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return SendResponse("You have to be logged in to do this", 401);
  }

  const user = session.user;

  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user?.email as string,
    },
  });

  if (!prismaUser) {
    return SendResponse("You do not have a valid account", 403);
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (query === "favorite") {
    const boardId = searchParams.get("boardId");
    const isFavorited = searchParams.get("isFavorited");

    if (boardId && isFavorited) {
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
        return SendResponse("Successfully added board to favorites", 200);
      } catch (error) {
        return SendResponse("Unable to add board to favorites", 500);
      }
    }
    return SendResponse("You did not provide a board ID", 400);
  }
  return SendResponse("You did not provide a valid query", 400);
}
