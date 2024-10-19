'use client';

import Logo from '@/components/logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button, buttonVariants } from '@/components/vendor/button';
import { useSidebarToggle } from '@/hooks/sidebar/use-sidebar-toggle';
import { useStore } from '@/utils/store';
import { cn } from '@/utils/utils';
import {
  ChevronFirst,
  ChevronLast,
  CircleCheck,
  LayoutGrid,
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
        'flex h-screen w-60 flex-col border-r-2 border-border/50 bg-background py-5 transition-all',
        !expanded && 'w-20',
        className
      )}
    >
      <SectionContainer>
        <SidebarHeader />
      </SectionContainer>
      <Divider className="my-5" />
      <SectionContainer>
        <WorkspaceSection />
      </SectionContainer>
      <Divider className="mb-5 mt-6" />
      <SectionContainer>
        <NavigationSection />
      </SectionContainer>
      <Divider className="mb-6 mt-5" />
      <ScrollArea className="px-5">
        <PinnedSection />
      </ScrollArea>
      <div className="mt-auto">
        <Divider className="my-4" />
        <SectionContainer>
          <UserMenu />
        </SectionContainer>
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
        <div className="flex items-center gap-2 text-base">
          <Logo size="sm" />
          KanvaBoard
        </div>
      )}
      <div className={cn('flex items-center justify-center', !expanded && 'w-full')}>
        {sidebarStore && (
          <Button
            onClick={() => sidebarStore.setExpanded(!expanded)}
            variant="outline"
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

const NavigationSection = () => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <div className="flex flex-col">
      {expanded && <span className="text-sm text-muted-foreground">Pages</span>}
      <div className="mt-2 flex flex-col gap-1">
        <SidebarNavItem href="/dashboard" icon={LayoutGrid}>
          Dashboard
        </SidebarNavItem>
        <SidebarNavItem href="/my-tasks" icon={CircleCheck}>
          My Tasks
        </SidebarNavItem>
        <SidebarNavItem href="/projects" icon={PanelsTopLeft}>
          Projects
        </SidebarNavItem>
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
          className: cn(
            'w-full justify-start gap-2 px-2.5 font-normal text-foreground/80 hover:bg-foreground/10 hover:text-foreground',
            !expanded && 'w-fit'
          ),
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
  return <div className={cn('h-0.5 shrink-0 bg-foreground/5', className)} />;
};

type SectionContainerProps = {
  children: React.ReactNode;
};

const SectionContainer = ({ children }: SectionContainerProps) => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return <div className={cn('flex justify-center px-5', expanded && 'block')}>{children}</div>;
};

export default Sidebar;
