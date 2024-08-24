import Image from 'next/image';

import { SignInModal } from '@/features/sign-in';
import { SignUpModal } from '@/features/sign-up';
import { ContainerImageScroll } from '@/shared/ui';

export function CtaSectionUI() {
  return (
    <section className="flex flex-col overflow-hidden">
      <ContainerImageScroll
        titleComponent={
          <section className="flex w-full flex-col items-center gap-7 pb-14 text-gray-700 md:gap-8 md:pb-44">
            <h1 className="text-3xl font-semibold md:text-6xl">TodoAI APP</h1>
            <p className="w-auto max-w-[900px] text-wrap px-5 text-center text-lg font-light md:px-0 md:text-4xl">
              Cutting-Edge Todo App with Integrated Generative AI for Efficient
              Task Planning
            </p>
            <div className="flex flex-row gap-4">
              <SignUpModal />
              <SignInModal />
            </div>
          </section>
        }
      >
        <Image
          src="/dashboard-preview.png"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerImageScroll>
    </section>
  );
}
