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
import { useSignIn } from '@/hooks/user/use-sign-in';
import { signInSchema } from '@/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { CircleAlert } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import OAuthSection from '../components/oauth-section';

const SignInPage = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use!' : '';

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Sign in to your account</h1>
      <div className="mt-3 flex gap-1 font-medium">
        <p className="text-sm text-muted-foreground">Don&apos;t have an account? </p>
        <Link href="/sign-up" className="text-sm">
          <AnimatedUnderline>
            Create one <ArrowRightIcon className="size-3" />
          </AnimatedUnderline>
        </Link>
      </div>
      {urlError && (
        <div className="mt-8">
          <ErrorBadge error={urlError} />
        </div>
      )}
      <SignInForm />
    </div>
  );
};

const SignInForm = () => {
  const { mutate: signIn, isPending } = useSignIn();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    // clear the search params to ensure the urlError is not always displayed
    router.replace(window.location.pathname);

    signIn({ json: values });
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
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="/reset-password"
                  aria-disabled={isPending}
                  className="ml-auto text-sm aria-disabled:pointer-events-none aria-disabled:opacity-50"
                >
                  <AnimatedUnderline>Forgot password?</AnimatedUnderline>
                </Link>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader /> : 'Sign in'}
                </Button>
              </div>
            </form>
          </Form>
          <OAuthSection disabled={isPending} />
        </div>
      </div>
    </div>
  );
};

type ErrorBadgeProps = {
  error: string;
};

const ErrorBadge = ({ error }: ErrorBadgeProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/10 bg-destructive/10 px-8 py-3 text-destructive/80">
      <CircleAlert className="size-4 text-destructive/70" />
      {error}
    </div>
  );
};

export default SignInPage;
