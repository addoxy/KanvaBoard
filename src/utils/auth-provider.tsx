import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

type AuthSessionProviderProps = {
  children: React.ReactNode;
};

const AuthSessionProvider = async ({ children }: AuthSessionProviderProps) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthSessionProvider;
