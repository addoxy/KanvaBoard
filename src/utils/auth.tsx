import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

type NextAuthSessionProviderProps = {
  children: React.ReactNode;
};

export const NextAuthSessionProvider = async ({ children }: NextAuthSessionProviderProps) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
