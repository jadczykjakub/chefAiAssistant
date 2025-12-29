'use client';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ArrowRightIcon } from '@/components/ui/icon';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-50 p-4">
      <div className="z-10 flex w-full max-w-sm flex-col items-center justify-center space-y-8 rounded-[2.5rem] bg-white/60 p-8 text-center shadow-card backdrop-blur-xl border border-white/60 ring-1 ring-white/40 md:max-w-3xl md:p-14 lg:p-20">
        <div className="space-y-5">
          <div>
            <Text
              size="3xl"
              className="font-heading font-extrabold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl leading-tight"
            >
              Chef AI Assistant
            </Text>
          </div>

          <div>
            <Text
              size="md"
              className="mx-auto max-w-[280px] font-body leading-relaxed text-neutral-600 md:max-w-xl md:text-xl md:leading-relaxed"
            >
              Organize your events effortlessly with our AI-powered chef assistant.
            </Text>
          </div>
        </div>

        <Link href="/chat">
          <Button variant="solid" size="lg" action="primary" className="rounded-lg">
            <ButtonText className="text-neutral-50">Get Started</ButtonText>
            <ButtonIcon as={ArrowRightIcon} className="text-neutral-50" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
