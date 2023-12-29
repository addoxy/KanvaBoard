"use client";

import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HashIcon, PreferenceIcon, ProjectIcon, TemplateIcon } from "../Icons";

interface NavItemProps {
  name: string;
  href: string;
  className?: string;
}

const NavItem = (props: NavItemProps) => {
  const { name, href, className } = props;
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "text-zinc-500 text-sm font-normal py-3 w-44 rounded-lg flex items-center pl-5 pr-3 transition-all delay-100 duration-200 ease-in-out",
        pathname === `${href}`
          ? "bg-violet-700 text-zinc-300"
          : "hover:bg-zinc-700/30 hover:text-zinc-300",
        className
      )}
    >
      {name === "Projects" && <ProjectIcon className="w-4 h-4 mr-3 shrink-0" />}
      {name === "Templates" && (
        <TemplateIcon className="w-4 h-4 mr-3 shrink-0" />
      )}
      {name === "Preferences" && (
        <PreferenceIcon className="w-4 h-4 mr-3 shrink-0" />
      )}
      {name != "Projects" && name != "Templates" && name != "Preferences" && (
        <HashIcon className="w-4 h-4 mr-3 shrink-0" />
      )}
      <span className="truncate">{name}</span>
    </Link>
  );
};

export default NavItem;
