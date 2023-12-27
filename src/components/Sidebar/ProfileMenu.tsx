"use client";

import { useGetWorkspaceName } from "@/lib/queries";
import { cn } from "@/utils/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { SignoutIcon } from "../Icons";
import { ProfileSkeleton } from "./LoadingSkeleton";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { workspaceName, status } = useGetWorkspaceName();

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      {(!session?.user?.image || status === "pending") && <ProfileSkeleton />}
      {session?.user?.image && status === "success" && (
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              "w-44 hover:bg-zinc-800 flex text-zinc-300 py-2 justify-center rounded-lg text-sm items-center",
              isOpen && "bg-zinc-800"
            )}
          >
            <Image
              width={24}
              height={24}
              src={session?.user?.image || ""}
              alt="pfp"
              className="mr-3 rounded-lg"
            />
            {workspaceName}
          </button>
        </DropdownMenu.Trigger>
      )}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="center"
          sideOffset={8}
          className="w-44 shadow-md bg-zinc-800 border border-zinc-700/25 rounded-lg overflow-hidden pt-3"
        >
          <DropdownMenu.Item className="flex flex-col outline-none px-4 border-b border-b-zinc-700/50">
            <span className="truncate text-zinc-300 mb-1 text-sm">
              {session?.user?.name}
            </span>
            <span className="truncate text-zinc-400 mb-4 text-xs">
              {session?.user?.email}
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="outline-none">
            <button
              onClick={() => signOut({ callbackUrl: "/signout" })}
              className={
                "text-zinc-500 w-full font-medium flex items-center text-sm h-10  hover:bg-zinc-700 hover:text-zinc-400 px-4"
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
