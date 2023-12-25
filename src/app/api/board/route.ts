import { GET_BOARDS } from "./get";
import { PUT_BOARDS } from "./put";

export async function GET(req: Request, res: Response) {
  return GET_BOARDS(req, res);
}

export async function PUT(req: Request, res: Response) {
  return PUT_BOARDS(req, res);
}
