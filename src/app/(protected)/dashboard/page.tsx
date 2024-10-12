import { auth, signOut } from '@/auth';
import { Button } from '@/components/vendor/button';

const DashboardPage = async () => {
  const session = await auth();

  return (
    <>
      <div>Dashboard page</div>
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </>
  );
};

export default DashboardPage;
