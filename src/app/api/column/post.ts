import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST_COLUMNS(req: Request, res: Response) {
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
  const boardId = searchParams.get("boardId");
  const title = searchParams.get("title");
  const order = searchParams.get("order");

  if (boardId && order && title) {
    try {
      await prisma.column.create({
        data: {
          order: parseInt(order),
          title: title,
          boardId: boardId,
        },
      });

      return SendResponse("Successfully added a column to the board", 200);
    } catch (error) {
      return SendResponse("Unable to create a column in the board", 500);
    }
  }
  return SendResponse("You did not provide a valid query", 400);
}
