"use client";

import { cn } from "@/utils/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { SignoutIcon } from "../Icons";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "w-44 hover:bg-zinc-800 flex text-zinc-300 py-2 justify-center rounded-lg text-sm items-center",
            isOpen && "bg-zinc-800"
          )}
        >
          {/* check for user session and retrieve user image */}
          <Image
            width={24}
            height={24}
            src={session?.user?.image || ""}
            alt="Profile Picture"
            className="mr-3 rounded-lg"
          />
          {/* Default name of workspace, can be changed */}
          My Workspace
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="center" sideOffset={8}>
          <DropdownMenu.Item className="outline-none">
            <button
              onClick={() => signOut()}
              className={
                "text-zinc-500 font-medium flex items-center text-sm w-44 h-10 shadow-md bg-zinc-800 border border-zinc-700/25 rounded-lg pl-5 hover:bg-zinc-700 hover:text-zinc-400"
              }
            >
              <SignoutIcon className="w-4 h-4 mr-3 shrink-0" />
              Sign Out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileMenu;
