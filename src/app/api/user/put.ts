import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function PUT_USER(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return SendResponse("You have to be logged in to do this", 401);
  }

  const user = session.user;

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (query === "workspace") {
    const newName = searchParams.get("newName");

    if (newName) {
      try {
        await prisma.user.update({
          where: {
            email: user?.email as string,
          },
          data: {
            workspaceName: newName,
          },
        });

        return SendResponse("Successfully updated workspace name", 200);
      } catch (error) {
        return SendResponse("Unable to update workspace name", 500);
      }
    }

    return SendResponse("You did not provide a new name", 400);
  }

  return SendResponse("You did not provide a valid query", 400);
}
