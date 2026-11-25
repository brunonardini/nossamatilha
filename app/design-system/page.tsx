import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { BaconSays } from '@/components/boarding-guide/bacon-says';
import { GuidePhoto } from '@/components/boarding-guide/guide-photo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HeroMotion } from '@/components/home/hero-motion';
import { HeroTitle } from '@/components/home/hero-title';
import { HeroPortrait } from '@/components/home/hero-portrait';
import { Highlights } from '@/components/home/highlights';
import { Services } from '@/components/home/services';
import { ScrollCueLabel } from '@/components/home/scroll-cue';
import {
  ArrowDownIcon,
  AwardIcon,
  CalendarIcon,
  CameraIcon,
  ChatIcon,
  CheckIcon,
  ChevronRightIcon,
  CrossIcon,
  ListIcon,
  PawIcon,
  StarIcon,
} from '@/components/ui/icons';
import { guidePhotos } from '@/lib/boarding-guide/photos';

export const metadata: Metadata = {
  title: 'Design system | Nossa Matilha',
  description:
    'Identidade visual da Nossa Matilha: cores, tons, tipografia, formas, componentes e movimento.',
  robots: { index: false, follow: false },
};

/*
 * Web version of DESIGN.md (repo root). Every change to the design system
 * updates DESIGN.md, app/globals.css and this page together.
 */

type Swatch = {
  token: string;
  name: string;
  hex: string;
  swatchClass: string;
  labelClass: string;
  usage: string;
};

type SwatchGroup = { title: string; swatches: Swatch[] };

const swatchGroups: SwatchGroup[] = [
  {
    title: 'Primárias',
    swatches: [
      {
        token: 'forest',
        name: 'Forest',
        hex: '#384E20',
        swatchClass: 'bg-forest',
        labelClass: 'text-cream',
        usage: 'Títulos no tom claro, cards no tom escuro, texto sobre lime',
      },
      {
        token: 'olive',
        name: 'Olive',
        hex: '#4A5B32',
        swatchClass: 'bg-olive',
        labelClass: 'text-cream',
        usage: 'Fundo das seções escuras',
      },
      {
        token: 'lime',
        name: 'Lime',
        hex: '#A8CF45',
        swatchClass: 'bg-lime',
        labelClass: 'text-forest',
        usage: 'Botão primário, barra dos cards, itens marcados',
      },
    ],
  },
  {
    title: 'Secundárias',
    swatches: [
      {
        token: 'brown',
        name: 'Brown',
        hex: '#693922',
        swatchClass: 'bg-brown',
        labelClass: 'text-cream',
        usage: 'Marrom da logo: rótulos no tom claro, botão secundário, alerta',
      },
      {
        token: 'leaf',
        name: 'Leaf',
        hex: '#67973F',
        swatchClass: 'bg-leaf',
        labelClass: 'text-ink',
        usage: 'Verde da logo: só ilustrações e formas, nunca texto',
      },
      {
        token: 'leaf-ink',
        name: 'Leaf ink',
        hex: '#507531',
        swatchClass: 'bg-leaf-ink',
        labelClass: 'text-white',
        usage: 'Verde da logo para texto: palavras, números e links',
      },
    ],
  },
  {
    title: 'Terciária',
    swatches: [
      {
        token: 'sun',
        name: 'Sun',
        hex: '#FFCB03',
        swatchClass: 'bg-sun',
        labelClass: 'text-ink',
        usage:
          'Títulos do alerta, destaques e foco no tom escuro (menos de 1%)',
      },
    ],
  },
  {
    title: 'Neutras',
    swatches: [
      {
        token: 'cream',
        name: 'Cream',
        hex: '#F3EEE2',
        swatchClass: 'bg-cream',
        labelClass: 'text-ink',
        usage: 'Fundo das seções claras, texto no tom escuro',
      },
      {
        token: 'cream-light',
        name: 'Cream light',
        hex: '#FAF7F0',
        swatchClass: 'bg-cream-light',
        labelClass: 'text-ink',
        usage: 'Superfície sutil sobre o creme (reservada)',
      },
      {
        token: 'white',
        name: 'White',
        hex: '#FFFFFF',
        swatchClass: 'bg-white',
        labelClass: 'text-ink',
        usage: 'Cards no tom claro, títulos no tom escuro',
      },
      {
        token: 'ink',
        name: 'Ink',
        hex: '#231F20',
        swatchClass: 'bg-ink',
        labelClass: 'text-cream',
        usage: 'Texto corrido no tom claro',
      },
    ],
  },
];

