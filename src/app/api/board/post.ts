import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST_BOARDS(req: Request, res: Response) {
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

  if (query === "create") {
    const title = searchParams.get("title");
    const id = searchParams.get("id");

    if (title && id) {
      try {
        await prisma.board.create({
          data: {
            id: id,
            title: title,
            userId: prismaUser.id,
          },
        });

        return SendResponse("Successfully created a new project", 200);
      } catch (error) {
        return SendResponse("Unable to create a project", 500);
      }
    }
  }

  if (query === "template") {
    const template = searchParams.get("type");
    const boardId = searchParams.get("boardId");

    if ((template === "todos" || template === "weeklyPlanner") && boardId) {
      const todoTemplate = {
        title: "To Dos",
        columns: [
          {
            title: "To Do",
            order: 1,
          },
          {
            title: "In Progress",
            order: 1,
          },
          {
            title: "Done",
            order: 1,
          },
        ],
      };

      const weeklyPlannerTemplate = {
        title: "Weekly Planner",
        columns: [
          {
            title: "Done",
            order: 1,
          },
          {
            title: "Monday",
            order: 2,
          },
          {
            title: "Tuesday",
            order: 3,
          },
          {
            title: "Wednesday",
            order: 4,
          },
          {
            title: "Thursday",
            order: 5,
          },
          {
            title: "Friday",
            order: 6,
          },
          {
            title: "Saturday",
            order: 7,
          },
          {
            title: "Sunday",
            order: 8,
          },
        ],
      };

      const requiredTemplate =
        template === "todos" ? todoTemplate : weeklyPlannerTemplate;

      try {
        await prisma.board.create({
          data: {
            id: boardId,
            userId: prismaUser.id,
            title: requiredTemplate.title,
            columns: {
              createMany: {
                data: requiredTemplate.columns,
              },
            },
          },
        });

        return SendResponse("Successfully created a template Board", 200);
      } catch (error) {
        return SendResponse("Unable to create a template Board", 500);
      }
    }

    if (!boardId) {
      return SendResponse("You did not provide a board ID", 400);
    }

    return SendResponse("You did not provide a valid template", 400);
  }

  return SendResponse("You did not provide a valid query", 400);
}