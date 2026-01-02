import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

import '@/app/globals.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chef AI Assistant',
  description: 'Application to assist in event organization.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-display antialiased bg-background text-text-main`}
      >
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider mode="light">{children}</GluestackUIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
