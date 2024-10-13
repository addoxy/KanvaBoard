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
import { useSendResetPasswordEmail } from '@/hooks/user/use-send-reset-password-email';
import { resetPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const ResetPasswordPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Forgot your password?</h1>
      <div className="mt-3 flex gap-1 font-medium">
        <p className="text-sm text-muted-foreground">Back to sign in? </p>
        <Link href="/sign-in" className="text-sm">
          <AnimatedUnderline>
            Sign in <ArrowRightIcon className="size-3" />
          </AnimatedUnderline>
        </Link>
      </div>
      <ResetPasswordForm />
    </div>
  );
};

const ResetPasswordForm = () => {
  const { mutate: sendResetPasswordEmail, isPending } = useSendResetPasswordEmail();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    sendResetPasswordEmail(
      { json: values },
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
      <div className="rounded-xl border border-border/70 bg-background p-5 sm:p-10">
        <div className="flex w-full flex-col gap-6 sm:w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mail@example.com"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="mt-2">
                {isPending ? <Loader /> : 'Send reset email'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
