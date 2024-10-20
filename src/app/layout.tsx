import '@/styles/globals.css';
import AuthSessionProvider from '@/utils/auth-provider';
import Providers from '@/utils/providers';
import { cn } from '@/utils/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'KanvaBoard',
  description: 'Project management web app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSessionProvider>
      <html lang="en">
        <body
          className={cn(
            fontSans.variable,
            'min-h-screen bg-background font-sans antialiased'
            // process.env.NODE_ENV === 'development' && 'debug-screens'
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthSessionProvider>
  );
}
