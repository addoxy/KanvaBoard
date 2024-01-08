"use client";

import { useGetBoards } from "@/lib/queries";
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
    <aside className="w-full shrink-0 h-screen bg-zinc-825 border-r border-zinc-700/25 px-4 lg:px-0">
      <nav className="flex flex-col">
        <div className="flex lg:justify-center justify-between mb-8 mt-6 px-3">
          <ProfileMenu />
          <button
            onClick={() => setIsOpen(false)}
            className="hover:hover:bg-zinc-800/50 rounded-md lg:hidden"
          >
            <CrossIcon className="w-8 h-8 text-zinc-500" />
          </button>
        </div>
        <NavHeader name="Tools" className="mb-6 ml-8" />
        <div className="flex flex-col gap-y-1 lg:items-center items-left ml-3 lg:ml-0 mb-10">
          {links.map((link, i) => (
            <NavItem name={link.name} href={link.href} key={i} />
          ))}
        </div>
        <NavHeader name="Favorites" className="mb-6 ml-8" />
        <div
          className="flex flex-col gap-y-1 lg:items-center items-left ml-3 lg:ml-0 mb-10"
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
