import Button from "@/components/Button";
import { CrossIcon } from "@/components/Icons";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { useCreateBoardMutation } from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

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

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger disabled={!isEnabled} asChild>
        <button className="bg-violet-700 text-zinc-300 text-sm shrink-0 w-44 h-11 rounded-lg disabled:cursor-not-allowed font-medium">
          + New Project
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-zinc-900/75 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="w-140 px-9 pt-8 pb-10 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none">
          <div className="flex justify-between items-center mb-6">
            <Title text={`Creating a Board`} variant="lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-zinc-700/20 rounded-md"
            >
              <CrossIcon className="w-8 h-8 text-zinc-300" />
            </button>
          </div>
          <div className="flex flex-col gap-y-3 mb-6">
            <span className="text-zinc-500 font-medium">Name</span>
            <Input variant="full" value={title} setValue={setTitle} />
          </div>
          <Button
            variant="full"
            text="Save"
            handleClick={() => {
              createBoardMutation.mutate();
              setIsOpen(false);
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateBoard;
