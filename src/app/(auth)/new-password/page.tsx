'use client';

import AnimatedUnderline from '@/components/animated-underline';
import Loader from '@/components/loader';
import { Button } from '@/components/vendor/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/vendor/form';
import { Input } from '@/components/vendor/input';
import { useResetPassword } from '@/hooks/user/use-reset-password';
import { newPasswordSchema } from '@/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { CircleAlert } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const NewPasswordPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Create new password</h1>
      <div className="mt-3 flex gap-1 font-medium">
        <p className="text-sm text-muted-foreground">Back to sign in? </p>
        <Link href="/sign-in" className="text-sm">
          <AnimatedUnderline>
            Sign in <ArrowRightIcon className="size-3" />
          </AnimatedUnderline>
        </Link>
      </div>
      <NewPasswordForm />
    </div>
  );
};

const NewPasswordForm = () => {
  const { mutate: resetPassword, isPending } = useResetPassword();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    if (!token) {
      setError('Password reset token is missing!');
      return;
    }

    resetPassword(
      {
        json: {
          password: values.password,
          token: token,
        },
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message || 'Something went wrong!');
          }
        },
        onError: () => {
          toast.error('Something went wrong!');
        },
      }
    );
  }

  return (
    <div className="mt-8 w-full px-8 sm:mt-12 sm:w-fit sm:px-0">
      {error && (
        <div className="mb-8 flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/10 bg-destructive/10 py-2 text-destructive/80">
          <CircleAlert className="size-4 text-destructive/70" /> {error}
        </div>
      )}
      <div className="rounded-xl border border-border/70 bg-background p-5 sm:p-10">
        <div className="flex w-full flex-col gap-6 sm:w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="mt-2">
                {isPending ? <Loader /> : 'Reset password'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
