import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import React from 'react';

import { TRPCReactProvider } from '@/trpc/react';

import { NextAuthProvider } from './_providers';

export const metadata: Metadata = {
  title: 'TodoAI App',
  description:
    'Efficiently manage your tasks with our AI-powered todo list app. Generate personalized task lists, prioritize goals, and boost productivity effortlessly.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
