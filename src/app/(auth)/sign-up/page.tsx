import AnimatedUnderlinedText from '@/components/AnimatedUnderlinedText';
import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/vendor/button';
import { Input } from '@/components/vendor/input';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Create an account</h1>
      <div className="mt-3 flex gap-1 font-medium">
        <p className="text-muted-foreground text-sm">Already have an account? </p>
        <Link href="/sign-in" className="text-sm">
          <AnimatedUnderlinedText>
            Sign in <ArrowRightIcon className="size-3" />
          </AnimatedUnderlinedText>
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

const SignUpForm = () => {
  return (
    <div className="mt-8 w-full px-8 sm:mt-12 sm:w-fit sm:px-0">
      <div className="border-border/70 rounded-xl border bg-background p-4 sm:p-10">
        <div className="flex w-full flex-col gap-6 sm:w-96">
          <form className="flex flex-col gap-2">
            <Input type="email" placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Enter password again" />
            <Button className="mt-2">Sign up</Button>
          </form>
          <div className="flex items-center gap-2">
            <div className="bg-muted-foreground/15 h-px w-full" />
            <span className="text-muted-foreground text-sm">OR</span>
            <div className="bg-muted-foreground/15 h-px w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="gap-2">
              <GoogleIcon className="size-5" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="gap-2">
              <GitHubIcon className="size-5 text-foreground" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
