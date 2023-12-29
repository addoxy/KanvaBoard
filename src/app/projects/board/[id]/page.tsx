"use client";

import PageWrapper from "@/components/PageWrapper";
import { useGetBoard } from "@/lib/queries";
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
  const id = params.id;
  const { board, status, refreshBoard } = useGetBoard({ id });

  if (status === "success" && !board) {
    notFound();
  }

  return (
    <PageWrapper>
      {status === "pending" && <LoadingSkeleton />}
      {status === "success" && board && (
        <Board {...board} refreshBoard={refreshBoard} />
      )}
    </PageWrapper>
  );
}
