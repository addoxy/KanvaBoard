"use client";

import { ThreeDotsIcon } from "@/components/Icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface OptionsMenuProps {
  id: string;
}

const OptionsMenu = (props: OptionsMenuProps) => {
  const { id } = props;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <ThreeDotsIcon className="w-6 h-6 text-zinc-300" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-40 bg-zinc-800 border border-zinc-700 rounded-md flex flex-col"
          align="end"
        >
          <DropdownMenu.Item>
            <OptionItem id={id} type="favorite" text="Add to favorites" />
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <OptionItem id={id} type="delete" text="Delete" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface OptionItem {
  id: string;
  text: string;
  type: "favorite" | "delete";
}

const OptionItem = (props: OptionItem) => {
  const { id, type, text } = props;

  const favoriteMutation = useMutation({
    mutationFn: async () =>
      await axios.put(`/api/board?q=favorite&boardId=${id}`),
  });

  function handleClick() {
    if (type === "favorite") {
      favoriteMutation.mutate();
    }
  }
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
