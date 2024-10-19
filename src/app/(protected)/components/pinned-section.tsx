'use client';

import { Button, buttonVariants } from '@/components/vendor/button';
import { Input } from '@/components/vendor/input';
import { useSidebarToggle } from '@/hooks/sidebar/use-sidebar-toggle';
import { useStore } from '@/utils/store';
import { cn } from '@/utils/utils';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

const PinnedSection = () => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <div className="flex flex-col">
      {expanded && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Pinned</span>
            <Button variant="outline" size="icon" className="size-4 p-2">
              <Plus className="size-3" />
            </Button>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-2 top-1/4 size-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
      )}
      <div className="mt-3 flex flex-col gap-1">
        <ProjectItem name="New project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
        <ProjectItem name="Another project" />
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
          className: cn(
            'w-full justify-start gap-2 px-1.5 font-normal capitalize text-foreground/80 hover:bg-foreground/10 hover:text-foreground',
            !expanded && 'w-fit'
          ),
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

export default PinnedSection;
