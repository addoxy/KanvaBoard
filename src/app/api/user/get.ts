import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET_USER(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return SendResponse(errors.unauthorized, 401);
  }

  const user = session.user;

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (query === "workspace") {
    try {
      const workspace = await prisma.user.findUnique({
        where: {
          email: user?.email as string,
        },
        select: {
          workspaceName: true,
        },
      });

      if (!workspace) {
        return SendResponse(errors.forbidden, 403);
      }

      return SendResponse(JSON.stringify(workspace.workspaceName), 200);
    } catch (error) {
      return SendResponse("Unable to fetch workspace name", 500);
    }
  }

  return SendResponse(errors.badRequest, 400);
}
