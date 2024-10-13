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
  title: 'Jeera',
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
            'debug-screens min-h-screen bg-background font-sans antialiased'
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthSessionProvider>
  );
}
