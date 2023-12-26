"use client";

import { ThreeDotsIcon } from "@/components/Icons";
import { useUpdateFavoriteMutation } from "@/lib/mutations";
import { useGetBoards } from "@/lib/queries";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface OptionsMenuProps {
  id: string;
  favorite: boolean;
}

const OptionsMenu = (props: OptionsMenuProps) => {
  const { id, favorite } = props;
  const { refreshBoards } = useGetBoards();

  const favoriteMutation = useUpdateFavoriteMutation({
    id,
    favorite,
    refreshBoards,
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <ThreeDotsIcon className="w-6 h-6 text-zinc-300" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-56 bg-zinc-800 border border-zinc-700 rounded-md flex flex-col"
          align="end"
        >
          <DropdownMenu.Item>
            <OptionItem
              id={id}
              text={favorite ? "Remove from favorites" : "Add to favorites"}
              handleClick={() => favoriteMutation.mutate()}
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <OptionItem
              id={id}
              text="Delete"
              handleClick={() => console.log("")}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface OptionItem {
  id: string;
  text: string;
  handleClick: () => void;
}

const OptionItem = (props: OptionItem) => {
  const { id, text, handleClick } = props;

  return (
    <button
      onClick={handleClick}
      className="h-11 px-4 w-full text-left text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
    >
      {text}
    </button>
  );
};

export default OptionsMenu;
