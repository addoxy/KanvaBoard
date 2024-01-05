import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST_TASKS(req: Request, res: Response) {
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
  const boardId = searchParams.get("boardId");
  const columnId = searchParams.get("columnId");
  const content = searchParams.get("content");
  const order = searchParams.get("order");

  if (!boardId || !columnId || !content || !order) {
    return SendResponse(errors.badRequest, 400);
  }

  try {
    await prisma.task.create({
      data: {
        order: parseInt(order),
        content: content,
        columnId: columnId,
        boardId: boardId,
      },
    });

    return SendResponse("Successfully added a task to the column", 200);
  } catch (error) {
    return SendResponse("Unable to add a task to the column", 500);
  }
}
