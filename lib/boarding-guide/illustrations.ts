import type { StaticImageData } from 'next/image';
import bacon00 from '@/assets/illustrations/boarding-guide/bacon-00-ola.webp';
import bacon01 from '@/assets/illustrations/boarding-guide/bacon-01-brincando.webp';
import bacon02 from '@/assets/illustrations/boarding-guide/bacon-02-orgulhoso.webp';
import bacon03 from '@/assets/illustrations/boarding-guide/bacon-03-comendo.webp';
import bacon04 from '@/assets/illustrations/boarding-guide/bacon-04-vacina.webp';
import bacon05 from '@/assets/illustrations/boarding-guide/bacon-05-celular.webp';
import bacon06 from '@/assets/illustrations/boarding-guide/bacon-06-relogio.webp';
import bacon07 from '@/assets/illustrations/boarding-guide/bacon-07-malinha.webp';
import bacon08 from '@/assets/illustrations/boarding-guide/bacon-08-pensando.webp';
import bacon09 from '@/assets/illustrations/boarding-guide/bacon-09-banho.webp';
import bacon10 from '@/assets/illustrations/boarding-guide/bacon-10-festa.webp';

/** Illustrated poses of Bacon, the narrator, keyed by chapter. */
export type BaconPose =
  | 'hello'
  | 'playing'
  | 'proud'
  | 'eating'
  | 'vaccine'
  | 'phone'
  | 'clock'
  | 'bag'
  | 'thinking'
  | 'bath'
  | 'party';

/** Image and pt-BR alt text of each Bacon pose (see docs/illustration-guide.md). */
export const baconPoses: Record<
  BaconPose,
  { src: StaticImageData; alt: string }
> = {
  hello: { src: bacon00, alt: 'Bacon sentado, acenando com a pata.' },
  playing: { src: bacon01, alt: 'Bacon correndo, chamando para brincar.' },
  proud: { src: bacon02, alt: 'Bacon sentado, orgulhoso, de bandana verde.' },
  eating: { src: bacon03, alt: 'Bacon sentado diante do pote de ração.' },
  vaccine: {
    src: bacon04,
    alt: 'Bacon com um curativo no ombro e a carteirinha de vacina na boca.',
  },
  phone: { src: bacon05, alt: 'Bacon deitado, olhando o celular.' },
  clock: {
    src: bacon06,
    alt: 'Bacon com a cabeça inclinada, olhando um relógio.',
  },
  bag: { src: bacon07, alt: 'Bacon carregando a malinha na boca.' },
  thinking: {
    src: bacon08,
    alt: 'Bacon deitado, pensativo, ao lado de um calendário.',
  },
  bath: {
    src: bacon09,
    alt: 'Bacon de banho tomado, com uma toalha na cabeça.',
  },
  party: { src: bacon10, alt: 'Bacon pulando de alegria entre confetes.' },
};
