import { DELETE_TASKS } from "./delete";
import { POST_TASKS } from "./post";
import { PUT_TASKS } from "./put";

export async function POST(req: Request, res: Response) {
  return POST_TASKS(req, res);
}

export async function PUT(req: Request, res: Response) {
  return PUT_TASKS(req, res);
}

export async function DELETE(req: Request, res: Response) {
  return DELETE_TASKS(req, res);
}
