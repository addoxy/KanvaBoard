'use client';

import { Button } from '@/components/vendor/button';
import { signOut, useSession } from 'next-auth/react';

const DashboardPage = () => {
  const session = useSession();

  return (
    <>
      <div>Dashboard page</div>
      <div>{JSON.stringify(session)}</div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};

export default DashboardPage;
