import { POST_TASKS } from "./post";

export async function POST(req: Request, res: Response) {
  return POST_TASKS(req, res);
}
