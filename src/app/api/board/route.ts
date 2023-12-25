import { GET_BOARDS } from "./get";

export async function GET(req: Request, res: Response) {
  return GET_BOARDS(req, res);
}
