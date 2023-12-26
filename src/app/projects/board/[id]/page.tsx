"use client";

import PageWrapper from "@/components/PageWrapper";
import { useGetBoards } from "@/lib/queries";
import { notFound } from "next/navigation";
import Board from "./components/Board";

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

  if (status === "success" && !currentBoard) notFound();

  return (
    <PageWrapper>{currentBoard && <Board {...currentBoard} />}</PageWrapper>
  );
}
