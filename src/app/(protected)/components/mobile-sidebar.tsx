'use client';

import { Button } from '@/components/vendor/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/vendor/sheet';
import { cn } from '@/utils/utils';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';

type MobileSidebarProps = {
  className?: string;
};

const MobileSidebar = ({ className }: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close the sidebar whenever the path changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="mr-6 lg:hidden">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-fit p-0">
        <Sidebar className={cn('h-full w-80', className)} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
