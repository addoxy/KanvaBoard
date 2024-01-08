import Button from "@/components/Button";
import DialogBox from "@/components/DialogBox";
import { CrossIcon } from "@/components/Icons";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { useCreateBoardMutation } from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import { notify } from "@/utils/notify";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

interface CreateBoardProps {
  isEnabled: boolean;
}

const CreateBoard = (props: CreateBoardProps) => {
  const { isEnabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { refreshBoards } = useGetBoards();

  const createBoardMutation = useCreateBoardMutation({
    title: title,
    refreshBoards,
  });

  useEffect(() => {
    if (createBoardMutation.isSuccess || createBoardMutation.isError) {
      setIsOpen(false);
    }
  }, [createBoardMutation.isSuccess, createBoardMutation.isError, setIsOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        if (createBoardMutation.isPending) {
          setIsOpen(true);
        } else {
          setIsOpen(value);
        }
      }}
    >
      <Dialog.Trigger disabled={!isEnabled} asChild>
        <button className="bg-violet-700 text-zinc-300 text-sm shrink-0 w-full sm:w-36 md:w-44 h-11 rounded-lg disabled:cursor-not-allowed font-medium transition-all delay-100 duration-200 ease-in-out hover:bg-purple-700">
          + New Project
        </button>
      </Dialog.Trigger>
      <DialogBox variant="xl">
        <div className="flex justify-between items-center mb-6">
          <Title text="Create a board" variant="lg" />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-zinc-700/20 rounded-md transition-all delay-100 duration-200 ease-in-out disabled:cursor-not-allowed"
            disabled={createBoardMutation.isPending}
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
            handleKeyDown={(e) => {
              if (e.key === "Enter") {
                if (title !== "") {
                  createBoardMutation.mutate();
                } else {
                  notify("Project name can't be empty", "warning");
                }
              }
            }}
          />
        </div>
        <Button
          variant="full"
          disabled={createBoardMutation.isPending}
          text="Save"
          handleClick={() => {
            if (title !== "") {
              createBoardMutation.mutate();
            } else {
              notify("Project name can't be empty", "warning");
            }
          }}
        />
      </DialogBox>
    </Dialog.Root>
  );
};

export default CreateBoard;
