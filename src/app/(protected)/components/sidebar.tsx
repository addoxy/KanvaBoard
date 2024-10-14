'use client';

import Logo from '@/components/logo';
import { Button, buttonVariants } from '@/components/vendor/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/vendor/select';
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
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import UserMenu from './user-menu';

const Sidebar = () => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <aside
      className={cn(
        'flex flex-col bg-secondary px-4 py-6 transition-all',
        !expanded && 'w-[68px]',
        expanded && 'w-56'
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
            className="size-6"
          >
            {expanded ? <ChevronFirst className="size-4" /> : <ChevronLast className="size-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};

const WorkspaceSection = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Workspaces</span>
        <Button variant="sidebar" className="size-4 rounded-full p-0">
          <Plus className="size-3" />
        </Button>
      </div>
      <Select>
        <SelectTrigger className="mt-2 border-none bg-foreground/5 font-medium text-muted-foreground shadow-none hover:bg-foreground/15 hover:text-foreground">
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const PinnedSection = () => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <div className="flex flex-col">
      {expanded && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Pinned</span>
          <Button variant="sidebar" className="size-4 rounded-full p-0">
            <Plus className="size-3" />
          </Button>
        </div>
      )}
      <div className="mt-2 space-y-1">
        <ProjectItem name="New project" />
        <ProjectItem name="Another project" />
      </div>
    </div>
  );
};

type ProjectItemProps = {
  name: string;
};

const ProjectItem = ({ name }: ProjectItemProps) => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <Link
      href={`/projects/${name}`}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          className:
            'w-full justify-start gap-2 px-1.5 font-normal capitalize text-muted-foreground hover:bg-foreground/10',
        })
      )}
    >
      <div className="flex size-6 items-center justify-center rounded-md bg-primary capitalize text-background">
        {name[0]}
      </div>
      {expanded && name}
    </Link>
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
