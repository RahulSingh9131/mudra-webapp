import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '@/trpc/react';
import { siteConfig } from '@/config/site';
import { ThemeProvider } from './_context/ThemeContext';

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
