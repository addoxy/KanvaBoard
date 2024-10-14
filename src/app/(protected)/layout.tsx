import { cn } from '@/utils/utils';
import PageHeader from './components/PageHeader';
import Sidebar from './components/sidebar';

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className={cn('flex min-h-screen w-full')}>
      <Sidebar className="hidden lg:flex lg:flex-col" />
      <div className="flex h-full w-full flex-col p-6">
        <PageHeader />
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
