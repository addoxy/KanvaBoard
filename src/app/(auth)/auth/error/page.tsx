import { buttonVariants } from '@/components/vendor/button';
import { cn } from '@/utils/utils';
import Link from 'next/link';

const AuthErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/70 bg-background p-6 sm:px-20 sm:py-10">
      <p className="text-3xl font-semibold">Oops!</p>
      <p className="mt-3 text-sm text-muted-foreground">Something went wrong!</p>
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({
            variant: 'default',
            className: 'mt-6',
          })
        )}
      >
        Back to sign in
      </Link>
    </div>
  );
};

export default AuthErrorPage;