type ToneRow = { utility: string; light: string; dark: string; alert: string };

const toneRows: ToneRow[] = [
  { utility: 'bg-surface', light: 'cream', dark: 'olive', alert: 'brown' },
  {
    utility: 'bg-surface-raised',
    light: 'white',
    dark: 'forest',
    alert: 'brown + 18% ink',
  },
  { utility: 'text-fg', light: 'ink', dark: 'cream', alert: 'cream' },
  {
    utility: 'text-fg-muted',
    light: 'ink 72%',
    dark: 'cream 80%',
    alert: 'cream 82%',
  },
  {
    utility: 'text-heading',
    light: 'forest',
    dark: 'white',
    alert: 'sun',
  },
  {
    utility: 'text-accent',
    light: 'brown',
    dark: 'lime + 20% cream',
    alert: 'lime',
  },
  {
    utility: 'text-highlight',
    light: 'leaf-ink',
    dark: 'sun',
    alert: 'sun',
  },
  { utility: 'anel de foco', light: 'forest', dark: 'sun', alert: 'sun' },
];

type ContrastLevel = 'any' | 'large' | 'none';

type Contrast = { pair: string; ratio: string; level: ContrastLevel };

const contrastLabels: Record<ContrastLevel, string> = {
  any: 'Qualquer texto',
  large: 'Só texto grande (24px+ ou 19px+ negrito)',
  none: 'Nunca para texto',
};

const contrasts: Contrast[] = [
  { pair: 'Ink sobre cream / white', ratio: '14,1 / 16,3', level: 'any' },
  { pair: 'Forest sobre cream / white', ratio: '8,0 / 9,2', level: 'any' },
  { pair: 'Brown sobre cream / white', ratio: '8,2 / 9,5', level: 'any' },
  { pair: 'Leaf ink sobre cream / white', ratio: '4,6 / 5,3', level: 'any' },
  { pair: 'Cream sobre olive / forest', ratio: '6,4 / 8,0', level: 'any' },
  { pair: 'White sobre olive', ratio: '7,4', level: 'any' },
  {
    pair: 'Acento escuro sobre olive / forest',
    ratio: '4,5 / 5,6',
    level: 'any',
  },
  { pair: 'Sun sobre olive / forest', ratio: '4,9 / 6,1', level: 'any' },
  { pair: 'Forest sobre lime', ratio: '5,1', level: 'any' },
  {
    pair: 'Cream / sun / lime sobre brown',
    ratio: '8,2 / 6,3 / 5,3',
    level: 'any',
  },
  { pair: 'Lime puro sobre olive', ratio: '4,1', level: 'large' },
  { pair: 'Leaf sobre cream', ratio: '2,99', level: 'none' },
  { pair: 'Sun sobre cream', ratio: '1,3', level: 'none' },
];

type TypeSample = { token: string; className: string; text: string };

const typeScale: TypeSample[] = [
  {
    token: 'font-display text-display-xl · títulos grandes em bloco',
    className: 'font-display text-display-xl text-leaf-ink',
    text: 'Bem-vindo à Matilha!',
  },
  {
    token: 'font-display text-display · aberturas e números grandes',
    className: 'font-display text-display text-accent',
    text: 'R$ 120,00 por diária',
  },
  {
    token: 'text-h1 font-extrabold · título de seção',
    className: 'text-h1 font-extrabold',
    text: 'Vacinas obrigatórias',
  },
  {
    token: 'text-h2 font-bold · subtítulo',
    className: 'text-h2 font-bold',
    text: 'Como funciona a diária?',
  },
  {
    token: 'text-h3 font-bold · título de card',
    className: 'text-h3 font-bold',
    text: 'Cancelamento com 48 horas ou mais',
  },
  {
    token: 'text-intro · único parágrafo de abertura da página',
    className: 'text-intro',
    text: 'Um lugar para o seu cão brincar, descansar e ser cuidado como da família.',
  },
  {
    token: 'text-lead · introdução de capítulo, falas do Bacon',
    className: 'text-lead',
    text: 'Um espaço completo de lazer, cuidado e descanso para o seu cão.',
  },
  {
    token: 'text-body · texto corrido (padrão, mínimo 16px)',
    className: 'text-body',
    text: 'Os medicamentos deverão ser acompanhados de prescrição veterinária, que poderá ser entregue junto aos itens do cão ou enviada por foto pelo WhatsApp oficial.',
  },
  {
    token: 'text-caption text-fg-muted · legendas e metadados',
    className: 'text-caption text-fg-muted',
    text: 'Atendimento para entrada e retirada das 7h às 18h.',
  },
  {
    token:
      'eyebrow · font-heading text-caption font-semibold tracking-widest uppercase text-accent',
    className:
      'font-heading text-caption font-semibold tracking-widest text-accent uppercase',
    text: '04 · Parada 1 de 4',
  },
];

