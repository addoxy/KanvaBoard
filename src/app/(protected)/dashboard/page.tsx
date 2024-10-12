import { auth } from '@/auth';

const DashboardPage = async () => {
  const session = auth();

  return (
    <>
      <div>Dashboard page</div>
      <div>{JSON.stringify(session)}</div>
    </>
  );
};

export default DashboardPage;
