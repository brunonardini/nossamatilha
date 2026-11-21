import Image from 'next/image';
import type { ReactNode } from 'react';
import logo from '@/assets/brand/logo.svg';
import { BaconSays } from '@/components/boarding-guide/bacon-says';
import { ChapterSection } from '@/components/boarding-guide/chapter-section';
import { GuidePhoto } from '@/components/boarding-guide/guide-photo';
import { WhatsAppButton } from '@/components/boarding-guide/whatsapp-cta';
import { Card } from '@/components/ui/card';
import { buttonClasses } from '@/components/ui/button';
import {
  CameraIcon,
  ChatIcon,
  CheckIcon,
  PawIcon,
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
      className="tone-light scroll-mt-16 overflow-hidden px-4 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-24"
    >
      <div className="mx-auto grid max-w-page items-center gap-10 md:grid-cols-2">
        <div>
          <Image
            src={logo}
            alt="Nossa Matilha"
            className="h-auto w-32 sm:w-40"
            unoptimized
            loading="eager"
          />
          <h1
            id="boas-vindas-titulo"
            className="mt-6 font-display text-display-xl text-leaf"
          >
            Bem-vindo à <span className="text-brown">Matilha!</span>
          </h1>
          <p className="mt-4 max-w-reading text-lead">
            Que bom ter você e o seu cão aqui. Preparamos este guia para você
            conhecer a nossa casa, a nossa rotina e tudo o que precisa saber
            antes da primeira hospedagem. Leva só alguns minutos — e tem algumas
            paradas pelo caminho.
          </p>
          <a href="#quem-somos" className={buttonClasses('primary', 'mt-8')}>
            Começar
          </a>
        </div>
        <div className="relative">
          <GuidePhoto
            photo={guidePhotos.heroDogsOfAllSizes}
            sizes="(min-width: 768px) 560px, 100vw"
            priority
            className="mx-auto max-w-md"
          />
          <BaconSays pose="hello" eager className="-mt-16 sm:-mt-20">
            Oi! Eu sou o Bacon, e esta é a minha casa. Vem comigo que eu te
            mostro tudo — até as regras, mas prometo que é rapidinho.
          </BaconSays>
        </div>
      </div>
    </section>
  );
}

/** A big number that counts up as it enters the viewport. */
function Stat({
  value,
  animate = true,
  prefix,
  suffix,
  label,
}: {
  value: number;
  animate?: boolean;
  prefix?: string;
  suffix?: string;
  label: string;
}): ReactNode {
  const display = value.toLocaleString('pt-BR');
  return (
    <li className="scroll-reveal">
      <p className="font-display text-display text-leaf">
        <span className="sr-only">
          {prefix}
          {display}
          {suffix}
        </span>
        <span aria-hidden="true">
          {prefix}
          {animate ? (
            <span className="count-up" style={{ '--count-to': value }} />
          ) : (
            display
          )}
          {suffix}
        </span>
      </p>
      <p className="mt-1 max-w-xs text-fg">{label}</p>
    </li>
  );
}

/** Chapter 1: who we are and the space. */
export function AboutChapter(): ReactNode {
  return (
    <ChapterSection
      id="quem-somos"
      tone="light"
      number={1}
      title="Quem somos"
      intro="Um espaço completo de lazer, cuidado e descanso para o seu cão."
    >
      <ul className="grid gap-8 sm:grid-cols-3">
        <Stat
          value={1100}
          animate={false}
          prefix="+ de "
          suffix=" m²"
          label="para brincar, explorar e descansar"
        />
        <Stat
          value={32}
          prefix="até "
          label="cães, com conforto, segurança e cuidado individual"
        />
        <Stat
          value={24}
          suffix="h"
          label="de monitoramento, com profissionais qualificados em tempo integral"
        />
      </ul>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        <GuidePhoto
          photo={guidePhotos.spaceDaycareLawn}
          sizes="(min-width: 640px) 33vw, 100vw"
          caption="Creche: área externa e gramado"
        />
        <GuidePhoto
          photo={guidePhotos.spaceDaycareCovered}
          sizes="(min-width: 640px) 33vw, 100vw"
          caption="Creche: área coberta"
        />
        <GuidePhoto
          photo={guidePhotos.spaceKennelCorridor}
          sizes="(min-width: 640px) 33vw, 100vw"
          caption="Quartos de descanso"
        />
      </div>

      <div className="mt-16 grid items-center gap-8 md:grid-cols-2">
        <GuidePhoto
          photo={guidePhotos.socializationSizes}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="mx-auto w-full max-w-md"
        />
        <div>
          <h3 className="text-h2 font-bold">Socialização natural</h3>
          <p className="mt-3 max-w-reading text-lead">
            Aqui os cães não são separados por tamanho, e sim por nível de
            energia. Conviver com cães de tamanhos diferentes também faz parte
            da socialização.
          </p>
          <BaconSays pose="playing" className="mt-8">
            Eu sou grandão, mas brinco com todo mundo. O que importa é a
            energia!
          </BaconSays>
        </div>
      </div>
    </ChapterSection>
  );
}

