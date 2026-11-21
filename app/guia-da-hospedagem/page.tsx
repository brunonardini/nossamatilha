import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GuideHeader } from '@/components/boarding-guide/guide-header';
import {
  BagChapter,
  CancellationChapter,
  DailyRateChapter,
  VaccinesChapter,
} from '@/components/boarding-guide/rule-chapters';
import {
  AboutChapter,
  BookingChapter,
  DayChapter,
  GroomingChapter,
  ReadyChapter,
  TeamChapter,
  WelcomeChapter,
} from '@/components/boarding-guide/story-chapters';
import { WhatsAppFloatingButton } from '@/components/boarding-guide/whatsapp-cta';

export const metadata: Metadata = {
  title: 'Guia da hospedagem | Nossa Matilha',
  description:
    'Conheça a hospedagem da Nossa Matilha em Resende/RJ: o espaço, a equipe, a rotina dos cães, as vacinas, como reservar, a diária e o cancelamento.',
};

/** Interactive boarding guide (replaces the PDF sent to new customers). */
export default function BoardingGuidePage(): ReactNode {
  return (
    <div className="guide">
      <GuideHeader />
      <main className="pb-24">
        <WelcomeChapter />
        <AboutChapter />
        <TeamChapter />
        <DayChapter />
        <VaccinesChapter />
        <BookingChapter />
        <DailyRateChapter />
        <BagChapter />
        <CancellationChapter />
        <GroomingChapter />
        <ReadyChapter />
      </main>
      <WhatsAppFloatingButton />
    </div>
  );
}
