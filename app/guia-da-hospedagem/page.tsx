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

export const metadata: Metadata = {
  title: 'Guia da hospedagem | Nossa Matilha',
  description:
    'Saiba como é a rotina dos cães na Nossa Matilha, em Resende (RJ). Confira as vacinas exigidas, o valor da diária e como reservar ou cancelar a hospedagem.',
};

/** Interactive boarding guide (replaces the PDF sent to new customers). */
export default function BoardingGuidePage(): ReactNode {
  return (
    <div className="guide">
      <GuideHeader />
      <main>
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
    </div>
  );
}
