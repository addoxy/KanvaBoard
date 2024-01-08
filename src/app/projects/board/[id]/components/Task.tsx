"use client";

import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
import Title from "@/components/Title";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/lib/mutations";
import { notify } from "@/utils/notify";
import { cn } from "@/utils/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import DeleteTaskDialog from "./dialogs/DeleteTaskDialog";

const Task = (props: Task) => {
  const { id, columnTitle, refreshBoard } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(props.content);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const sortableProps = {
    ...props,
    id: id,
    content: content,
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: id,
    data: {
      type: "Task",
      sortableProps,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const deleteTaskMutation = useDeleteTaskMutation({
    id,
    refreshBoard,
  });

  const updateTaskMutation = useUpdateTaskMutation({
    id,
    newContent: content,
    refreshBoard,
  });

  useEffect(() => {
    if (deleteTaskMutation.isSuccess || deleteTaskMutation.isError) {
      setIsDeleteOpen(false);
    }
  }, [deleteTaskMutation.isSuccess, deleteTaskMutation.isError, setIsOpen]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess || updateTaskMutation.isError) {
      setIsOpen(false);
    }
  }, [
    updateTaskMutation.isSuccess,
    updateTaskMutation.isError,
    setIsDeleteOpen,
  ]);

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(value) => {
          if (updateTaskMutation.isPending) {
            setIsOpen(true);
          } else {
            setIsOpen(value);
          }
        }}
      >
        <Dialog.Trigger
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          asChild
          className="touch-none"
        >
          <p
            className={cn(
              "cursor-pointer rounded-lg border border-zinc-600/20 bg-zinc-750 p-3 text-sm text-zinc-300",
              isDragging && "opacity-50",
              isOver && "opacity-50"
            )}
          >
            {props.content}
          </p>
        </Dialog.Trigger>
        <DialogBox variant="xl">
          <div className="flex justify-between items-center mb-6">
            <Title text={`Editing a Task in ${columnTitle}`} variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              disabled={deleteTaskMutation.isPending}
              className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out"
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <Textarea
            rows={3}
            placeholder="Edit the task"
            defaultValue={props.content}
            setValue={setContent}
            handleKeyDown={(e) => {
              if (e.key === "Enter") {
                if (content === props.content) {
                  setIsOpen(false);
                  return;
                } else if (content !== "") {
                  updateTaskMutation.mutate();
                } else {
                  notify("Task content can't be empty", "warning");
                }
              }
            }}
          />
          <Spacer variant="xs" />
          <div className="justify-between gap-x-3 w-full grid grid-cols-2 grid-rows-1">
            <Button
              text="Delete"
              variant="delete"
              disabled={
                deleteTaskMutation.isPending || updateTaskMutation.isPending
              }
              handleClick={() => {
                setIsOpen(false);
                setIsDeleteOpen(true);
              }}
            />
            <Button
              text="Save"
              variant="full"
              disabled={updateTaskMutation.isPending}
              handleClick={() => {
                if (content === props.content) {
                  setIsOpen(false);
                  return;
                } else if (content !== "") {
                  updateTaskMutation.mutate();
                } else {
                  notify("Task content can't be empty", "warning");
                }
              }}
            />
          </div>
        </DialogBox>
      </Dialog.Root>
      {columnTitle && (
        <DeleteTaskDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          columnName={columnTitle}
          mutationFn={deleteTaskMutation}
        />
      )}
    </>
  );
};

export default Task;
