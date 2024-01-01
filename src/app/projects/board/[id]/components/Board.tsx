"use client";

import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import {
  useCreateColumnMutation,
  useUpdateBoardTitleMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import { useRef, useState } from "react";
import Column from "./Column";
import CreateColumnDialog from "./CreateColumnDialog";

interface Board extends BoardProps {
  refreshBoard: () => void;
}

const Board = (props: Board) => {
  const { id, refreshBoard, title, columns } = props;

  const [editMode, setEditMode] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const updateBoardTitleMutation = useUpdateBoardTitleMutation({
    id,
    newTitle: boardTitle,
  });

  const createColumnMutation = useCreateColumnMutation({
    boardId: id,
    title: newColumnTitle,
    refreshBoard,
    order: columns.length + 1,
  });

  function handleTitle() {
    if (inputRef.current?.value.length === 0 || !inputRef.current?.value) {
      notify("Board Title can't be empty", "warning");
      return;
    }

    if (inputRef.current.value === boardTitle) return;

    setBoardTitle(inputRef.current?.value);
    updateBoardTitleMutation.mutate();
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between gap-x-10 items-center">
        {!editMode && (
          <Title
            text={boardTitle}
            variant="xl"
            onClick={() => setEditMode(true)}
          />
        )}
        {editMode && (
          <input
            autoFocus
            defaultValue={boardTitle}
            onBlur={() => {
              handleTitle();
              setEditMode(false);
            }}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") {
                inputRef.current && inputRef.current.blur();
              }
            }}
            className="h-8 w-full rounded-lg px-2 font-medium text-zinc-300 bg-zinc-800 text-2xl outline-none py-5 -my-3 truncate"
          />
        )}
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
          <Column {...column} key={column.id} refreshBoard={refreshBoard} />
        ))}
      </div>
    </div>
  );
};

export default Board;