type Radius = { token: string; size: string; className: string; use: string };

const radii: Radius[] = [
  {
    token: 'rounded-sm',
    size: '8px',
    className: 'rounded-sm',
    use: 'Foco, marcas',
  },
  {
    token: 'rounded-md',
    size: '14px',
    className: 'rounded-md',
    use: 'Linhas de lista',
  },
  {
    token: 'rounded-card',
    size: '24px',
    className: 'rounded-card',
    use: 'Cards, fotos, balões',
  },
  {
    token: 'rounded-blob',
    size: '40px',
    className: 'rounded-blob',
    use: 'Formas ilustrativas',
  },
  {
    token: 'rounded-full',
    size: 'pílula',
    className: 'rounded-full',
    use: 'Botões, barras',
  },
];

type Icon = { name: string; render: ReactNode };

const icons: Icon[] = [
  { name: 'ChatIcon', render: <ChatIcon /> },
  { name: 'CheckIcon', render: <CheckIcon /> },
  { name: 'CrossIcon', render: <CrossIcon /> },
  { name: 'ArrowDownIcon', render: <ArrowDownIcon /> },
  { name: 'ListIcon', render: <ListIcon /> },
  { name: 'ChevronRightIcon', render: <ChevronRightIcon /> },
  { name: 'CalendarIcon', render: <CalendarIcon /> },
  { name: 'AwardIcon', render: <AwardIcon /> },
  { name: 'StarIcon', render: <StarIcon className="size-6 text-sun" /> },
  { name: 'CameraIcon', render: <CameraIcon /> },
  { name: 'PawIcon', render: <PawIcon /> },
];

type Easing = { token: string; value: string; use: string };

const easings: Easing[] = [
  {
    token: 'ease-out-soft',
    value: 'cubic-bezier(0.22, 1, 0.36, 1)',
    use: 'Entradas (padrão)',
  },
  {
    token: 'ease-playful',
    value: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    use: 'Botões e detalhes brincalhões (leve passada do ponto)',
  },
  {
    token: 'ease-in-out-soft',
    value: 'cubic-bezier(0.65, 0, 0.35, 1)',
    use: 'Loops',
  },
  { token: '--duration-fast', value: '150ms', use: 'Cores' },
  { token: '--duration-base', value: '300ms', use: 'Hover e estados' },
  { token: '--duration-slow', value: '600ms', use: 'Entradas' },
];

const dos: string[] = [
  'Defina tone-light ou tone-dark em toda seção e use as utilidades semânticas (bg-surface, text-fg, text-heading, text-accent, text-highlight).',
  'Use só os tokens desta página; faltou um, adicione em app/globals.css, no DESIGN.md e aqui na mesma mudança.',
  'Mantenha alvos de toque com pelo menos 48 × 48px e o anel de foco visível.',
  'Anime só transform e opacity, e garanta a página completa sem JavaScript e com “reduzir movimento”.',
  'Marque SVGs e formas decorativas com aria-hidden.',
];

const donts: string[] = [
  'Hex, cores arbitrárias, tamanhos de fonte arbitrários, a escala padrão do Tailwind (text-sm, text-base…) ou sombras avulsas.',
  'Texto em leaf, ou sun sobre fundo claro.',
  'Seção escura só por ritmo visual, ou mais de dois alertas por página.',
  'Grandstander abaixo de 24px ou em mais de uma linha curta.',
  'Sombras cinza ou pretas, cantos retos em cards e botões, logos de marcas como ícones.',
];

type SectionLink = { id: string; label: string };

