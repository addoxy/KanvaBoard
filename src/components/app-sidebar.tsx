'use client';

import {
  ChevronDown,
  ChevronsUpDown,
  CircleCheck,
  Hash,
  LayoutGrid,
  LogOut,
  PanelsTopLeft,
  Plus,
  Search,
} from 'lucide-react';

import CreateWorkspaceDialog from '@/app/(protected)/components/create-workspace-dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/vendor/sidebar';
import { useUser } from '@/hooks/user/use-user';
import { useActiveWorkspace } from '@/hooks/workspace/use-active-workspace';
import { useGetWorkspaces } from '@/hooks/workspace/use-get-workspaces';
import { Workspace } from '@/lib/types';
import { cn } from '@/utils/utils';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loader from './loader';
import Logo from './logo';
import { Avatar, AvatarFallback, AvatarImage } from './vendor/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './vendor/dropdown-menu';
import { Input } from './vendor/input';

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="group">
      <SidebarHeader className="flex items-center justify-center">
        <div
          className={cn(
            'flex items-center justify-between pt-2',
            state === 'expanded' && 'w-full px-2'
          )}
        >
          {state === 'expanded' && (
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-semibold">KanvaBoard</span>
            </div>
          )}
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarSeparator className="my-2" />
      <SidebarContent className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-transparent group-hover:scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
        <WorkspaceSection />
        <SidebarSeparator />
        <NavigationSection />
        <SidebarSeparator />
        <PinnedSection />
      </SidebarContent>
      <SidebarSeparator className="mt-4" />
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

const WorkspaceSection = () => {
  const { workspaces, isError, isPending, isSuccess } = useGetWorkspaces();
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';
  const isCollapsed = state === 'collapsed';

  const router = useRouter();
  const activeWorkspace = useActiveWorkspace();

  function handleSelect(id: string) {
    router.push(`/workspaces/${id}`);
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupAction>
        <CreateWorkspaceDialog />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {isPending && (
                    <div className="flex items-center gap-1">
                      <Loader className="text-foreground" /> {isExpanded && 'Loading...'}
                    </div>
                  )}
                  {isError && 'Select a Workspace'}
                  {isSuccess ? (
                    activeWorkspace ? (
                      <div className={cn('flex items-center gap-2', isExpanded && 'truncate')}>
                        <div
                          className={cn(
                            'flex size-7 shrink-0 items-center justify-center rounded-md bg-primary capitalize text-background',
                            isCollapsed && '-ml-1.5'
                          )}
                        >
                          {activeWorkspace.name[0]}
                        </div>
                        {isExpanded && <span className="truncate">{activeWorkspace.name}</span>}
                      </div>
                    ) : (
                      'Select a workspace'
                    )
                  ) : (
                    ''
                  )}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isCollapsed ? 'right' : 'bottom'}
                align={isCollapsed ? 'start' : 'center'}
                className={cn(isExpanded && 'w-[--radix-popper-anchor-width]')}
              >
                {isPending && <p className="p-2 text-center text-sm">Loading...</p>}
                {isError && <p className="p-2 text-sm text-destructive">Something went wrong</p>}
                {isSuccess &&
                  workspaces &&
                  workspaces.map((workspace) => (
                    <WorkspaceItem onSelect={handleSelect} workspace={workspace} />
                  ))}
                {isSuccess && workspaces?.length == 0 && (
                  <p className="p-2 text-center text-sm">No workspaces</p>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

type WorkspaceItemProps = {
  onSelect: (id: string) => void;
  workspace: Workspace;
};

const WorkspaceItem = ({ onSelect, workspace }: WorkspaceItemProps) => {
  return (
    <DropdownMenuItem onSelect={() => onSelect(workspace.id)} className="gap-2">
      <div className="flex size-6 items-center justify-center rounded-md bg-primary capitalize text-background">
        {workspace.name[0]}
      </div>
      <span className="truncate">{workspace.name}</span>
    </DropdownMenuItem>
  );
};

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/my-tasks', label: 'My Tasks', icon: CircleCheck },
  {
    href: '/projects',
    label: 'Projects',
    icon: PanelsTopLeft,
  },
];

const NavigationSection = () => {
  const activeWorkspace = useActiveWorkspace();
  const baseUrl = `/workspaces/${activeWorkspace?.id}`;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Pages</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {NAV_ITEMS.map((navItem) => (
            <SidebarMenuButton asChild>
              <Link href={baseUrl + navItem.href}>
                <navItem.icon />
                <span>{navItem.label}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const MOCK_PROJECTS = [
  'E-Commerce Platform',
  'Mobile Banking App',
  'Internal Dashboard',
  'Customer Support Portal',
  'Inventory Management System',
  'Employee Training Platform',
  'Project Analytics Dashboard',
  'Social Media Integration',
  'Content Management System',
  'API Gateway Service',
];

const PinnedSection = () => {
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';

  const [query, setQuery] = useState('');

  const projects = MOCK_PROJECTS.filter((project) =>
    project.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Pinned Projects</SidebarGroupLabel>
      <SidebarGroupAction>
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        {isExpanded && (
          <div className="relative mb-3 mt-1 px-2">
            <Search className="absolute left-4 top-1/4 size-3.5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="h-8 pl-7"
            />
          </div>
        )}
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuButton asChild>
              <Link href="#" className="flex gap-2">
                <Hash />
                <span>{project}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const UserMenu = () => {
  const user = useUser();
  const name = user?.name ? user.name : user?.email;
  const { state } = useSidebar();
  const isExpanded = state === 'expanded';
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Avatar className={cn('size-7 rounded-md text-xs', isCollapsed && '-ml-1.5')}>
                <AvatarImage src={user?.image || ''} />
                <AvatarFallback className="rounded-md bg-primary text-background">
                  {name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex w-full items-center justify-between">
                <span>{name}</span>
                <ChevronsUpDown className="size-3" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isCollapsed ? 'right' : 'top'}
            align={isCollapsed ? 'end' : 'center'}
            className={cn(isExpanded && 'w-[--radix-popper-anchor-width]')}
          >
            <DropdownMenuItem
              className="justify-between !text-destructive"
              onSelect={() => {
                signOut({
                  redirectTo: '/sign-in',
                });
              }}
            >
              Sign Out <LogOut className="size-3 text-destructive" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
