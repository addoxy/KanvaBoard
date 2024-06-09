"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/utils";
import {
  LayoutTemplate,
  LogOut,
  Settings,
  SquareKanban,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/boards",
    icon: <SquareKanban className="size-6" />,
    label: "Boards",
  },
  {
    href: "/favorites",
    icon: <Star className="size-6" />,
    label: "Favorites",
  },
  {
    href: "/templates",
    icon: <LayoutTemplate className="size-6" />,
    label: "Templates",
  },
];

const Sidebar = () => {
  return (
    <aside>
      <div className="border-sidebar-border flex h-screen w-20 shrink-0 flex-col items-center overflow-hidden border-r py-10">
        <Link href="/" className="mb-6">
          <Image src="/logo.svg" width={32} height={32} alt="logo" />
        </Link>
        <div className="bg-sidebar-border mb-7 h-px w-8 rounded-full" />
        {NAV_ITEMS.map((navItem) => (
          <NavItem
            key={navItem.label}
            href={navItem.href}
            icon={navItem.icon}
            label={navItem.label}
          />
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger className="mt-auto size-10 rounded-sm">
            AK
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem = (props: NavItemProps) => {
  const { href, icon, label } = props;
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "mb-6 h-fit rounded-sm p-2",
        pathname === href && "bg-primary text-background",
      )}
      title={label}
    >
      {icon}
    </Link>
  );
};

export default Sidebar;
