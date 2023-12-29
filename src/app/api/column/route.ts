import { POST_COLUMNS } from "./post";

export async function POST(req: Request, res: Response) {
  return POST_COLUMNS(req, res);
}
