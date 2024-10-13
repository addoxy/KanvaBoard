import Logo from '@/components/logo';
import { cn } from '@/utils/utils';
import Link from 'next/link';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={cn('flex min-h-screen w-full items-center justify-center bg-muted py-20')}>
      <div className="flex w-full flex-col items-center justify-center gap-12">
        <Link href="/">
          <Logo size="lg" />
        </Link>
        {children}
      </div>
    </div>
  );
}
