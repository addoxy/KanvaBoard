import { DELETE_BOARDS } from "./delete";
import { GET_BOARDS } from "./get";
import { POST_BOARDS } from "./post";
import { PUT_BOARDS } from "./put";

export async function GET(req: Request, res: Response) {
  return GET_BOARDS(req, res);
}

export async function PUT(req: Request, res: Response) {
  return PUT_BOARDS(req, res);
}

export async function POST(req: Request, res: Response) {
  return POST_BOARDS(req, res);
}

export async function DELETE(req: Request, res: Response) {
  return DELETE_BOARDS(req, res);
}
