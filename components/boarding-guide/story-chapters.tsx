import Image from 'next/image';
import type { ReactNode } from 'react';
import logo from '@/assets/brand/logo.svg';
import { BaconSays } from '@/components/boarding-guide/bacon-says';
import { ChapterSection } from '@/components/boarding-guide/chapter-section';
import { GuidePhoto } from '@/components/boarding-guide/guide-photo';
import { AboutMotion } from '@/components/boarding-guide/motion/about-motion';
import { BookingMotion } from '@/components/boarding-guide/motion/booking-motion';
import { DayMotion } from '@/components/boarding-guide/motion/day-motion';
import { GroomingMotion } from '@/components/boarding-guide/motion/grooming-motion';
import { HeroMotion } from '@/components/boarding-guide/motion/hero-motion';
import { ReadyMotion } from '@/components/boarding-guide/motion/ready-motion';
import { TeamMotion } from '@/components/boarding-guide/motion/team-motion';
import { WhatsAppButton } from '@/components/boarding-guide/whatsapp-cta';
import { Card } from '@/components/ui/card';
import { buttonClasses } from '@/components/ui/button';
import {
  ArrowDownIcon,
  CameraIcon,
  ChatIcon,
  CheckIcon,
} from '@/components/ui/icons';
import { guidePhotos } from '@/lib/boarding-guide/photos';
import { BOOKING_NOTICE_HOURS } from '@/lib/boarding-guide/pricing';
import {
  INSTAGRAM_URL,
  getGroomingWhatsApp,
  whatsAppLink,
} from '@/lib/contact';

