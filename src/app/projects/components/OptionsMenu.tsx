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
    </DropdownMenu.Root>
  );
};

export default OptionsMenu;
