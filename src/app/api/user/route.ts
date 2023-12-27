import { GET_USER } from "./get";
import { PUT_USER } from "./put";

export async function GET(req: Request, res: Response) {
  return GET_USER(req, res);
}

export async function PUT(req: Request, res: Response) {
  return PUT_USER(req, res);
}
