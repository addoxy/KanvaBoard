import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function DELETE_BOARDS(req: Request, res: Response) {
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
  const id = searchParams.get("id");

  if (!id) {
    return SendResponse(errors.badRequest, 400);
  }

  try {
    await prisma.board.delete({
      where: {
        id,
      },
    });

    return SendResponse("Successfully deleted the project", 200);
  } catch (error) {
    return SendResponse("Unable to delete the project", 500);
  }
}
