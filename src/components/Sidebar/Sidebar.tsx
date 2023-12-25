"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FavoriteSkeleton } from "./LoadingSkeleton";
import NavHeader from "./NavHeader";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

interface ApiResponse {
  id: string;
  title: string;
}

const Sidebar = () => {
  const { data, status } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data } = await axios.get("/api/board?q=favorites");
      return JSON.parse(data) as ApiResponse[];
    },
  });

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
            data?.map((favorite) => (
              <NavItem
                name={favorite.title}
                href={`/projects/board/${favorite.id}`}
                key={favorite.id}
              />
            ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