const sectionLinks: SectionLink[] = [
  { id: 'visao-geral', label: 'Visão geral' },
  { id: 'cores', label: 'Cores' },
  { id: 'tipografia', label: 'Tipografia' },
  { id: 'layout', label: 'Layout' },
  { id: 'profundidade', label: 'Profundidade' },
  { id: 'formas', label: 'Formas' },
  { id: 'componentes', label: 'Componentes' },
  { id: 'movimento', label: 'Movimento' },
  { id: 'regras', label: 'Faça e não faça' },
];

/** Numbered section of this page, mirroring the boarding guide chapters. */
function Section({
  id,
  number,
  title,
  intro,
  tone = 'light',
  children,
}: {
  id: string;
  number: number;
  title: string;
  intro?: ReactNode;
  tone?: 'light' | 'dark';
  children: ReactNode;
}): ReactNode {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={`${tone === 'dark' ? 'tone-dark' : 'tone-light'} px-4 py-16 sm:px-8 sm:py-24`}
    >
      <div className="mx-auto max-w-page">
        <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
          {String(number).padStart(2, '0')}
        </p>
        <h2 id={`${id}-titulo`} className="mt-2 text-h1 font-extrabold">
          {title}
        </h2>
        {intro ? (
          <div className="mt-4 max-w-reading text-lead">{intro}</div>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/** Small subsection title inside a {@link Section}. */
function Subhead({ children }: { children: ReactNode }): ReactNode {
  return (
    <h3 className="mt-14 mb-4 text-h3 font-bold first:mt-0">{children}</h3>
  );
}

/** Web version of the Nossa Matilha design system (DESIGN.md). */
export default function DesignSystemPage(): ReactNode {
  return (
    <main>
      <header className="tone-dark px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-page">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Design system da marca e do site
          </p>
          <h1 className="mt-2 font-display text-display-xl">
            <span className="text-lime">Nossa</span>{' '}
            <span className="text-cream">Matilha</span>
          </h1>
          <p className="mt-4 max-w-reading text-intro text-fg-muted">
            Cores, tons, tipografia, formas, componentes e movimento da
            identidade visual. A versão para agentes de IA é o arquivo
            DESIGN.md, na raiz do repositório; os dois mudam juntos.
          </p>
          <nav aria-label="Seções do design system" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-flex min-h-12 items-center rounded-full border-2 border-current px-4 font-heading font-semibold text-fg transition-colors duration-(--duration-fast) hover:bg-fg/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <Section
        id="visao-geral"
        number={1}
        title="A carta da Matilha"
        intro={
          <p>
            O site é uma carta calorosa da equipe, narrada pelo Bacon, que fica
            firme e clara quando chega às regras. Tudo vem do folheto da
            hospedagem: páginas creme alternadas com páginas verde-oliva, letras
            gordinhas da logo, cards arredondados com a barra lime e fotos
            reais.
          </p>
        }
      >
        <Subhead>O que cada tom significa</Subhead>
        <p className="max-w-reading">
          A cor diz ao cliente que tipo de conteúdo ele está vendo. Usada sempre
          da mesma forma, ele aprende o padrão:{' '}
          <strong>quando escurece, é hora de prestar atenção</strong>.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          <li className="tone-light rounded-card border-2 border-forest/15 p-6">
            <p className="font-heading text-h3 font-bold text-heading">
              Creme · História
            </p>
            <p className="mt-2 text-fg-muted">
              Narrativa e emoção, no ritmo do cliente: o espaço, a equipe, o
              dia.
            </p>
          </li>
          <li className="tone-dark rounded-card p-6">
            <p className="font-heading text-h3 font-bold text-heading">
              Verde escuro · Atenção
            </p>
            <p className="mt-2 text-fg-muted">
              Regras e paradas interativas: vacinas, malinha, simuladores.
            </p>
          </li>
          <li className="tone-alert rounded-card p-6">
            <p className="font-heading text-h3 font-bold text-heading">
              Marrom · Crítico
            </p>
            <p className="mt-2 text-fg-muted">
              Um aviso cujo descumprimento causa problema real. No máximo dois
              por página, sempre como bloco.
            </p>
          </li>
        </ul>
      </Section>

      <Section
        id="cores"
        number={2}
        title="Cores"
        intro={
          <p>
            Só existem as cores da marca, tiradas do folheto. A paleta padrão do
            Tailwind foi removida.
          </p>
        }
      >
        {swatchGroups.map((group) => (
          <div key={group.title}>
            <Subhead>{group.title}</Subhead>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.swatches.map((swatch) => (
                <li
                  key={swatch.token}
                  className="overflow-hidden rounded-card bg-surface-raised shadow-card"
                >
                  <div
                    className={`flex h-24 items-end border-b border-forest/10 p-4 ${swatch.swatchClass} ${swatch.labelClass}`}
                  >
                    <span className="font-heading font-bold">
                      {swatch.name}
                    </span>
                  </div>
                  <div className="p-4">
                    <code className="font-semibold">{swatch.token}</code>
                    <p className="text-caption text-fg-muted">{swatch.hex}</p>
                    <p className="mt-2 text-caption">{swatch.usage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Subhead>Proporção 60-30-10</Subhead>
        <div
          aria-hidden="true"
          className="flex h-6 overflow-hidden rounded-full border border-forest/15"
        >
          <span className="w-3/5 bg-white" />
          <span className="w-3/10 bg-olive" />
          <span className="w-1/20 bg-lime" />
          <span className="w-1/40 bg-brown" />
          <span className="w-1/80 bg-leaf" />
          <span className="w-1/80 bg-sun" />
        </div>
        <p className="mt-4 max-w-reading">
          Cerca de 60% creme e branco, 30% olive e forest, 10% cores fortes
          (lime, brown, leaf e, com muita parcimônia, sun). Mais ou menos uma
          seção em cada três é escura.
        </p>

        <Subhead>Tons de seção</Subhead>
        <div className="overflow-x-auto rounded-card bg-surface-raised shadow-card">
          <table className="w-full min-w-xl text-left">
            <caption className="sr-only">
              Cores semânticas em cada tom de seção
            </caption>
            <thead className="font-heading">
              <tr className="border-b border-forest/10">
                <th scope="col" className="px-4 py-3">
                  Utilidade
                </th>
                <th scope="col" className="px-4 py-3">
                  tone-light
                </th>
                <th scope="col" className="px-4 py-3">
                  tone-dark
                </th>
                <th scope="col" className="px-4 py-3">
                  tone-alert
                </th>
              </tr>
            </thead>
            <tbody>
              {toneRows.map((row) => (
                <tr
                  key={row.utility}
                  className="border-b border-forest/10 last:border-0"
                >
                  <th scope="row" className="px-4 py-3 font-normal">
                    <code>{row.utility}</code>
                  </th>
                  <td className="px-4 py-3">{row.light}</td>
                  <td className="px-4 py-3">{row.dark}</td>
                  <td className="px-4 py-3">{row.alert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Subhead>Contraste (WCAG 2.2, medido)</Subhead>
        <ul className="grid gap-2 sm:grid-cols-2">
          {contrasts.map((item) => (
            <li
              key={item.pair}
              className="flex items-start gap-3 rounded-md bg-surface-raised px-4 py-3"
            >
              {item.level === 'none' ? (
                <CrossIcon className="mt-0.5 size-5 shrink-0 text-accent" />
              ) : (
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-highlight" />
              )}
              <span>
                <span className="font-semibold">{item.pair}</span>
                <span className="block text-caption text-fg-muted">
                  {item.ratio}:1 · {contrastLabels[item.level]}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="tipografia"
        number={3}
        title="Tipografia"
        intro={
          <p>
            Três fontes com papéis fixos, mais a Goldplay Alt só no título do
            hero. Tamanhos fluidos, do celular (390px) ao desktop (1280px), sem
            ajustes por breakpoint.
          </p>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Card accent={false}>
            <p className="font-display text-h2">Grandstander</p>
            <p className="mt-1 text-caption text-fg-muted">
              Display · Black 900 · só textos curtos de 24px+
            </p>
          </Card>
          <Card accent={false}>
            <p className="font-heading text-h2 font-extrabold">Outfit</p>
            <p className="mt-1 text-caption text-fg-muted">
              Títulos · 600 a 800 · títulos, botões e rótulos
            </p>
          </Card>
          <Card accent={false}>
            <p className="font-sans text-h2">Figtree</p>
            <p className="mt-1 text-caption text-fg-muted">
              Texto · 400 a 700 · texto corrido, mínimo 16px
            </p>
          </Card>
        </div>
        <div className="mt-12 max-w-md">
          <code className="text-caption text-fg-muted">
            font-lettering · Goldplay Alt Black Italic, maiúsculas · só o título
            do hero (HeroTitle): cada linha ocupa a largura toda
            (lettering-fit-*)
          </code>
          <HeroTitle as="p" className="mt-2" />
        </div>
        <ul className="mt-12 space-y-10">
          {typeScale.map((sample) => (
            <li key={sample.token}>
              <code className="text-caption text-fg-muted">{sample.token}</code>
              <p className={`mt-1 max-w-reading ${sample.className}`}>
                {sample.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="layout"
        number={4}
        title="Layout"
        intro={
          <p>
            Uma coluna no celular, duas a partir do tablet quando o conteúdo
            forma par (texto e foto, regra e simulador).
          </p>
        }
      >
        <div className="space-y-6">
          <div>
            <div
              aria-hidden="true"
              className="h-4 max-w-reading rounded-full bg-lime"
            />
            <p className="mt-2">
              <code>max-w-reading</code> · 38rem · colunas de texto (cerca de 65
              caracteres)
            </p>
          </div>
          <div>
            <div
              aria-hidden="true"
              className="h-4 max-w-page rounded-full bg-olive"
            />
            <p className="mt-2">
              <code>max-w-page</code> · 72rem · conteúdo da página, centralizado
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Card accent={false} className="h-full">
            <p className="font-heading font-bold">Margens laterais</p>
            <p className="mt-1 text-fg-muted">
              <code>px-4</code> (16px) no celular, <code>sm:px-8</code> (32px)
              acima.
            </p>
          </Card>
          <Card accent={false} className="h-full">
            <p className="font-heading font-bold">Respiro das seções</p>
            <p className="mt-1 text-fg-muted">
              <code>py-16</code> (64px) no celular, <code>sm:py-24</code> (96px)
              acima.
            </p>
          </Card>
          <Card accent={false} className="h-full">
            <p className="font-heading font-bold">Cabeçalhos</p>
            <p className="mt-1 text-fg-muted">
              Guia: fixo, 56px de altura; <code>min-h-below-header</code> ocupa
              a primeira tela abaixo dele. Home: não fixo (rola com a página),
              64px (80px no desktop), com o mesmo fundo do hero, sem divisória e
              o botão “Agendar” no tamanho <code>sm</code>;{' '}
              <code>min-h-below-home-header</code> faz o hero do celular ocupar
              a primeira tela.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        id="profundidade"
        number={5}
        title="Profundidade"
        intro={
          <p>
            Sombras suaves e quentes, tingidas de verde. Só existem duas; nunca
            cinza ou preto.
          </p>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-card bg-surface-raised p-6 shadow-card">
            <p className="font-heading font-bold">shadow-card</p>
            <p className="mt-1 text-fg-muted">
              Em repouso: cards, fotos, balões e botões cheios.
            </p>
          </div>
          <div className="rounded-card bg-surface-raised p-6 shadow-lift">
            <p className="font-heading font-bold">shadow-lift</p>
            <p className="mt-1 text-fg-muted">
              Hover dos botões cheios e o bloco de alerta.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="formas"
        number={6}
        title="Formas e ícones"
        intro={
          <p>
            Tudo arredondado, como os cards do folheto e o círculo da guia na
            logo.
          </p>
        }
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {radii.map((radius) => (
            <li key={radius.token}>
              <div
                aria-hidden="true"
                className={`h-20 bg-lime ${radius.className}`}
              />
              <p className="mt-2 font-semibold">
                <code>{radius.token}</code>
              </p>
              <p className="text-caption text-fg-muted">
                {radius.size} · {radius.use}
              </p>
            </li>
          ))}
        </ul>
        <Subhead>Ícones</Subhead>
        <p className="max-w-reading">
          Traço de 2px, pontas arredondadas, 24px. Sem logos de marcas: o
          Instagram é uma câmera.
        </p>
        <ul className="mt-6 flex flex-wrap gap-4">
          {icons.map((icon) => (
            <li
              key={icon.name}
              className="flex w-28 flex-col items-center gap-2 rounded-md bg-surface-raised p-4 text-heading"
            >
              {icon.render}
              <code className="text-caption text-fg-muted">{icon.name}</code>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="componentes"
        number={7}
        title="Componentes"
        intro={
          <p>
            Os componentes leem o tom da seção e se adaptam sozinhos. Use Tab
            para ver o anel de foco: forest no tom claro, sun no escuro.
          </p>
        }
      >
        <Subhead>Botões</Subhead>
        <div className="flex flex-wrap gap-4">
          <Button>
            <ChatIcon />
            Falar no WhatsApp
          </Button>
          <Button variant="secondary">Ver as regras</Button>
          <Button variant="outline">Voltar</Button>
          <Button disabled>Desabilitado</Button>
        </div>
        <p className="mt-6 max-w-reading">
          Com ícone no fim (<code>icon</code>): na pílula primária o ícone fica
          numa bolinha forest; no <code>secondary</code> ele aparece solto, em
          cream (como o texto), e no <code>dark</code> solto, em lime. O{' '}
          <code>link</code> é a ação secundária ao lado de uma pílula primária:
          texto com sublinhado lime. Todo botão e link mostra o cursor de
          mãozinha.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button icon={<ChevronRightIcon className="size-5" />}>
            Explorar serviços
          </Button>
          <Button variant="link">Solicitar avaliação</Button>
          <Button variant="dark" icon={<CalendarIcon className="size-5" />}>
            Escuro
          </Button>
        </div>
        <p className="mt-6 max-w-reading">
          Tamanhos (<code>size</code>): <code>md</code> (padrão, 48px) para
          ações dentro da página e <code>sm</code> (40px) para lugares
          compactos, como o cabeçalho.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button
            variant="secondary"
            icon={<CalendarIcon className="size-5" />}
          >
            Médio
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<CalendarIcon className="size-4" />}
          >
            Pequeno
          </Button>
          <Button icon={<ChevronRightIcon className="size-5" />}>Médio</Button>
          <Button size="sm" icon={<ChevronRightIcon className="size-4" />}>
            Pequeno
          </Button>
        </div>

        <Subhead>Cards</Subhead>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h4 className="text-h3 font-bold">Card com destaque</h4>
            <p className="mt-2">
              Cantos de 24px, sombra suave e a barra lime à esquerda.
            </p>
          </Card>
          <Card accent={false}>
            <h4 className="text-h3 font-bold">Card simples</h4>
            <p className="mt-2">Sem a barra, para informação secundária.</p>
          </Card>
        </div>

        <Subhead>Bacon diz</Subhead>
        <BaconSays pose="hello" reveal={false}>
          Oi! Eu sou o Bacon e vou te mostrar a Matilha.
        </BaconSays>

        <Subhead>Retrato do hero (folha)</Subhead>
        <p className="max-w-reading">
          Uma imagem composta: a moldura em folha (círculo lime → leaf, borda
          branca, um canto reto no alto à direita) com a Silvia e o Bacon saindo
          pela borda de cima. Em volta, três fotos redondas e o selo com as
          cinco estrelas do Google (sem a nota, que varia) e a certificação
          FBAA.
        </p>
        <HeroMotion className="mt-6 max-w-sm pb-10">
          <HeroPortrait />
        </HeroMotion>
        <p className="mt-6 max-w-reading">
          No celular o hero mostra só o título e o retrato; a descrição e os
          botões aparecem a partir do desktop.
        </p>

        <Subhead>Indicador de rolagem (celular)</Subhead>
        <p className="max-w-reading">
          Texto “Explore mais” fixo no pé da tela, sem caixa, com uma seta que
          balança de leve. Some aos poucos nos primeiros 160px de rolagem e não
          volta mais, nem rolando para cima. Com movimento reduzido, a seta fica
          parada e o indicador só desaparece. Só no celular.
        </p>
        <div className="mt-6 flex">
          <ScrollCueLabel />
        </div>

        <Subhead>Box de destaques (home)</Subhead>
        <p className="max-w-reading">
          Logo abaixo do hero, só informativo (sem links). Faixa forest com o
          destaque (onde e quando), o cartão da área (+1.200 m²) subindo além da
          faixa com a foto, e os números em lime com uma linha fina entre eles.
          No celular, tudo empilha dentro da faixa.
        </p>
        <div className="-mx-4 mt-6 sm:-mx-8">
          <Highlights />
        </div>

        <Subhead>Serviços (home)</Subhead>
        <p className="max-w-reading">
          Faixa cream-light com sobretítulo pequeno acima do título e seis
          cartões brancos, sem filtros nem botões: foto 3:2 com o número num
          selo em forma de folha, a linha de dados, o nome, o resumo e os pontos
          com check.
        </p>
        <div className="-mx-4 mt-6 sm:-mx-8">
          <Services />
        </div>

        <Subhead>Foto do guia</Subhead>
        <div className="max-w-xs">
          <GuidePhoto
            photo={guidePhotos.heroDogsOfAllSizes}
            sizes="320px"
            caption="Foto 4:5, cantos de 24px e legenda opcional."
            reveal={false}
          />
        </div>
      </Section>

      <Section
        id="componentes-tom-escuro"
        number={8}
        title="No tom escuro"
        tone="dark"
        intro={
          <p>
            Os mesmos componentes numa parada interativa. Marque os itens para
            ver o estado selecionado.
          </p>
        }
      >
        <fieldset className="grid max-w-reading gap-3">
          <legend className="mb-3 font-heading text-h3 font-bold text-heading">
            A carteirinha está em dia?
          </legend>
          {[
            { id: 'v10', label: 'V10 (polivalente)', note: 'Obrigatória' },
            { id: 'raiva', label: 'Raiva', note: 'Obrigatória' },
            {
              id: 'antiparasitario',
              label: 'Antiparasitário e vermífugo',
              note: 'Em dia',
            },
            { id: 'gripe', label: 'Gripe', note: 'Aconselhável' },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={`ds-vacina-${item.id}`}
              className="flex min-h-12 cursor-pointer items-center gap-4 rounded-md bg-surface-raised px-4 py-3 transition-colors duration-(--duration-fast) hover:bg-forest/70 has-checked:ring-2 has-checked:ring-lime"
            >
              <input
                id={`ds-vacina-${item.id}`}
                type="checkbox"
                className="size-6 shrink-0 accent-lime"
              />
              <span className="font-heading font-semibold">{item.label}</span>
              <span className="ml-auto text-caption text-accent">
                {item.note}
              </span>
            </label>
          ))}
        </fieldset>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold">Monitoramento 24h</h3>
            <p className="mt-2">
              Profissionais qualificados acompanham os cães em tempo integral.
            </p>
          </Card>
          <div className="tone-alert rounded-card p-6 shadow-lift">
            <p className="font-heading text-caption font-semibold tracking-widest text-fg-muted uppercase">
              tone-alert · crítico
            </p>
            <h3 className="mt-2 text-h2 font-extrabold">
              Importante: tudo por escrito
            </h3>
            <p className="mt-2">
              Nunca passe orientações de alimentação ou medicação apenas
              verbalmente. Como há troca de turnos, precisamos de tudo
              registrado.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Contorno</Button>
        </div>
      </Section>

      <Section
        id="movimento"
        number={9}
        title="Movimento"
        intro={
          <p>
            Brincalhão e opcional. Com “reduzir movimento” ativo no aparelho,
            todas as animações são desligadas e o conteúdo continua completo.
          </p>
        }
      >
        <div className="flex flex-wrap items-end gap-10">
          <div className="text-center">
            <PawIcon className="mx-auto size-16 origin-bottom animate-wag text-leaf" />
            <p className="mt-2 text-caption text-fg-muted">animate-wag</p>
          </div>
          <div className="text-center">
            <ArrowDownIcon className="mx-auto size-10 animate-nudge-down text-heading" />
            <p className="mt-2 text-caption text-fg-muted">
              animate-nudge-down
            </p>
          </div>
          <div className="scroll-reveal">
            <Card>
              <p className="font-heading font-bold">scroll-reveal</p>
              <p className="text-caption text-fg-muted">
                Sobe e aparece ao entrar na tela
              </p>
            </Card>
          </div>
        </div>
        <ul className="mt-10 grid gap-2 sm:grid-cols-2">
          {easings.map((easing) => (
            <li
              key={easing.token}
              className="rounded-md bg-surface-raised px-4 py-3"
            >
              <code className="font-semibold">{easing.token}</code>
              <span className="block text-caption text-fg-muted">
                {easing.value} · {easing.use}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-reading">
          Sequências e efeitos ligados à rolagem usam GSAP, só em componentes de
          cliente e sempre dentro de <code>gsap.matchMedia()</code>.
        </p>
      </Section>

      <Section id="regras" number={10} title="Faça e não faça" tone="dark">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold">Faça</h3>
            <ul className="mt-4 space-y-3">
              {dos.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card accent={false}>
            <h3 className="text-h3 font-bold">Não faça</h3>
            <ul className="mt-4 space-y-3">
              {donts.map((item) => (
                <li key={item} className="flex gap-3">
                  <CrossIcon className="mt-0.5 size-5 shrink-0 text-highlight" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </main>
  );
}
