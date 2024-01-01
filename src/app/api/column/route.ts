import { DELETE_COLUMNS } from "./delete";
import { POST_COLUMNS } from "./post";
import { PUT_COLUMNS } from "./put";

export async function POST(req: Request, res: Response) {
  return POST_COLUMNS(req, res);
}

export async function PUT(req: Request, res: Response) {
  return PUT_COLUMNS(req, res);
}

export async function DELETE(req: Request, res: Response) {
  return DELETE_COLUMNS(req, res);
}
