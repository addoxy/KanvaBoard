import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET_BOARDS(req: Request, res: Response) {
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

  if (query === "boards") {
    try {
      const boards = await prisma.board.findMany({
        where: {
          userId: prismaUser.id,
        },
        include: {
          columns: {
            orderBy: {
              order: "asc",
            },
            include: {
              tasks: {
                orderBy: {
                  order: "asc",
                },
              },
            },
          },
        },
        orderBy: {
          viewedAt: "desc",
        },
      });

      return SendResponse(JSON.stringify(boards), 200);
    } catch (error) {
      return SendResponse("Unable to fetch your boards", 500);
    }
  }
  return SendResponse("You sent an invalid query", 400);
}
