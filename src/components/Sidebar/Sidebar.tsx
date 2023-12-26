"use client";

import { useGetBoards } from "@/lib/queries";
import { FavoriteSkeleton } from "./LoadingSkeleton";
import NavHeader from "./NavHeader";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

const Sidebar = () => {
  const { boards, status } = useGetBoards();

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
    <aside className="w-50 shrink-0 h-screen bg-zinc-800/20 border border-r border-zinc-700/25">
      <nav className="flex flex-col">
        <div className="flex justify-center mb-8 mt-6">
          <ProfileMenu />
        </div>
        <NavHeader name="Tools" className="mb-6 ml-8" />
        <div className="flex flex-col gap-y-1 items-center mb-10">
          {links.map((link, i) => (
            <NavItem name={link.name} href={link.href} key={i} />
          ))}
        </div>
        <NavHeader name="Favorites" className="mb-6 ml-8" />
        <div className="flex flex-col gap-y-1 items-center">
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
