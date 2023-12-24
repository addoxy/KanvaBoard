"use client";

import { usePathname } from "next/navigation";
import NavHeader from "./NavHeader";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

const Sidebar = () => {
  const pathname = usePathname();

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

  const favorites = [
    { name: "Project Progress", href: "/someid" },
    { name: "Resume Tracker", href: "/someid" },
  ];

  const restrictedPaths = ["/sign-in", "/"];

  return (
    <>
      {!restrictedPaths.includes(pathname) && (
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
              {favorites.map((link, i) => (
                <NavItem name={link.name} href={link.href} key={i} />
              ))}
            </div>
          </nav>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
