"use client";

import { useGetBoards } from "@/lib/queries";
import { useStore } from "@/lib/store";
import { useSidebarToggle } from "@/lib/toggle";
import { cn } from "@/utils/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CrossIcon } from "../Icons";
import { FavoriteSkeleton } from "./LoadingSkeleton";
import NavHeader from "./NavHeader";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

interface SidebarProps {
  setIsOpen: (value: boolean) => void;
}

const Sidebar = (props: SidebarProps) => {
  const { setIsOpen } = props;
  const { boards, status } = useGetBoards();
  const [animationParent] = useAutoAnimate();
  const sidebarStore = useStore(
    useSidebarToggle,
    (state) => state
  ) as SidebarToggle;

  const links = [
    { name: "Projects", href: "/projects" },
    {
      name: "Templates",
      href: "/templates",
    },
    {
      name: "Preferences",
      href: "/preferences",
    },
  ];

  return (
    <aside
      className={cn(
        "shrink-0 w-full h-screen bg-zinc-825 border-r border-zinc-700/25 px-4 lg:px-0 md:w-72 lg:w-50 transition-all",
        sidebarStore?.toggle && "lg:w-72 lg:px-4"
      )}
    >
      <nav className="flex flex-col">
        <div
          className={cn(
            "flex lg:justify-center justify-between mb-8 mt-6 px-3",
            sidebarStore?.toggle && "lg:justify-between"
          )}
        >
          <ProfileMenu />
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              "hover:hover:bg-zinc-800/50 rounded-md lg:hidden",
              sidebarStore?.toggle && "lg:block"
            )}
          >
            <CrossIcon className="w-8 h-8 text-zinc-500" />
          </button>
        </div>
        <NavHeader name="Tools" className="mb-6 ml-8" />
        <div
          className={cn(
            "flex flex-col gap-y-1 items-left ml-3 mb-10",
            sidebarStore?.toggle && "lg:items-left lg:ml-3",
            !sidebarStore?.toggle && "lg:items-center lg:ml-0"
          )}
        >
          {links.map((link, i) => (
            <NavItem name={link.name} href={link.href} key={i} />
          ))}
        </div>
        <NavHeader name="Favorites" className="mb-6 ml-8" />
        <div
          className={cn(
            "flex flex-col gap-y-1 items-left ml-3 mb-10",
            sidebarStore?.toggle && "lg:items-left lg:ml-3",
            !sidebarStore?.toggle && "lg:items-center lg:ml-0"
          )}
          ref={animationParent}
        >
          {status === "pending" && <FavoriteSkeleton />}
          {status === "success" &&
            boards?.map((board) => {
              if (board.favorite) {
                return (
                  <NavItem
                    name={board.title}
                    href={`/projects/board/${board.id}`}
                    key={board.id}
                  />
                );
              }
            })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
