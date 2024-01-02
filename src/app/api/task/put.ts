import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT_TASKS(req: Request, res: Response) {
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
  const newContent = searchParams.get("newContent");
  const id = searchParams.get("id");

  if (!newContent || !id) {
    return SendResponse(errors.badRequest, 200);
  }

  try {
    await prisma.task.update({
      where: {
        id,
      },
      data: {
        content: newContent,
      },
    });
    return SendResponse("Successfully updated thet task", 200);
  } catch (error) {
    return SendResponse("Unable to update the task", 500);
  }
}