const teamFacts = [
  {
    title: 'Auxiliar veterinário',
    text: 'Todos os profissionais que cuidam dos cães hospedados têm formação em auxiliar veterinário.',
  },
  {
    title: 'Monitor de creche',
    text: 'Formação específica para atuar como monitores de creche canina.',
  },
  {
    title: 'Treinamento contínuo',
    text: 'A equipe passa por treinamentos de aperfeiçoamento.',
  },
];

/** Chapter 2: the team, led by Silvia. */
export function TeamChapter(): ReactNode {
  return (
    <ChapterSection
      id="equipe"
      tone="light"
      number={2}
      title="Gente que entende de cachorro"
    >
      <div className="grid items-center gap-8 md:grid-cols-2">
        <GuidePhoto
          photo={guidePhotos.teamSilviaAndBacon}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="mx-auto w-full max-w-md"
        />
        <div>
          <p className="max-w-reading text-lead">
            <strong>Silvia Matrumoto</strong>, CEO da Nossa Matilha e
            adestradora certificada pela FBAA (Federação Brasileira dos
            Adestradores de Animais), lidera uma equipe preparada para cuidar do
            seu cão como se fosse da família.
          </p>
          <BaconSays pose="proud" className="mt-8">
            Essa é a Silvia, a minha humana. Ela que me ensinou a sentar — e a
            esperar a minha vez na hora da comida.
          </BaconSays>
        </div>
      </div>

      <div className="mt-16 grid items-start gap-8 md:grid-cols-2">
        <ul className="grid gap-4">
          {teamFacts.map((fact) => (
            <li key={fact.title} className="scroll-reveal">
              <Card>
                <h3 className="text-h3 font-bold">{fact.title}</h3>
                <p className="mt-1">{fact.text}</p>
              </Card>
            </li>
          ))}
        </ul>
        <GuidePhoto
          photo={guidePhotos.teamGroup}
          sizes="(min-width: 768px) 45vw, 100vw"
          caption="Nossa equipe"
          className="mx-auto w-full max-w-md"
        />
      </div>
    </ChapterSection>
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
        O dia começa com a saída para o quintal. Depois vem a alimentação,
        oferecida individualmente, um cão por vez, com a equipe acompanhando. Em
        seguida, a turma vai para os espaços da creche brincar e socializar.
        Quem precisa ou está acostumado ganha também um almoço no meio do dia.
      </>
    ),
    photos: ['dayMorningYard', 'dayMorningFeeding'],
  },
  {
    title: 'Tarde',
    text: 'Mais brincadeira ou descanso, respeitando o perfil e as necessidades de cada cão.',
    photos: ['dayAfternoonPlay', 'dayAfternoonRest'],
  },
  {
    title: 'Noite',
    text: 'O jantar também é individual. Depois de mais um pouco de diversão, cada um vai para o quarto de descanso, onde passa a noite tranquilo, com um vigia noturno acompanhando.',
    photos: ['dayNightSharedBed', 'dayNightOwnBeds'],
  },
];

/**
 * Chapter 3: a day at Nossa Matilha. A sticky sky behind the content goes
 * from morning to night as the visitor scrolls (CSS scroll-driven; static
 * cream sky where unsupported or with reduced motion).
 */
