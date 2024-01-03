"use client";

import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import {
  useCreateColumnMutation,
  useUpdateBoardTitleMutation,
  useUpdateColumnOrderMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Column from "./Column";
import CreateColumnDialog from "./CreateColumnDialog";

interface Board extends BoardProps {
  refreshBoard: () => void;
}

interface DraggableColumnProps extends ColumnProps {
  refreshBoard: () => void;
}

const Board = (props: Board) => {
  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  const { id, refreshBoard, title } = props;

  const [columns, setColumns] = useState(props.columns);
  const [editMode, setEditMode] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const updateColumnOrderMutation = useUpdateColumnOrderMutation({
    boardId: id,
    columns,
  });

  const [activeColumn, setActiveColumn] = useState<DraggableColumnProps | null>(
    null
  );

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

  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === "Column") {
      setActiveColumn(e.active.data.current.sortableProps);
      return;
    }
  }

  async function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === activeColumnId
    );

    const overColumnIndex = columns.findIndex(
      (column) => column.id === overColumnId
    );

    setColumns((columns) => {
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });

    updateColumnOrderMutation.mutate();
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between gap-x-10 items-center">
        {!editMode && (
          <Title
            text={boardTitle}
            variant="xl"
            onClick={() => setEditMode(true)}
            className="cursor-pointer"
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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-x-6 -mr-12 -ml-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round overflow-x-auto h-full">
          <SortableContext items={columnsId}>
            {columns.map((column, i) => (
              <div
                key={column.id}
                className="first-of-type:pl-12 last-of-type:pr-12"
              >
                <Column
                  {...column}
                  length={columns.length}
                  refreshBoard={refreshBoard}
                />
              </div>
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column {...activeColumn} refreshBoard={refreshBoard} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Board;
