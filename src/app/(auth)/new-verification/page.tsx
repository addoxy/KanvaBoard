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
  const { mutate: verifyEmail } = useVerifyEmail();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Verification token is missing!');
      return;
    }

    verifyEmail(
      {
        json: {
          token: token,
        },
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            setSuccess(data.message);
          } else {
            setError(data.message);
          }
        },
        onError: () => {
          setError('Something went wrong');
        },
      }
    );
  }, [token]);

  useEffect(() => onSubmit(), [onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/70 bg-background p-6 sm:px-20 sm:py-10">
      <p className="mt-3 text-muted-foreground">
        {success ? success : error ? error : 'Verifying your email!'}
      </p>
      {success ? (
        <CircleCheck className="mt-4 size-8 text-primary" />
      ) : error ? null : (
        <Loader className="mt-4 size-8 text-primary" />
      )}
      {error && <CircleAlert className="mt-4 size-8 text-destructive" />}
      {success || error ? (
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
      ) : null}
    </div>
  );
};

export default NewVerificationPage;
