'use client';

import { useSession } from 'next-auth/react';

import { ManageTodoListUI } from '../block/manage-todo-list';

export function WorkspaceHome() {
  const { data } = useSession();
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-2xl">
        Welcome back, {data?.user?.name}! Let&apos;s dive into what&apos;s next.
      </h1>
      <div className="w-full max-w-lg">
        <ManageTodoListUI />
      </div>
    </div>
  );
}