/** Chapter 0: welcome hero. */
export function WelcomeChapter(): ReactNode {
  return (
    <section
      id="boas-vindas"
      aria-labelledby="boas-vindas-titulo"
      className="tone-light scroll-mt-16 overflow-hidden px-4 pb-6 sm:px-8 sm:pb-24 md:pt-16"
    >
      <HeroMotion className="mx-auto grid max-w-page items-center gap-10 md:grid-cols-2">
        {/* Mobile: fills the first screen; the photo comes on scroll. */}
        <div className="flex flex-col items-center text-center max-md:min-h-below-header max-md:py-8">
          {/* The logo is the page heading; the title text is for assistive tech. */}
          <h1
            id="boas-vindas-titulo"
            data-hero="logo"
            className="max-md:mt-auto"
          >
            <Image
              src={logo}
              alt="Nossa Matilha"
              className="h-auto w-44 sm:w-56"
              unoptimized
              loading="eager"
            />
            <span className="sr-only"> — Guia da hospedagem</span>
          </h1>
          <p data-hero="intro" className="mt-8 max-w-reading text-intro">
            Vai hospedar seu cão pela primeira vez? Veja como é o dia dele na
            Nossa Matilha e o que você precisa preparar antes da chegada.
          </p>
          {/* Desktop: the photo is beside the text, so a jump is useful. */}
          <div data-hero="cta" className="mt-8 hidden md:block">
            <a href="#quem-somos" className={buttonClasses('primary')}>
              Começar
              <ArrowDownIcon className="size-5" />
            </a>
          </div>
          {/* Mobile: the photo comes next, so only invite to scroll. */}
          <p
            data-hero="cta"
            className="mt-8 flex flex-col items-center gap-1 font-heading font-semibold text-leaf-ink max-md:mt-auto md:hidden"
          >
            Role a página para começar
            <ArrowDownIcon
              aria-hidden="true"
              className="size-6 animate-nudge-down"
            />
          </p>
        </div>
        <div className="relative">
          <div data-hero="photo">
            <GuidePhoto
              photo={guidePhotos.heroDogsOfAllSizes}
              sizes="(min-width: 768px) 560px, 100vw"
              priority
              reveal={false}
              className="mx-auto max-w-md"
            />
          </div>
          <div data-hero="bacon" className="relative">
            <BaconSays
              pose="hello"
              eager
              reveal={false}
              className="-mt-16 sm:-mt-20"
            >
              Oi, eu sou o Bacon! Essa é a minha casa. Vem comigo conhecer o
              quintal.
            </BaconSays>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}

/** A big number; {@link AboutMotion} counts it up from zero on scroll. */
function Stat({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}): ReactNode {
  const display = value.toLocaleString('pt-BR');
  return (
    <li data-stat>
      <p className="font-display text-display text-leaf">
        {prefix}
        <span data-count-to={value}>{display}</span>
        {suffix}
      </p>
      <p className="mt-1 max-w-xs text-fg">{label}</p>
    </li>
  );
}

/** Chapter 1: who we are and the space. */
export function AboutChapter(): ReactNode {
  return (
    <AboutMotion>
      <ChapterSection
        id="quem-somos"
        tone="light"
        number={1}
        title="Quem somos e como é o espaço"
        intro="Em Resende (RJ), os cães brincam nas áreas da creche e dormem nos quartos de descanso."
      >
        <ul className="grid gap-8 sm:grid-cols-3">
          <Stat
            value={1100}
            prefix="+ de "
            suffix=" m²"
            label="de espaço para os cães"
          />
          <Stat value={32} prefix="até " label="cães, com atenção a cada um" />
          <Stat
            value={24}
            suffix="h"
            label="de acompanhamento por uma equipe treinada"
          />
        </ul>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div data-space-photo>
            <GuidePhoto
              photo={guidePhotos.spaceDaycareLawn}
              sizes="(min-width: 640px) 33vw, 100vw"
              reveal={false}
              caption="Gramado da creche"
            />
          </div>
          <div data-space-photo>
            <GuidePhoto
              photo={guidePhotos.spaceDaycareCovered}
              sizes="(min-width: 640px) 33vw, 100vw"
              reveal={false}
              caption="Área coberta da creche"
            />
          </div>
          <div data-space-photo>
            <GuidePhoto
              photo={guidePhotos.spaceKennelCorridor}
              sizes="(min-width: 640px) 33vw, 100vw"
              reveal={false}
              caption="Quartos de descanso"
            />
          </div>
        </div>

        <div className="mt-16 grid items-center gap-8 md:grid-cols-2">
          <div data-play-photo className="mx-auto w-full max-w-md">
            <GuidePhoto
              photo={guidePhotos.socializationSizes}
              sizes="(min-width: 768px) 45vw, 100vw"
              reveal={false}
              className="mx-auto w-full max-w-md"
            />
          </div>
          <div data-play-text>
            <h3 className="text-h2 font-bold">Como os cães brincam em grupo</h3>
            <p className="mt-3 max-w-reading text-lead">
              A equipe reúne cães com níveis de energia parecidos. Assim, cães
              grandes e pequenos podem brincar no mesmo grupo.
            </p>
            <div data-play-bacon className="mt-8">
              <BaconSays pose="playing" reveal={false}>
                Eu sou grandão. Tem cachorro pequeno que corre mais que eu!
              </BaconSays>
            </div>
          </div>
        </div>
      </ChapterSection>
    </AboutMotion>
  );
}

const teamFacts = [
  {
    title: 'Auxiliar veterinário',
    text: 'Quem cuida dos cães hospedados tem formação de auxiliar veterinário.',
  },
  {
    title: 'Monitor de creche',
    text: 'A equipe tem formação para acompanhar os cães na creche.',
  },
  {
    title: 'Treinamento contínuo',
    text: 'Todos na equipe continuam fazendo treinamentos.',
  },
];

/** Chapter 2: the team, led by Silvia. */
export function TeamChapter(): ReactNode {
  return (
    <TeamMotion>
      <ChapterSection
        id="equipe"
        tone="light"
        number={2}
        title="Quem cuida do seu cão"
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div data-team-photo className="mx-auto w-full max-w-md">
            <GuidePhoto
              photo={guidePhotos.teamSilviaAndBacon}
              sizes="(min-width: 768px) 45vw, 100vw"
              reveal={false}
            />
          </div>
          <div>
            <p data-team-intro className="max-w-reading text-lead">
              <strong className="relative isolate">
                Silvia Matrumoto
                <span
                  aria-hidden="true"
                  data-team-highlight
                  className="absolute inset-x-0 bottom-0.5 -z-10 h-2.5 rounded-full bg-lime/50"
                />
              </strong>{' '}
              lidera a equipe da Nossa Matilha. Ela é CEO e adestradora
              certificada pela FBAA (Federação Brasileira dos Adestradores de
              Animais).
            </p>
            <div data-team-bacon className="mt-8">
              <BaconSays pose="proud" reveal={false}>
                Essa é a Silvia, minha humana. Foi ela que me ensinou a sentar e
                esperar a minha vez na hora da comida.
              </BaconSays>
            </div>
          </div>
        </div>

        <div className="mt-16 grid items-start gap-8 md:grid-cols-2">
          <ul className="grid gap-4">
            {teamFacts.map((fact) => (
              <li key={fact.title} data-team-fact>
                <Card>
                  <h3 className="text-h3 font-bold">{fact.title}</h3>
                  <p className="mt-1">{fact.text}</p>
                </Card>
              </li>
            ))}
          </ul>
          <div data-team-group className="mx-auto w-full max-w-md">
            <GuidePhoto
              photo={guidePhotos.teamGroup}
              sizes="(min-width: 768px) 45vw, 100vw"
              caption="Nossa equipe"
              reveal={false}
            />
          </div>
        </div>
      </ChapterSection>
    </TeamMotion>
  );
}

type Moment = {
  title: string;
  text: ReactNode;
  photos: (keyof typeof guidePhotos)[];
};

const moments: Moment[] = [
  {
    title: 'Manhã',
    text: (
      <>
        Primeiro, os cães vão para o quintal. A equipe serve o café da manhã
        para um cão de cada vez e acompanha a refeição. Depois, a turma vai
        brincar na creche. Quem precisa almoçar ou já tem esse hábito recebe
        outra refeição no meio do dia.
      </>
    ),
    photos: ['dayMorningYard', 'dayMorningFeeding'],
  },
  {
    title: 'Tarde',
    text: 'À tarde, os cães brincam ou descansam, conforme o ritmo de cada um.',
    photos: ['dayAfternoonPlay', 'dayAfternoonRest'],
  },
  {
    title: 'Noite',
    text: 'A equipe serve o jantar para um cão de cada vez. Depois de brincar mais um pouco, os cães vão para os quartos. Um vigia acompanha a turma durante a noite.',
    photos: ['dayNightSharedBed', 'dayNightOwnBeds'],
  },
];

/**
 * Chapter 3: a day at Nossa Matilha. A sticky sky behind the content goes
 * from morning to night as the visitor scrolls; the sun starts beside the
 * title, sets and turns into the moon ({@link DayMotion}; static
 * morning sky without JavaScript or with reduced motion).
 */
export function DayChapter(): ReactNode {
  return (
    <section
      id="um-dia"
      aria-labelledby="um-dia-titulo"
      className="tone-light relative -scroll-mt-4 sm:-scroll-mt-12"
    >
      <DayMotion>
        {/* The sky fills the section; its sticky child stays inside it. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="absolute inset-0 bg-cream" />
            <div
              data-sky="afternoon"
              className="absolute inset-0 bg-lime/35 opacity-0"
            />
            <div
              data-sky="night"
              className="absolute inset-0 bg-forest opacity-0"
            />
            {/* Sun by day, moon by night: one orb that moves across the sky. */}
            <div
              data-sky="orb"
              className="absolute top-24 right-8 size-24 sm:right-24 sm:size-32"
            >
              <div
                data-sky="sun"
                className="absolute inset-0 rounded-full bg-sun/80"
              />
              <div
                data-sky="moon"
                className="invisible absolute inset-2 rounded-full bg-cream shadow-lift"
              />
            </div>
          </div>
        </div>

        <div className="relative px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-page">
            <div
              data-day-title
              className="w-fit max-w-reading rounded-card bg-cream/90 p-6 shadow-card backdrop-blur-sm"
            >
              <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
                03
              </p>
              <h2 id="um-dia-titulo" className="mt-2 font-display text-display">
                Um dia na
                <br className="sm:hidden" /> Matilha
              </h2>
            </div>

            <ol className="mt-16 space-y-24">
              {moments.map((moment) => (
                <li
                  key={moment.title}
                  data-moment
                  className="grid items-center gap-6 md:grid-cols-2"
                >
                  <Card data-moment-card>
                    <h3 className="font-display text-h1 text-leaf-ink">
                      {moment.title}
                    </h3>
                    <p className="mt-3 text-lead">{moment.text}</p>
                  </Card>
                  <div className="grid grid-cols-2 gap-3">
                    {moment.photos.map((key) => (
                      <div key={key} data-moment-photo>
                        <GuidePhoto
                          photo={guidePhotos[key]}
                          sizes="(min-width: 768px) 25vw, 50vw"
                          reveal={false}
                        />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>

            <div data-day-bacon className="mt-20">
              <BaconSays pose="eating" reveal={false}>
                Minha parte favorita é comer. Aqui eu posso acabar de lamber o
                pote no meu tempo.
              </BaconSays>
            </div>
          </div>
        </div>
      </DayMotion>
    </section>
  );
}

const bookingSteps = [
  'Ficha cadastral preenchida',
  'Foto do cartão de vacinação atualizado',
  'Datas e horários previstos de entrada e saída',
  'Comprovante de pagamento',
];

/** Chapter 5: how to book. */
export function BookingChapter(): ReactNode {
  return (
    <BookingMotion>
      <ChapterSection
        id="como-reservar"
        tone="light"
        number={5}
        title="Como reservar"
      >
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p
              data-booking-notice
              className="w-fit font-display text-display-xl text-brown"
            >
              <span data-count-to={BOOKING_NOTICE_HOURS}>
                {BOOKING_NOTICE_HOURS}
              </span>
              h
            </p>
            <p data-booking-text className="mt-2 max-w-reading text-lead">
              Peça a reserva pelo{' '}
              <strong>WhatsApp oficial da Nossa Matilha</strong> com pelo menos{' '}
              <strong>{BOOKING_NOTICE_HOURS} horas de antecedência</strong> em
              relação ao horário de entrada. A hospedagem funciona com reserva e
              depende de vaga.
            </p>
            <div data-booking-bacon className="mt-8">
              <BaconSays pose="phone" reveal={false}>
                Eu ainda tô aprendendo a digitar com a pata.
              </BaconSays>
            </div>
          </div>
          <div>
            <h3 className="text-h3 font-bold">O que enviar pelo WhatsApp</h3>
            <ol className="mt-4 space-y-3">
              {bookingSteps.map((step, index) => (
                <li
                  key={step}
                  data-booking-step
                  className="flex items-center gap-4"
                >
                  <span
                    aria-hidden="true"
                    data-booking-number
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-lime font-heading text-h3 font-extrabold text-forest"
                  >
                    {index + 1}
                  </span>
                  <span className="font-heading text-lead font-semibold">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <Card data-booking-card accent={false} className="mt-8">
              <p>
                A equipe confirma a reserva depois de conferir os documentos e a
                vaga, receber o pagamento e confirmar que você aceitou as
                regras.
              </p>
              <p data-booking-warning className="mt-3 font-semibold">
                Orçamento não é reserva.
              </p>
              <p className="mt-1">
                Pacotes também precisam ser reservados com{' '}
                {BOOKING_NOTICE_HOURS}h de antecedência.
              </p>
            </Card>
          </div>
        </div>
      </ChapterSection>
    </BookingMotion>
  );
}

/** Position and size of each decorative soap bubble (chapter 9). */
const bubbles = [
  'bottom-8 left-1/12 size-8',
  'bottom-16 left-1/3 size-5',
  'bottom-6 left-1/2 size-10',
  'bottom-20 left-2/3 size-6',
  'bottom-10 left-4/5 size-9',
  'bottom-24 left-1/6 size-4',
];

/** Chapter 9: bath and grooming with the partner Encantacão. */
export function GroomingChapter(): ReactNode {
  const grooming = getGroomingWhatsApp();
  return (
    <GroomingMotion>
      <ChapterSection
        id="banho-e-tosa"
        tone="light"
        number={9}
        title="Banho e tosa durante a hospedagem"
        intro={
          <>
            A <strong>Encantacão</strong>, nossa parceira, atende aqui mesmo na
            Nossa Matilha. Se quiser incluir banho ou tosa na hospedagem, avise
            na hora da reserva.
          </>
        }
      >
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="relative grid grid-cols-2 gap-3">
            <div data-grooming-photo>
              <GuidePhoto
                photo={guidePhotos.groomingBath}
                sizes="(min-width: 768px) 25vw, 50vw"
                reveal={false}
              />
            </div>
            <div data-grooming-photo>
              <GuidePhoto
                photo={guidePhotos.groomingRoom}
                sizes="(min-width: 768px) 25vw, 50vw"
                reveal={false}
              />
            </div>
            {/* Soap bubbles: decoration, shown only while GSAP animates them. */}
            <div aria-hidden="true" className="pointer-events-none">
              {bubbles.map((bubble) => (
                <span
                  key={bubble}
                  data-grooming-bubble
                  className={`invisible absolute rounded-full border-2 border-white/80 bg-white/30 shadow-card ${bubble}`}
                />
              ))}
            </div>
          </div>
          <div>
            <p data-grooming-text className="text-lead">
              Agende pelo WhatsApp da Encantacão para buscar seu cão já de banho
              tomado.
            </p>
            <a
              href={whatsAppLink(grooming)}
              target="_blank"
              rel="noopener noreferrer"
              data-grooming-cta
              className={buttonClasses('secondary', 'mt-3')}
            >
              <ChatIcon className="size-5" />
              {grooming.display}
            </a>
            <div data-grooming-bacon className="mt-10">
              <BaconSays pose="bath" reveal={false}>
                Banho? Só se tiver toalha quentinha depois.
              </BaconSays>
            </div>
          </div>
        </div>
      </ChapterSection>
    </GroomingMotion>
  );
}

const summary = [
  { id: 'vacinas', text: 'Vacinas e cuidados em dia' },
  {
    id: 'diaria',
    text: 'Diária de 24 horas. Entrada e retirada das 7h às 18h.',
  },
  {
    id: 'malinha',
    text: 'Ração para a estadia e remédio com receita, se usar',
  },
  { id: 'cancelamento', text: 'Cancelamento pelo WhatsApp' },
] as const;

/** Shape and color of each confetti piece (chapter 10, all checkpoints). */
const confetti = [
  'size-2.5 rounded-sm bg-sun',
  'size-2 rounded-full bg-brown',
  'h-3 w-1.5 rounded-sm bg-forest',
  'size-2.5 rounded-full bg-white',
  'size-2 rounded-sm bg-leaf',
  'h-3 w-1.5 rounded-sm bg-sun',
  'size-2.5 rounded-full bg-forest',
  'size-2 rounded-sm bg-brown',
  'h-3 w-1.5 rounded-sm bg-white',
  'size-2.5 rounded-sm bg-leaf',
  'size-2 rounded-full bg-sun',
  'h-3 w-1.5 rounded-sm bg-brown',
  'size-2.5 rounded-full bg-leaf',
  'size-2 rounded-sm bg-white',
  'h-3 w-1.5 rounded-sm bg-forest',
  'size-2.5 rounded-sm bg-sun',
];

/** Chapter 10: summary and calls to action. */
export function ReadyChapter(): ReactNode {
  return (
    <ReadyMotion>
      <ChapterSection
        id="tudo-pronto"
        tone="light"
        number={10}
        title="Antes da primeira estadia"
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p
              data-ready-score
              className="font-heading text-lead font-semibold"
            >
              Você concluiu{' '}
              <span className="checkpoint-count font-display text-h2 text-leaf" />{' '}
              de {summary.length} paradas.
            </p>
            <ul className="mt-4 space-y-2">
              {summary.map((item) => (
                <li key={item.id} data-checkpoint-item={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex min-h-12 items-center gap-3 rounded-md font-heading text-lead font-semibold hover:text-leaf-ink"
                  >
                    <span className="checkpoint-mark grid size-8 shrink-0 place-items-center rounded-full text-forest">
                      <CheckIcon className="size-5" />
                    </span>
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <p
              data-all-checkpoints="pending"
              className="mt-4 text-caption text-fg-muted"
            >
              Se quiser rever alguma parada, selecione o assunto na lista.
            </p>
            <div
              data-all-checkpoints="done"
              className="relative mt-6 rounded-card bg-lime p-5 text-forest shadow-card"
            >
              {/* Confetti: decoration, shown only while GSAP animates it. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 grid place-items-center"
              >
                {confetti.map((piece, index) => (
                  <span
                    key={index}
                    data-ready-confetti
                    className={`invisible col-start-1 row-start-1 ${piece}`}
                  />
                ))}
              </div>
              <p className="font-display text-h2">Guia concluído</p>
              <p className="mt-1">
                Já tem as datas? Peça um orçamento e faça a reserva com pelo
                menos {BOOKING_NOTICE_HOURS} horas de antecedência.
              </p>
            </div>
            <div data-ready-cta className="mt-10 w-fit">
              <WhatsAppButton>Pedir orçamento no WhatsApp</WhatsAppButton>
            </div>
            <div data-ready-bacon className="mt-10">
              <BaconSays pose="party" size="large" reveal={false}>
                Quando chegar, procura o labrador de coleira azul. Sou eu!
              </BaconSays>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div data-ready-photo>
              <GuidePhoto
                photo={guidePhotos.goodbyeSilviaAndBacon}
                sizes="(min-width: 768px) 25vw, 50vw"
                reveal={false}
              />
            </div>
            <div data-ready-photo>
              <GuidePhoto
                photo={guidePhotos.goodbyeHappyDog}
                sizes="(min-width: 768px) 25vw, 50vw"
                reveal={false}
              />
            </div>
          </div>
        </div>

        <div
          data-ready-instagram
          className="mt-16 rounded-card bg-surface-raised p-6 text-center shadow-card sm:p-10"
        >
          <p className="mx-auto max-w-reading">
            Quando temos promoção de hospedagem, avisamos no Instagram.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('outline', 'mt-6')}
          >
            <CameraIcon className="size-5" />
            @nossamatilha.resende
          </a>
        </div>
      </ChapterSection>
    </ReadyMotion>
  );
}
