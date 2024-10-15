'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/vendor/select';

import Loader from '@/components/loader';
import { useGetWorkspaces } from '@/hooks/workspace/use-get-workspaces';
import { useState } from 'react';
import CreateWorkspaceDialog from './create-workspace-dialog';

const WorkspaceSection = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Workspaces</span>
        <CreateWorkspaceDialog />
      </div>
      <WorkspaceSwitcher />
    </div>
  );
};

const WorkspaceSwitcher = () => {
  const { workspaces, isError, isPending, isSuccess } = useGetWorkspaces();
  const [value, setValue] = useState<string | undefined>(
    workspaces && workspaces.length > 0 ? workspaces[0].id : undefined
  );

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="mt-2 border-none bg-foreground/10 font-medium text-foreground shadow-none hover:bg-foreground/15">
        <SelectValue placeholder={isPending ? 'Loading...' : 'Select a workspace'} />
      </SelectTrigger>
      <SelectContent>
        {isError && (
          <p className="py-2 text-center text-sm text-destructive">Something went wrong</p>
        )}
        {isPending && <Loader className="mx-auto my-2 size-6 text-primary" />}
        {isSuccess &&
          workspaces &&
          workspaces.length > 0 &&
          workspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              {workspace.name}
            </SelectItem>
          ))}
        {isSuccess && (workspaces?.length == 0 || !workspaces) && (
          <p className="py-2 text-center text-sm">No workspaces found</p>
        )}
      </SelectContent>
    </Select>
  );
};

export default WorkspaceSection;
