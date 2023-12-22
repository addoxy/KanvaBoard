import { cn } from "@/app/utils/utils";
import Link from "next/link";
import { HashIcon, PreferenceIcon, ProjectIcon, TemplateIcon } from "../Icons";

interface NavItemProps {
  name: string;
  href: string;
  className?: string;
}

const NavItem = (props: NavItemProps) => {
  const { name, href, className } = props;

  return (
    <Link
      href={href}
      className={cn(
        "text-zinc-500 hover:text-zinc-300 text-sm font-normal py-3 hover:bg-violet-700 w-44 rounded-lg flex items-center pl-5 pr-3",
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
