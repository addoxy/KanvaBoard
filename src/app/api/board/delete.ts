import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function DELETE_BOARDS(req: Request, res: Response) {
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
  const id = searchParams.get("id");

  if (id) {
    try {
      await prisma.board.delete({
        where: {
          id,
        },
      });

      return SendResponse("You do not have a valid account", 200);
    } catch (error) {
      return SendResponse("Unable to delete the board", 500);
    }
  }
  return SendResponse("You provided an invalid query", 400);
}
