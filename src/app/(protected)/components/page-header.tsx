'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/vendor/breadcrumb';
import { usePathname } from 'next/navigation';
import React from 'react';
import MobileSidebar from './mobile-sidebar';

const PageHeader = () => {
  const pathname = usePathname();
  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => ({
      href: `/${pathname
        .split('/')
        .filter(Boolean)
        .slice(0, pathname.split('/').filter(Boolean).indexOf(segment) + 1)
        .join('/')}`,
      label: segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    }));

  return (
    <div className="-mx-6 mb-6 flex justify-between border-b-2 border-border/50 pb-5">
      <Breadcrumb className="ml-6">
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, i) => (
            <React.Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <MobileSidebar className="lg:hidden" />
    </div>
  );
};

export default PageHeader;