export function DayChapter(): ReactNode {
  return (
    <section
      id="um-dia"
      aria-labelledby="um-dia-titulo"
      className="tone-light day-timeline relative scroll-mt-16"
    >
      {/* The sky fills the section; its sticky child stays inside it. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute inset-0 bg-cream" />
          <div className="day-afternoon absolute inset-0 bg-lime/35" />
          <div className="day-night absolute inset-0 bg-forest" />
          <div className="day-sun absolute top-24 right-8 size-24 rounded-full bg-sun/80 sm:right-24 sm:size-32" />
          <div className="day-night absolute top-24 right-8 size-20 rounded-full bg-cream shadow-lift sm:right-24 sm:size-28" />
        </div>
      </div>

      <div className="relative px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-page">
          <div className="max-w-reading rounded-card bg-cream/90 p-6 shadow-card backdrop-blur-sm">
            <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
              03
            </p>
            <h2 id="um-dia-titulo" className="mt-2 font-display text-display">
              Um dia na Matilha
            </h2>
          </div>

          <ol className="mt-16 space-y-24">
            {moments.map((moment) => (
              <li
                key={moment.title}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <Card className="scroll-reveal">
                  <h3 className="font-display text-h1 text-leaf-ink">
                    {moment.title}
                  </h3>
                  <p className="mt-3 text-lead">{moment.text}</p>
                </Card>
                <div className="grid grid-cols-2 gap-3">
                  {moment.photos.map((key) => (
                    <GuidePhoto
                      key={key}
                      photo={guidePhotos[key]}
                      sizes="(min-width: 768px) 25vw, 50vw"
                    />
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <BaconSays pose="eating" className="mt-20">
            Minha parte favorita? A hora de comer. Cada um no seu tempo, sem
            briga!
          </BaconSays>
        </div>
      </div>
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
    <ChapterSection
      id="como-reservar"
      tone="light"
      number={5}
      title="Como reservar"
    >
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <p className="scroll-reveal font-display text-display-xl text-brown">
            {BOOKING_NOTICE_HOURS}h
          </p>
          <p className="mt-2 max-w-reading text-lead">
            Trabalhamos somente com reserva, feita pelo{' '}
            <strong>WhatsApp oficial da Nossa Matilha</strong>, com pelo menos{' '}
            <strong>{BOOKING_NOTICE_HOURS}h de antecedência</strong> do horário
            de entrada, conforme disponibilidade de vaga.
          </p>
          <BaconSays pose="phone" className="mt-8">
            É tudo pelo WhatsApp. Até eu consigo!
          </BaconSays>
        </div>
        <div>
          <h3 className="text-h3 font-bold">Para reservar, envie:</h3>
          <ol className="mt-4 space-y-3">
            {bookingSteps.map((step, index) => (
              <li key={step} className="scroll-reveal flex items-center gap-4">
                <span
                  aria-hidden="true"
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
          <Card accent={false} className="mt-8">
            <p>
              A reserva é confirmada depois que conferimos a documentação e a
              vaga, você aceita as regras e o pagamento é feito.
            </p>
            <p className="mt-3 font-semibold">Orçamento não é reserva.</p>
            <p className="mt-1">
              Pacotes também precisam ser reservados com {BOOKING_NOTICE_HOURS}h
              de antecedência.
            </p>
          </Card>
        </div>
      </div>
    </ChapterSection>
  );
}

const groomingPerks = [
  {
    title: 'Sem correria',
    text: 'o banho é feito aqui, junto com a hospedagem.',
  },
  {
    title: 'Cuidado de quem conhece o seu cão',
    text: 'ele é atendido pela equipe que já está com ele.',
  },
  { title: 'Chega em casa pronto', text: 'é só abraçar.' },
];

/** Chapter 9: bath and grooming with the partner Encantacão. */
export function GroomingChapter(): ReactNode {
  const grooming = getGroomingWhatsApp();
  return (
    <ChapterSection
      id="banho-e-tosa"
      tone="light"
      number={9}
      title="Volta para casa cheiroso"
      intro={
        <>
          Além da hospedagem, tem banho e tosa aqui mesmo na Nossa Matilha, com
          a <strong>Encantacão</strong>, nossa parceira. É só pedir na reserva.
        </>
      }
    >
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <GuidePhoto
            photo={guidePhotos.groomingBath}
            sizes="(min-width: 768px) 25vw, 50vw"
          />
          <GuidePhoto
            photo={guidePhotos.groomingRoom}
            sizes="(min-width: 768px) 25vw, 50vw"
          />
        </div>
        <div>
          <ul className="space-y-4">
            {groomingPerks.map((perk) => (
              <li key={perk.title} className="scroll-reveal flex gap-3">
                <PawIcon className="mt-1 size-6 shrink-0 text-lime" />
                <p className="text-lead">
                  <strong className="font-heading">{perk.title}:</strong>{' '}
                  {perk.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8">Agende direto com a Encantacão pelo WhatsApp:</p>
          <a
            href={whatsAppLink(grooming)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('secondary', 'mt-3')}
          >
            <ChatIcon className="size-5" />
            {grooming.display}
          </a>
          <BaconSays pose="bath" className="mt-10">
            Banho? Só se tiver toalha quentinha depois.
          </BaconSays>
        </div>
      </div>
    </ChapterSection>
  );
}

const summary = [
  'Carteirinha em dia',
  'Diária de 24 horas, das 7h às 18h',
  'Malinha com ração (e remédio, com receita)',
  'Cancelamento pelo WhatsApp',
];

/** Chapter 10: summary and calls to action. */
export function ReadyChapter(): ReactNode {
  return (
    <ChapterSection
      id="tudo-pronto"
      tone="light"
      number={10}
      title="Tudo pronto para a primeira estadia!"
    >
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <ul className="space-y-3">
            {summary.map((item) => (
              <li
                key={item}
                className="scroll-reveal flex items-center gap-3 font-heading text-lead font-semibold"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime text-forest">
                  <CheckIcon className="size-5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <WhatsAppButton className="mt-10">
            Pedir orçamento no WhatsApp
          </WhatsAppButton>
          <BaconSays pose="party" className="mt-10">
            Agora você já sabe tudo. Te espero aqui!
          </BaconSays>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <GuidePhoto
            photo={guidePhotos.goodbyeSilviaAndBacon}
            sizes="(min-width: 768px) 25vw, 50vw"
          />
          <GuidePhoto
            photo={guidePhotos.goodbyeHappyDog}
            sizes="(min-width: 768px) 25vw, 50vw"
          />
        </div>
      </div>

      <div className="mt-16 rounded-card bg-surface-raised p-6 text-center shadow-card sm:p-10">
        <p className="mx-auto max-w-reading">
          As promoções de hospedagem, quando houver, são divulgadas no nosso
          Instagram.
        </p>
        <p className="mt-3 font-display text-display text-leaf">
          Segue a gente lá!
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
  );
}
