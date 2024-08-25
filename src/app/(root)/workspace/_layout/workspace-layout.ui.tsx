'use client';

import { AlignJustify, LoaderCircleIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import { useSidebarStore } from '@/entities/sidebar';
import { SidebarUI } from '@/views/block/sidebar';

export function WorkspaceLayoutUI({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();

  const { setSidebarOpen } = useSidebarStore();

  return (
    <main className="flex h-screen w-screen flex-row bg-slate-100">
      {status !== 'authenticated' && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center bg-white">
          <LoaderCircleIcon size={70} className="animate-spin text-gray-600" />
        </div>
      )}

      <SidebarUI />
      <div className="h-screen w-full overflow-auto bg-gray-50 md:w-[calc(100vw_-_320px)]">
        {children}
      </div>
      <button
        aria-label="menu-label"
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-4 left-4 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-slate-200 text-gray-700 shadow-md md:hidden"
      >
        <AlignJustify size={24} />
      </button>
      <Toaster />
    </main>
  );
}
