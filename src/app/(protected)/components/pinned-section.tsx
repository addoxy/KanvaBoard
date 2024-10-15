'use client';

import { Button, buttonVariants } from '@/components/vendor/button';
import { useSidebarToggle } from '@/hooks/sidebar/use-sidebar-toggle';
import { useStore } from '@/utils/store';
import { cn } from '@/utils/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

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

export default PinnedSection;
