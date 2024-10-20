import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/vendor/sidebar';

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5">{children}</main>
    </SidebarProvider>
  );
}
