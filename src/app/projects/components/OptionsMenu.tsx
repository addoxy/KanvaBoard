import { ThreeDotsIcon } from "@/components/Icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const OptionsMenu = () => {
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
            <OptionItem text="Add to favorites" />
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <OptionItem text="Delete" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface OptionItem {
  text: string;
}

const OptionItem = (props: OptionItem) => {
  const { text } = props;

  return (
    <button className="h-11 px-4 w-full text-left text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300">
      {text}
    </button>
  );
};

export default OptionsMenu;
