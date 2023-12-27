"use client";

import PageWrapper from "@/components/PageWrapper";
import { useGetBoards } from "@/lib/queries";
import { notFound } from "next/navigation";
import Board from "./components/Board";
import LoadingSkeleton from "./components/LoadingSkeleton";

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams;
}

export default function BoardPage(props: PageProps) {
  const { params } = props;
  const { boards, status } = useGetBoards();
  const currentBoard = boards?.find((board) => board.id === params.id);

  if (status === "success" && !currentBoard) {
    notFound();
  }

  return (
    <PageWrapper>
      {!currentBoard && <LoadingSkeleton />}
      {currentBoard && <Board {...currentBoard} />}
    </PageWrapper>
  );
}
