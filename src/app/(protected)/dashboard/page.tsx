'use client';

import { useUser } from '@/hooks/user/use-user';

const DashboardPage = () => {
  const user = useUser();

  return (
    <>
      <div>{JSON.stringify(user)}</div>
    </>
  );
};

export default DashboardPage;
