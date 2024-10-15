'use client';

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
import { useCreateWorkspace } from '@/hooks/workspace/use-create-workspace';
import { createWorkspaceSchema } from '@/schemas/workspace-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateWorkspaceDialog = () => {
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  function onSubmit(values: z.infer<typeof createWorkspaceSchema>) {
    createWorkspace({
      json: {
        name: values.name,
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="sidebar" className="size-4 rounded-full p-0">
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
            <div className="flex items-center gap-2">
              <Button variant="outline" type="reset" disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Create workspace
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
