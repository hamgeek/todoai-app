import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';
import { HydrateClient } from '@/trpc/server';
import { HomepageUI } from '@/views/homepage/homepage.ui';

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect('/workspace/home');
  }

  return (
    <HydrateClient>
      <main className="w-full">
        <HomepageUI />
      </main>
    </HydrateClient>
  );
}
