'use client';

import Loader from '@/components/loader';
import { buttonVariants } from '@/components/vendor/button';
import { useVerifyEmail } from '@/hooks/user/use-verify-email';
import { cn } from '@/utils/utils';
import { CircleAlert, CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const NewVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { mutate: verifyEmail, status } = useVerifyEmail();
  const [error, setError] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Verification token is missing!');
      return;
    }

    verifyEmail({
      json: {
        token: token,
      },
    });
  }, [token, verifyEmail]);

  useEffect(() => onSubmit(), [onSubmit]);

  const isPending = status === 'pending';
  const isSuccess = status === 'success' && !error;
  const isError = status === 'error' || !!error;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/70 bg-background p-6 sm:px-20 sm:py-10">
      <p className={cn('mt-3 text-muted-foreground', isError && 'text-destructive')}>
        {isPending && 'Verifying your email!'}
        {isError && (error || 'Something went wrong')}
        {isSuccess && 'Successfully verified your email!'}
      </p>
      {isPending && <Loader className="mt-4 size-8 text-primary" />}
      {isSuccess && <CircleCheck className="mt-4 size-8 text-primary" />}
      {isError && <CircleAlert className="mt-4 size-8 text-destructive" />}
      {(isSuccess || isError) && (
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
      )}
    </div>
  );
};

export default NewVerificationPage;
