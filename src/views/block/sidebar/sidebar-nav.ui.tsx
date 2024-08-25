'use client';

import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSidebarStore } from '@/entities/sidebar';

import { ManageTodoListUI } from '../manage-todo-list';

export function SIdebarNavUI() {
  const pathname = usePathname();
  const { setSidebarOpen } = useSidebarStore();

  return (
    <>
      <div className="flex w-full flex-col gap-3 px-6 py-3">
        <div className="text-md w-full font-semibold text-gray-700">
          Overview
        </div>
        <div className="flex w-full flex-col text-gray-700">
          <Link
            onClick={() => setSidebarOpen(false)}
            href="/workspace/home"
            className={`flex w-full cursor-pointer select-none flex-row items-center gap-3 rounded-lg px-4 py-2 text-medium font-medium hover:bg-gray-200 ${
              pathname === '/workspace/home' ? 'bg-gray-200' : 'bg-transparent'
            }`}
          >
            <HomeIcon size={18} className="flex-shrink-0" />
            <h2>Home</h2>
          </Link>
        </div>
      </div>

      {pathname !== '/workspace/home' && <ManageTodoListUI />}
    </>
  );
}
