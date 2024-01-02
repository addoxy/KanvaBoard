"use client";

import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Textarea from "@/components/Textarea";
import Title from "@/components/Title";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/lib/mutations";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";

interface Task extends TaskProps {
  columnTitle: string;
  refreshBoard: () => void;
}

const Task = (props: Task) => {
  const { id, columnTitle, refreshBoard } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(props.content || "");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
      setIsOpen(false);
    }
  }, [deleteTaskMutation.isSuccess, deleteTaskMutation.isError, setIsOpen]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess || updateTaskMutation.isError) {
      setIsDeleteOpen(false);
    }
  }, [
    updateTaskMutation.isSuccess,
    updateTaskMutation.isError,
    setIsDeleteOpen,
  ]);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <p className="cursor-pointer rounded-lg border border-zinc-600/20 bg-zinc-700/30 p-3 text-sm text-zinc-300">
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
            value={content}
            setValue={setContent}
          />
          <Spacer variant="xs" />
          <div className="justify-between gap-x-3 w-full grid grid-cols-2 grid-rows-1">
            <Button
              text="Delete"
              variant="delete"
              disabled={deleteTaskMutation.isPending}
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
                updateTaskMutation.mutate();
              }}
            />
          </div>
        </DialogBox>
      </Dialog.Root>
      <DeleteTaskDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        columnName={columnTitle}
        mutateFn={deleteTaskMutation}
      />
    </>
  );
};

export default Task;
