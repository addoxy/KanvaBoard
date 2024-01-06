"use client";

import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import {
  useCreateColumnMutation,
  useUpdateBoardTitleMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import Column from "./Column";
import Task from "./Task";
import CreateColumnDialog from "./dialogs/CreateColumnDialog";

const Board = (props: Board) => {
  useEffect(() => {
    setColumns(props.columns);
  }, [props.columns]);

  const { id, refreshBoard, title } = props;

  const [columns, setColumns] = useState(props.columns);
  const [editMode, setEditMode] = useState(false);
  const [boardTitle, setBoardTitle] = useState(title);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
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

  function findItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "Column") {
      return columns.find((column) => column.id === id);
    }
    if (type === "Task") {
      return columns.find((column) =>
        column.tasks.find((task) => task.id === id)
      );
    }
  }

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.sortableProps);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.sortableProps);
    }
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeItem = findItems(active.id, "Task");
      const overItem = findItems(over.id, "Task");

      // If the active or over container is not found, return
      if (!activeItem || !overItem) return;

      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeItem.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overItem.id
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeItem.tasks.findIndex(
        (task) => task.id === active.id
      );
      const overTaskIndex = overItem.tasks.findIndex(
        (task) => task.id === over.id
      );

      // In the same container
      if (activeColumnIndex === overColumnIndex) {
        let newColumns = [...columns];
        newColumns[activeColumnIndex].tasks = arrayMove(
          newColumns[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex
        );

        setColumns(newColumns);
      } else {
        // In different containers
        let newColumns = [...columns];
        const [removedTask] = newColumns[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1
        );
        newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, removedTask);
        setColumns(newColumns);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeItem = findItems(active.id, "Task");
      const overItem = findItems(over.id, "Column");

      // If the active or over container is not found, return
      if (!activeItem || !overItem) return;

      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeItem.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overItem.id
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeItem.tasks.findIndex(
        (task) => task.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newColumns = [...columns];
      const [removedTask] = newColumns[activeColumnIndex].tasks.splice(
        activeTaskIndex,
        1
      );
      newColumns[overColumnIndex].tasks.push(removedTask);
      setColumns(newColumns);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.data.current?.type === "Column" &&
      over?.data.current?.type === "Column" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === active.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === over.id
      );
      // Swap the active and over container
      let newColumns = [...columns];
      newColumns = arrayMove(newColumns, activeColumnIndex, overColumnIndex);
      setColumns(newColumns);
    }

    // Handling item Sorting
    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeItem = findItems(active.id, "Task");
      const overItem = findItems(over.id, "Task");

      // If the active or over container is not found, return
      if (!activeItem || !overItem) return;

      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeItem.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overItem.id
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeItem.tasks.findIndex(
        (task) => task.id === active.id
      );
      const overTaskIndex = overItem.tasks.findIndex(
        (task) => task.id === over.id
      );

      // In the same container
      if (activeColumnIndex === overColumnIndex) {
        let newColumns = [...columns];
        newColumns[activeColumnIndex].tasks = arrayMove(
          newColumns[activeColumnIndex].tasks,
          activeTaskIndex,
          overTaskIndex
        );
        setColumns(newColumns);
      } else {
        // In different containers
        let newColumns = [...columns];
        const [removedTask] = newColumns[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1
        );
        newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, removedTask);
        setColumns(newColumns);
      }
    }

    // Handling item dropping into Container
    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Container" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeItem = findItems(active.id, "Task");
      const overItem = findItems(over.id, "Column");

      // If the active or over container is not found, return
      if (!activeItem || !overItem) return;
      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeItem.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overItem.id
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeItem.tasks.findIndex(
        (task) => task.id === active.id
      );

      let newColumns = [...columns];
      const [removedTask] = newColumns[activeColumnIndex].tasks.splice(
        activeTaskIndex,
        1
      );
      newColumns[overColumnIndex].tasks.push(removedTask);
      setColumns(newColumns);
    }
    setActiveId(null);
    setActiveColumn(null);
    setActiveTask(null);
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-x-6 -mr-12 -ml-12 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-zinc-850 hover:scrollbar-thumb-zinc-700 scrollbar-round overflow-x-auto h-full">
          <SortableContext items={columns.map((column) => column.id)}>
            {columns.map((column, i) => (
              <div
                key={column.id}
                className="first-of-type:pl-12 last-of-type:pr-12 h-fit"
              >
                <Column {...column} refreshBoard={refreshBoard} />
              </div>
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeTask && <Task {...activeTask} />}
          {activeColumn && <Column {...activeColumn} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
