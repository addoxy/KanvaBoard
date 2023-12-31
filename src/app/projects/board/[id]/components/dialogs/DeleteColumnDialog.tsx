import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Point from "@/components/Point";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import * as Dialog from "@radix-ui/react-dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

interface DeleteColumnDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  columnName: string;
  mutationFn: UseMutationResult<AxiosResponse<any, any>, Error, void, unknown>;
}

const DeleteColumnDialog = (props: DeleteColumnDialogProps) => {
  const { isOpen, setIsOpen, columnName, mutationFn } = props;

  useEffect(() => {
    if (mutationFn.isSuccess || mutationFn.isError) {
      setIsOpen(false);
    }
  }, [mutationFn.isSuccess, mutationFn.isError, setIsOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        if (mutationFn.isPending) {
          setIsOpen(true);
        } else {
          setIsOpen(value);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="hover:bg-zinc-700/50 rounded-md transition-all delay-100 duration-200 ease-in-out">
          <CrossIcon className="w-6 h-6 text-zinc-300" />
        </button>
      </Dialog.Trigger>
      <DialogBox variant="lg">
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-between w-full items-center">
            <Title text="Delete column" variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out disabled:cursor-not-allowed"
              disabled={mutationFn.isPending}
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <Spacer variant="sm" />
          <Title
            text="Are you sure you want to delete this column?"
            variant="ml"
            className="text-center"
          />
          <Spacer variant="md" />
          <ul className="px-6 flex flex-col gap-y-1">
            <Point>
              You are deleting the column:{" "}
              <span className="text-violet-500">{columnName}</span>
            </Point>
            <Point>
              The column and its associated tasks will be deleted permanently
            </Point>
            <Point>This action cannot be undone</Point>
          </ul>
          <Spacer variant="sm" />
          <Button
            variant="full"
            disabled={mutationFn.isPending}
            text="Delete Column"
            handleClick={() => {
              mutationFn.mutate();
            }}
          />
        </div>
      </DialogBox>
    </Dialog.Root>
  );
};

export default DeleteColumnDialog;
