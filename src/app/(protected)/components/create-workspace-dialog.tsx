'use client';

import ButtonWithLoader from '@/components/button-with-loader';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
              <ButtonWithLoader
                type="submit"
                className="w-full"
                disabled={isPending}
                isPending={isPending}
              >
                Create workspace
              </ButtonWithLoader>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
