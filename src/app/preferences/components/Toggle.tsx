"use client";

import * as Switch from "@radix-ui/react-switch";

const Toggle = () => {
  return (
    <Switch.Root className="w-10 h-5 bg-zinc-700 rounded-full relative data-[state=checked]:bg-violet-700 outline-none cursor-default">
      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0 will-change-transform data-[state=checked]:translate-x-5" />
    </Switch.Root>
  );
};

export default Toggle;
