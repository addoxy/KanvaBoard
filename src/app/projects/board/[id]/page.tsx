import { MockupBoard } from "@/app/mockup";
import PageWrapper from "@/components/PageWrapper";
import Board from "./components/Board";

export default function page() {
  return (
    <PageWrapper>
      <Board {...MockupBoard} />
    </PageWrapper>
  );
}
