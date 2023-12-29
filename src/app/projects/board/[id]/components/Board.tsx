"use client";

import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import { useCreateColumnMutation } from "@/lib/mutations";
import { cn } from "@/utils/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Column from "./Column";

interface Board extends BoardProps {
  refreshBoard: () => void;
}

const Board = (props: Board) => {
  const { id, refreshBoard, title, columns } = props;

  const [isOpen, setIsOpen] = useState(false);
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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

interface CreateColumnDialogProps {
  children: React.ReactNode;
  title: string;
  setTitle: (title: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mutationFn: UseMutationResult<AxiosResponse<any, any>, Error, void, unknown>;
}

const CreateColumnDialog = (props: CreateColumnDialogProps) => {
  const { children, title, setTitle, isOpen, setIsOpen, mutationFn } = props;

  useEffect(() => {
    if (mutationFn.isSuccess || mutationFn.isError) {
      setIsOpen(false);
    }
  }, [mutationFn.isSuccess, mutationFn.isError, setIsOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        setTitle("");
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <DialogBox variant="xl">
        <div className="flex justify-between items-center mb-6">
          <Title text="Create a column" variant="lg" />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out disabled:cursor-not-allowed"
            disabled={mutationFn.isPending}
          >
            <CrossIcon className="w-8 h-8 text-zinc-300" />
          </button>
        </div>
        <div className="flex flex-col gap-y-3 mb-6">
          <span className="text-zinc-500 font-medium">Name</span>
          <Input
            autoFocus={true}
            variant="full"
            value={title}
            setValue={setTitle}
          />
        </div>
        <Button
          variant="full"
          disabled={mutationFn.isPending}
          text="Save"
          handleClick={() => {
            mutationFn.mutate();
          }}
        />
      </DialogBox>
    </Dialog.Root>
  );
};

export default Board;
