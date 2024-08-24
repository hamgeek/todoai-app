'use client';

import { Avatar, Divider } from '@nextui-org/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { useSidebarStore } from '@/entities/sidebar';
import { SignOutModal } from '@/features/sign-out';

import { SIdebarNavUI } from './sidebar-nav.ui';

export function SidebarUI() {
  const { isSidebarOpen, setSidebarOpen } = useSidebarStore();
  const { data: dataUser } = useSession();

  return (
    <>
      <button
        aria-label="overlay-close"
        type="button"
        onClick={() => setSidebarOpen(false)}
        className={`${isSidebarOpen ? 'fixed' : 'hidden'} bottom-0 left-0 right-0 top-0 z-40 bg-gray-500/60 md:relative md:hidden`}
      />
      <aside
        className={`${isSidebarOpen ? 'fixed' : 'hidden'} bottom-0 left-0 top-0 z-50 h-screen w-[320px] overflow-auto bg-gray-100 md:relative md:block`}
      >
        <div className="flex w-full items-center gap-3 px-6 py-5">
          <Image
            src="/icon-192-maskable.png"
            className="rounded-md bg-gray-200"
            width={28}
            height={28}
            alt="logo"
          />
          <h1 className="text-xl font-bold text-gray-500">TodoAI</h1>
        </div>
        <Divider />
        <div className="flex-ro flex w-full flex-wrap items-center justify-between px-6 py-4">
          <div className="flex flex-row items-center gap-4">
            <Avatar size="md" src={dataUser?.user.image ?? ''} />
            <div className="flex flex-grow flex-col text-gray-700">
              <h2 className="text-wrap text-sm font-normal">
                {dataUser?.user.name}
              </h2>
              <p className="text-wrap text-sm font-light">
                {dataUser?.user.email}
              </p>
            </div>
          </div>
          <SignOutModal />
        </div>
        <Divider />
        <div className="w-full py-3">
          <SIdebarNavUI />
        </div>
      </aside>
    </>
  );
}
