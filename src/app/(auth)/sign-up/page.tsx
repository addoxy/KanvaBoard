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
import { useSignUp } from '@/hooks/user/use-sign-up';
import { signUpSchema } from '@/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import OAuthSection from '../components/oauth-section';

const SignUpPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Create an account</h1>
      <div className="mt-3 flex gap-1 font-medium">
        <p className="text-sm text-muted-foreground">Already have an account? </p>
        <Link href="/sign-in" className="text-sm">
          <AnimatedUnderline>
            Sign in <ArrowRightIcon className="size-3" />
          </AnimatedUnderline>
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

const SignUpForm = () => {
  const { mutate: signUp, isPending } = useSignUp();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    signUp({
      json: values,
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
              <Button type="submit" className="mt-2" disabled={isPending}>
                {isPending ? <Loader /> : 'Sign up'}
              </Button>
            </form>
          </Form>
          <OAuthSection disabled={isPending} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
