import { cn } from '@/utils/utils';
import Sidebar from './components/sidebar';

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className={cn('flex min-h-screen w-full')}>
      <Sidebar />
      <div className="h-full w-full p-6">{children}</div>
    </div>
  );
}
