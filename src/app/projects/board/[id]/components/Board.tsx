"use client";

import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import {
  useCreateColumnMutation,
  useDropTaskInColumnMutation,
  useTaskReorderDifferentMutation,
  useTaskReorderSameMutation,
  useUpdateBoardTitleMutation,
  useUpdateColumnOrderMutation,
} from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
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
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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

  const updateColumnOrderMutation = useUpdateColumnOrderMutation({
    refreshBoard,
  });
  const dropTaskInColumnMutation = useDropTaskInColumnMutation({
    refreshBoard,
  });
  const taskReorderSameMutation = useTaskReorderSameMutation({ refreshBoard });
  const taskReorderDifferentMutation = useTaskReorderDifferentMutation({
    refreshBoard,
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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.sortableProps);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.sortableProps);
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
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

      if (activeColumnIndex === overColumnIndex) return;

      // Swap the active and over container
      let newColumns = [...columns];
      newColumns = arrayMove(newColumns, activeColumnIndex, overColumnIndex);
      setColumns(newColumns);

      const variables = {
        boardId: id,
        activeColumnId: active.id,
        activeOrder: activeColumnIndex + 1,
        overOrder: overColumnIndex + 1,
      };

      updateColumnOrderMutation.mutate(variables);
    }

    // Handle Items Sorting
    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Task" &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeColumn = findItems(active.id, "Task");
      const overColumn = findItems(over.id, "Task");

      // If the active or over container is not found, return
      if (!activeColumn || !overColumn) return;

      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id
      );

      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.tasks.findIndex(
        (task) => task.id === active.id
      );
      const overTaskIndex = overColumn.tasks.findIndex(
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

        const variables = {
          columnId: activeColumn.id,
          activeTaskId: active.id,
          activeOrder: activeTaskIndex + 1,
          overOrder: overTaskIndex + 1,
        };

        taskReorderSameMutation.mutate(variables);
      } else {
        // In different containers
        let newColumns = [...columns];
        const [removedTask] = newColumns[activeColumnIndex].tasks.splice(
          activeTaskIndex,
          1
        );
        newColumns[overColumnIndex].tasks.splice(overTaskIndex, 0, removedTask);
        setColumns(newColumns);

        const variables = {
          taskId: active.id,
          oldColumnId: activeColumn.id,
          newColumnId: overColumn.id,
          activeOrder: activeTaskIndex + 1,
          overOrder: overTaskIndex + 1,
        };

        taskReorderDifferentMutation.mutate(variables);
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
      const activeColumn = findItems(active.id, "Task");
      const overColumn = findItems(over.id, "Column");

      // If the active or over container is not found, return
      if (!activeColumn || !overColumn) return;

      // Find the index of the active and over container
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumn.id
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumn.id
      );

      if (activeColumnIndex === overColumnIndex) return;

      // Find the index of the active and over item
      const activeTaskIndex = activeColumn.tasks.findIndex(
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

      const variables = {
        taskId: active.id,
        activeOrder: activeTaskIndex + 1,
        overOrder: columns[overColumnIndex].tasks.length,
        oldColumnId: activeColumn.id,
        newColumnId: overColumn.id,
      };

      dropTaskInColumnMutation.mutate(variables);
    }

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
        // collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
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
