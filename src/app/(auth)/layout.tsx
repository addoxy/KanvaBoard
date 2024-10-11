import Logo from '@/components/logo';
import { cn } from '@/utils/utils';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={cn('bg-muted flex min-h-screen w-full items-center justify-center py-20')}>
      <div className="flex w-full flex-col items-center justify-center gap-12">
        <Logo size="lg" />
        {children}
      </div>
    </div>
  );
}
