'use client';

import { Button } from '@/components/vendor/button';
import { useUser } from '@/hooks/user/use-user';
import { signOut } from 'next-auth/react';

const DashboardPage = () => {
  const user = useUser();

  return (
    <>
      <div>Dashboard page</div>
      <div>{JSON.stringify(user)}</div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};

export default DashboardPage;
