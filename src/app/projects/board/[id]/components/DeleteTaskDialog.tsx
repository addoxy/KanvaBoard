import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import Title from "@/components/Title";
import * as Dialog from "@radix-ui/react-dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface DeleteTaskDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  columnName: string;
  mutateFn: UseMutationResult<AxiosResponse<any, any>, Error, void, unknown>;
}

const DeleteTaskDialog = (props: DeleteTaskDialogProps) => {
  const { isOpen, setIsOpen, columnName, mutateFn } = props;

  if (mutateFn.isSuccess || mutateFn.isError) {
    setIsOpen(false);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogBox variant="lg">
        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-between w-full items-center">
            <Title text="Delete Task" variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out disabled:cursor-not-allowed"
              disabled={mutateFn.isPending}
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <Spacer variant="sm" />
          <Title
            text="Are you sure you want to delete this task?"
            variant="ml"
            className="text-center"
          />
          <Spacer variant="md" />
          <ul className="px-6 flex flex-col gap-y-1">
            <Point>
              You are deleting a task in the column:{" "}
              <span className="text-violet-500">{columnName}</span>
            </Point>
            <Point>This action cannot be undone</Point>
          </ul>
          <Spacer variant="sm" />
          <Button
            variant="full"
            disabled={mutateFn.isPending}
            text="Delete Task"
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

export default DeleteTaskDialog;
