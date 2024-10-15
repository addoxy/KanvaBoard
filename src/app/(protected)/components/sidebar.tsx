'use client';

import Logo from '@/components/logo';
import { Button, buttonVariants } from '@/components/vendor/button';
import { useSidebarToggle } from '@/hooks/sidebar/use-sidebar-toggle';
import { useStore } from '@/utils/store';
import { cn } from '@/utils/utils';
import {
  ChevronFirst,
  ChevronLast,
  CircleCheck,
  Home,
  LucideIcon,
  PanelsTopLeft,
} from 'lucide-react';
import Link from 'next/link';
import PinnedSection from './pinned-section';
import UserMenu from './user-menu';
import WorkspaceSection from './workspace-section';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <aside
      className={cn(
        'flex flex-col bg-secondary px-4 py-6 transition-all',
        !expanded && 'w-[68px]',
        expanded && 'w-56',
        className
      )}
    >
      <SidebarHeader />
      {expanded && (
        <>
          <Divider className="my-4" />
          <WorkspaceSection />
        </>
      )}
      <Divider className="my-6" />
      <div className="space-y-1">
        <SidebarNavItem href="/dashboard" icon={Home}>
          Dashboard
        </SidebarNavItem>
        <SidebarNavItem href="/my-tasks" icon={CircleCheck}>
          My Tasks
        </SidebarNavItem>
        <SidebarNavItem href="/projects" icon={PanelsTopLeft}>
          Projects
        </SidebarNavItem>
      </div>
      <Divider className="my-6" />
      <PinnedSection />
      <div className="mt-auto">
        <Divider className="my-4" />
        <UserMenu />
      </div>
    </aside>
  );
};

const SidebarHeader = () => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <div className="flex w-full items-center justify-between text-lg font-semibold">
      {expanded && (
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          KanvaBoard
        </div>
      )}
      <div className={cn('flex items-center justify-center', !expanded && 'w-full')}>
        {sidebarStore && (
          <Button
            onClick={() => sidebarStore.setExpanded(!expanded)}
            variant="sidebar"
            size="icon"
            className="hidden size-6 lg:flex"
          >
            {expanded ? <ChevronFirst className="size-4" /> : <ChevronLast className="size-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};

type SidebarNavItemProps = {
  href: string;
  children: React.ReactNode;
  icon: LucideIcon;
};

const SidebarNavItem = ({ href, children, icon }: SidebarNavItemProps) => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;
  const Icon = icon;

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          className:
            'w-full justify-start gap-2 px-2.5 font-normal text-muted-foreground hover:bg-foreground/10',
        })
      )}
    >
      <Icon className="size-4" />
      {expanded && children}
    </Link>
  );
};

type DividerProps = {
  className?: string;
};

const Divider = ({ className }: DividerProps) => {
  return <div className={cn('h-px w-full bg-foreground/5', className)} />;
};

export default Sidebar;
