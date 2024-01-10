"use client";

import * as Switch from "@radix-ui/react-switch";

interface ToggleProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
}

const Toggle = (props: ToggleProps) => {
  const { checked, setChecked } = props;

  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={setChecked}
      className="w-10 h-5 bg-zinc-700 rounded-full relative data-[state=checked]:bg-violet-700 outline-none cursor-default"
    >
      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0 will-change-transform data-[state=checked]:translate-x-5" />
    </Switch.Root>
  );
};

export default Toggle;
