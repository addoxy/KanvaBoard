import { prisma } from "@/lib/prisma";
import { SendResponse } from "@/utils/api";
import { errors } from "@/utils/error";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function POST_BOARDS(req: Request, res: Response) {
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
  const query = searchParams.get("q");

  if (query === "create") {
    const title = searchParams.get("title");

    if (!title) {
      return SendResponse(errors.badRequest, 400);
    }

    try {
      const newBoard = await prisma.board.create({
        data: {
          title: title,
          userId: prismaUser.id,
        },
      });

      return SendResponse(
        JSON.stringify({
          message: "Successfully created a project",
          boardId: newBoard.id,
        }),
        200
      );
    } catch (error) {
      return SendResponse("Unable to create a project", 500);
    }
  }

  if (query === "template") {
    const template = searchParams.get("type");
    const allowedTemplates = ["todos", "weeklyPlanner"];

    if (!template || !allowedTemplates.includes(template)) {
      return SendResponse(errors.badRequest, 400);
    }

    const todoTemplate = {
      title: "To Dos",
      columns: [
        {
          title: "To Do",
          order: 1,
        },
        {
          title: "In Progress",
          order: 2,
        },
        {
          title: "Done",
          order: 3,
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
      const newBoard = await prisma.board.create({
        data: {
          userId: prismaUser.id,
          title: requiredTemplate.title,
          columns: {
            createMany: {
              data: requiredTemplate.columns,
            },
          },
        },
      });

      return SendResponse(
        JSON.stringify({
          message: "Successfully created this tempalte",
          boardId: newBoard.id,
        }),
        200
      );
    } catch (error) {
      return SendResponse("Unable to create this template", 500);
    }
  }

  return SendResponse(errors.badRequest, 400);
}
