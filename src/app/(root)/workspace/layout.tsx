import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import { getServerAuthSession } from '@/server/auth';

import { WorkspaceLayoutUI } from './_layout';

export const metadata: Metadata = {
  title: 'Workspace | TodoAI App',
  description:
    'Efficiently manage your tasks with our AI-powered todo list app. Generate personalized task lists, prioritize goals, and boost productivity effortlessly.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function ({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/');
  }

  return <WorkspaceLayoutUI>{children}</WorkspaceLayoutUI>;
}
