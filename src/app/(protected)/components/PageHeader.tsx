'use client';

import { usePathname } from 'next/navigation';
import MobileSidebar from './mobile-sidebar';

const PageHeader = () => {
  const pathname = usePathname();
  const formattedPath = pathname.split('-').join(' ').replace('/', '');

  return (
    <div className="flex justify-between">
      <h1 className="mb-8 text-xl font-semibold capitalize">{formattedPath}</h1>
      <MobileSidebar className="lg:hidden" />
    </div>
  );
};

export default PageHeader;
