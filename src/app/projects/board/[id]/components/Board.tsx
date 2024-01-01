"use client";

import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import { useCreateColumnMutation } from "@/lib/mutations";
import { cn } from "@/utils/utils";
import { useState } from "react";
import Column from "./Column";
import CreateColumnDialog from "./CreateColumnDialog";

interface Board extends BoardProps {
  refreshBoard: () => void;
}

const Board = (props: Board) => {
  const { id, refreshBoard, title, columns } = props;

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const createColumnMutation = useCreateColumnMutation({
    boardId: id,
    title: newColumnTitle,
    refreshBoard,
    order: columns.length + 1,
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <Title text={title} variant="xl" className="line-clamp-1" />
        <CreateColumnDialog
          title={newColumnTitle}
          setTitle={setNewColumnTitle}
          mutationFn={createColumnMutation}
        >
          <button
            disabled={createColumnMutation.isPending}
            className={cn(
              "bg-violet-700 text-zinc-300 text-sm shrink-0 font-medium transition-all delay-100 duration-200 ease-in-out hover:bg-purple-700 disabled:cursor-not-allowed w-36 h-9 rounded-lg"
            )}
          >
            + New Column
          </button>
        </CreateColumnDialog>
      </div>
      <Spacer variant="lg" />
      <div className="flex gap-x-6 -mr-12 -ml-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round overflow-x-auto h-full">
        {columns.map((column) => (
          <Column {...column} key={column.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
