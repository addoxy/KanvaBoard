"use client";

import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon, ThreeDotsIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import {
  useDeleteBoardMutation,
  useUpdateFavoriteMutation,
} from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface OptionsMenuProps {
  id: string;
  boardName: string;
  favorite: boolean;
}

const OptionsMenu = (props: OptionsMenuProps) => {
  const { id, boardName, favorite } = props;
  const { refreshBoards } = useGetBoards();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const favoriteBoardMutation = useUpdateFavoriteMutation({
    id,
    favorite,
    refreshBoards,
  });

  const deleteBoardMutation = useDeleteBoardMutation({
    id,
    refreshBoards,
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <ThreeDotsIcon className="w-6 h-6 text-zinc-400" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-50 bg-zinc-925 border border-zinc-800 rounded-md flex flex-col data-[side=bottom]:animate-slideUpAndFade"
          align="end"
        >
          <DropdownMenu.Item>
            <button
              onClick={() => favoriteBoardMutation.mutate()}
              className="h-11 px-4 text-sm w-full text-left text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
            >
              {favorite && "Remove from favorites"}
              {!favorite && "Add to favorites"}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
            <DeleteDialog
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              boardName={boardName}
              mutateFn={deleteBoardMutation}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  boardName: string;
  mutateFn: UseMutationResult<AxiosResponse<any, any>, Error, void, unknown>;
}

const DeleteDialog = (props: DeleteDialogProps) => {
  const { isOpen, setIsOpen, boardName, mutateFn } = props;

  if (mutateFn.isSuccess || mutateFn.isError) {
    setIsOpen(false);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="h-11 px-4 text-sm w-full text-left text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300">
          Delete
        </button>
      </Dialog.Trigger>
      <DialogBox variant="lg">
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-between w-full items-center">
            <Title text="Delete board" variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out"
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <Spacer variant="sm" />
          <Title
            text="Are you sure you want to delete this board?"
            variant="ml"
            className="text-center"
          />
          <Spacer variant="md" />
          <ul className="px-6 flex flex-col gap-y-1">
            <Point>
              You are deleting the board:{" "}
              <span className="text-violet-500">{boardName}</span>
            </Point>
            <Point>
              The board and its associated columns and tasks will be deleted
              permanently
            </Point>
            <Point>This action cannot be undone</Point>
          </ul>
          <Spacer variant="sm" />
          <Button
            variant="full"
            disabled={mutateFn.isPending}
            text="Delete Board"
            handleClick={() => {
              mutateFn.mutate();
            }}
          />
        </div>
      </DialogBox>
    </Dialog.Root>
  );
};

const Point = ({ children }: { children: React.ReactNode }) => {
  return <li className="text-zinc-500 text-base list-disc">{children}</li>;
};

export default OptionsMenu;
