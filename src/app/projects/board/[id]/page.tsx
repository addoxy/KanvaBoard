import { MockupBoard } from "@/app/mockup";
import Board from "./components/Board";

export default function page() {
  return <Board {...MockupBoard} />;
}
