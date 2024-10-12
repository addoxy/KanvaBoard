'use client';

import AnimatedUnderline from '@/components/animated-underline';
import { GitHubIcon, GoogleIcon } from '@/components/icons';
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
import { signInSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SignInPage = () => {
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
      <SignInForm />
    </div>
  );
};

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof signInSchema>) {
    startTransition(() => {
      console.log(values);
    });
  }

  return (
    <div className="mt-8 w-full px-8 sm:mt-12 sm:w-fit sm:px-0">
      <div className="rounded-xl border border-border/70 bg-background p-4 sm:p-10">
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
                      <Input type="email" placeholder="Email" disabled={isPending} {...field} />
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
                        placeholder="Password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex flex-col gap-2">
                <Link href="/forgot-password" className="ml-auto text-sm">
                  <AnimatedUnderline>Forgot password?</AnimatedUnderline>
                </Link>
                <Button type="submit" disabled={isPending}>
                  Sign in
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-muted-foreground/15" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="h-px w-full bg-muted-foreground/15" />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="gap-2" disabled={isPending}>
              <GoogleIcon className="size-5" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="gap-2" disabled={isPending}>
              <GitHubIcon className="size-5 text-foreground" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
