'use client';

import ButtonWithLoader from '@/components/button-with-loader';
import Loader from '@/components/loader';
import { Button } from '@/components/vendor/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/vendor/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/vendor/form';
import { Input } from '@/components/vendor/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/vendor/select';
import { useSidebarToggle } from '@/hooks/sidebar/use-sidebar-toggle';
import { useCreateWorkspace } from '@/hooks/workspace/use-create-workspace';
import { useGetWorkspaces } from '@/hooks/workspace/use-get-workspaces';
import { createWorkspaceSchema } from '@/schemas/workspace-schemas';
import { useStore } from '@/utils/store';
import { cn } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const WorkspaceSection = () => {
  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <div className="flex flex-col">
      {expanded && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Workspaces</span>
          <CreateWorkspaceDialog />
        </div>
      )}
      <WorkspaceSwitcher />
    </div>
  );
};

const WorkspaceSwitcher = () => {
  const { workspaces, isError, isPending, isSuccess } = useGetWorkspaces();
  const [value, setValue] = useState<string | undefined>(
    workspaces && workspaces.length > 0 ? workspaces[0].id : undefined
  );

  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  const placeholder = isPending ? (
    <div className={cn('flex', expanded && 'items-center gap-1')}>
      <Loader className="text-muted-foreground" />
      {expanded && ' Loading...'}
    </div>
  ) : expanded ? (
    'Select a workspace'
  ) : (
    ''
  );

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        showIcon={!isPending}
        className={cn('mt-2 hover:bg-muted', !expanded && 'w-10')}
      >
        <SelectValue placeholder={placeholder} />
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
          <p className="p-2 text-center text-sm">No workspaces found</p>
        )}
      </SelectContent>
    </Select>
  );
};

const CreateWorkspaceDialog = () => {
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const [open, setOpen] = useState(false);

  const { mutate: createWorkspace, isPending } = useCreateWorkspace({
    onSuccessCallback: () => setOpen(false),
  });

  function onSubmit(values: z.infer<typeof createWorkspaceSchema>) {
    createWorkspace({
      json: {
        name: values.name,
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="size-4 p-2">
          <Plus className="size-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter workspace name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 flex items-center gap-2">
              <Button
                variant="outline"
                type="reset"
                disabled={isPending}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <ButtonWithLoader className="w-full" disabled={isPending} isPending={isPending}>
                Create workspace
              </ButtonWithLoader>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceSection;
