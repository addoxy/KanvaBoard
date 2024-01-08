"use client";

import { useGetWorkspaceName } from "@/lib/queries";
import { cn } from "@/utils/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { SignoutIcon } from "../Icons";
import { ProfileSkeleton } from "./LoadingSkeleton";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { workspaceName, status } = useGetWorkspaceName();
  const [userIsSigningOut, setUserIsSigningOut] = useState(false);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      {(!session?.user?.image || status === "pending") && <ProfileSkeleton />}
      {session?.user?.image && status === "success" && (
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              "w-44 hover:bg-zinc-800 flex text-zinc-300 py-2 justify-left rounded-lg text-sm items-center transition-all delay-100 duration-200 ease-in-out pl-5",
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
            <span className="truncate">{workspaceName}</span>
          </button>
        </DropdownMenu.Trigger>
      )}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="center"
          sideOffset={8}
          className="w-44 shadow-md bg-zinc-800 border border-zinc-700/25 rounded-lg overflow-hidden pt-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50"
        >
          <DropdownMenu.Item className="flex flex-col outline-none px-4 border-b border-b-zinc-700/50">
            <span className="truncate text-zinc-300 mb-1 text-sm">
              {session?.user?.name}
            </span>
            <span className="truncate text-zinc-400 mb-4 text-xs">
              {session?.user?.email}
            </span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => e.preventDefault()}
            className="outline-none"
          >
            <button
              onClick={() => {
                setUserIsSigningOut(true);
                signOut({ callbackUrl: "/signout" });
              }}
              className={cn(
                "text-zinc-500 w-full font-medium flex items-center text-sm h-10 hover:bg-zinc-700/40 hover:text-zinc-400 px-4",
                userIsSigningOut && "justify-center"
              )}
            >
              {userIsSigningOut && <ClipLoader color="#8b5cf6" size={24} />}
              {!userIsSigningOut && (
                <>
                  <SignoutIcon className="w-4 h-4 mr-3 shrink-0" />
                  Sign Out
                </>
              )}
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileMenu;
