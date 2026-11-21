import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Design system | Nossa Matilha',
  robots: { index: false, follow: false },
};

type Swatch = {
  name: string;
  token: string;
  hex: string;
  swatchClass: string;
  textClass: string;
  usage: string;
};

const swatches: Swatch[] = [
  {
    name: 'Forest',
    token: 'forest',
    hex: '#384E20',
    swatchClass: 'bg-forest',
    textClass: 'text-cream',
    usage: 'Títulos no fundo claro, superfícies escuras',
  },
  {
    name: 'Olive',
    token: 'olive',
    hex: '#4A5B32',
    swatchClass: 'bg-olive',
    textClass: 'text-cream',
    usage: 'Fundo das seções escuras',
  },
  {
    name: 'Leaf',
    token: 'leaf',
    hex: '#67973F',
    swatchClass: 'bg-leaf',
    textClass: 'text-white',
    usage: 'Verde da logo: ilustrações e textos de display',
  },
  {
    name: 'Leaf ink',
    token: 'leaf-ink',
    hex: '#507531',
    swatchClass: 'bg-leaf-ink',
    textClass: 'text-white',
    usage: 'Verde da logo para textos pequenos e links',
  },
  {
    name: 'Lime',
    token: 'lime',
    hex: '#A8CF45',
    swatchClass: 'bg-lime',
    textClass: 'text-forest',
    usage: 'Destaques, botões, barras dos cards',
  },
  {
    name: 'Brown',
    token: 'brown',
    hex: '#693922',
    swatchClass: 'bg-brown',
    textClass: 'text-cream',
    usage: 'Marrom da logo: subtítulos e avisos',
  },
  {
    name: 'Sun',
    token: 'sun',
    hex: '#FFCB03',
    swatchClass: 'bg-sun',
    textClass: 'text-ink',
    usage: 'Alertas importantes e foco do teclado',
  },
  {
    name: 'Cream',
    token: 'cream',
    hex: '#F3EEE2',
    swatchClass: 'bg-cream',
    textClass: 'text-ink',
    usage: 'Fundo das seções claras',
  },
  {
    name: 'Ink',
    token: 'ink',
    hex: '#231F20',
    swatchClass: 'bg-ink',
    textClass: 'text-cream',
    usage: 'Texto corrido no fundo claro',
  },
];

type Contrast = { pair: string; ratio: string; rule: string };

const contrasts: Contrast[] = [
  { pair: 'Ink sobre cream', ratio: '14,1:1', rule: 'Qualquer texto' },
  { pair: 'Forest sobre cream', ratio: '8,0:1', rule: 'Qualquer texto' },
  { pair: 'Brown sobre cream', ratio: '8,2:1', rule: 'Qualquer texto' },
  { pair: 'Cream sobre olive', ratio: '6,4:1', rule: 'Qualquer texto' },
  { pair: 'Forest sobre lime', ratio: '5,1:1', rule: 'Qualquer texto' },
  { pair: 'Leaf ink sobre cream', ratio: '4,6:1', rule: 'Qualquer texto' },
  { pair: 'Sun sobre olive', ratio: '4,9:1', rule: 'Qualquer texto' },
  {
    pair: 'Lime sobre olive',
    ratio: '4,1:1',
    rule: 'Só texto grande (24px+ ou 19px+ negrito)',
  },
  {
    pair: 'Leaf sobre cream',
    ratio: '3,0:1',
    rule: 'Só display grande; nunca texto corrido',
  },
];

type TypeSample = { token: string; className: string; text: string };

const typeScale: TypeSample[] = [
  {
    token: 'font-display text-display-xl',
    className: 'font-display text-display-xl text-leaf',
    text: 'Bem-vindo à Matilha!',
  },
  {
    token: 'font-display text-display',
    className: 'font-display text-display text-brown',
    text: 'R$ 120,00 por diária',
  },
  {
    token: 'h1 · text-h1 font-extrabold',
    className: 'text-h1 font-extrabold',
    text: 'Vacinas obrigatórias',
  },
  {
    token: 'h2 · text-h2 font-bold',
    className: 'text-h2 font-bold',
    text: 'Como funciona a diária?',
  },
  {
    token: 'h3 · text-h3 font-bold',
    className: 'text-h3 font-bold',
    text: 'Cancelamento com 48 horas ou mais',
  },
  {
    token: 'text-lead',
    className: 'text-lead',
    text: 'Um espaço completo de lazer, cuidado e descanso para o seu cão.',
  },
  {
    token: 'text-body',
    className: 'text-body',
    text: 'Os medicamentos deverão ser acompanhados de prescrição veterinária, que poderá ser entregue junto aos itens do cão ou enviada por foto pelo WhatsApp oficial.',
  },
  {
    token: 'text-caption text-fg-muted',
    className: 'text-caption text-fg-muted',
    text: 'Atendimento para entrada e retirada das 7h às 18h.',
  },
];

/** Section wrapper with a title, used only on this preview page. */
function Section({
  title,
  tone = 'light',
  children,
}: {
  title: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
}): ReactNode {
  return (
    <section
      className={`${tone === 'dark' ? 'tone-dark' : 'tone-light'} px-4 py-14 sm:px-8`}
    >
      <div className="mx-auto max-w-page">
        <h2 className="mb-8 text-h1 font-extrabold">{title}</h2>
        {children}
      </div>
    </section>
  );
}

/** Internal page that previews every design token for review. */
export default function DesignSystemPage(): ReactNode {
  return (
    <main>
      <header className="tone-dark px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-page">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Uso interno
          </p>
          <h1 className="mt-2 font-display text-display-xl">
            <span className="text-lime">Nossa</span>{' '}
            <span className="text-cream">Matilha</span>
          </h1>
          <p className="mt-4 max-w-reading text-lead text-fg-muted">
            Design system: cores, tipografia, componentes e movimento da
            identidade visual.
          </p>
        </div>
      </header>

      <Section title="Cores">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((swatch) => (
            <li
              key={swatch.token}
              className="overflow-hidden rounded-card bg-surface-raised shadow-card"
            >
              <div
                className={`flex h-24 items-end p-3 ${swatch.swatchClass} ${swatch.textClass}`}
              >
                <span className="font-heading font-bold">{swatch.name}</span>
              </div>
              <div className="p-3">
                <code className="text-caption font-semibold">
                  {swatch.token}
                </code>
                <p className="text-caption text-fg-muted">{swatch.hex}</p>
                <p className="mt-1 text-caption">{swatch.usage}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 mb-4 text-h3 font-bold">Contraste (WCAG)</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {contrasts.map((item) => (
            <li
              key={item.pair}
              className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-md bg-surface-raised px-4 py-3"
            >
              <span className="font-semibold">{item.pair}</span>
              <span className="text-caption text-fg-muted">
                {item.ratio} · {item.rule}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografia">
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <Card accent={false}>
            <p className="font-display text-h2">Grandstander</p>
            <p className="text-caption text-fg-muted">
              Display · Black 900 · só textos grandes e curtos (24px+)
            </p>
          </Card>
          <Card accent={false}>
            <p className="font-heading text-h2 font-extrabold">Outfit</p>
            <p className="text-caption text-fg-muted">
              Títulos · 600 a 800 · títulos, botões e rótulos
            </p>
          </Card>
          <Card accent={false}>
            <p className="font-sans text-h2">Figtree</p>
            <p className="text-caption text-fg-muted">
              Texto · 400 a 700 · texto corrido, mínimo 16px
            </p>
          </Card>
        </div>
        <ul className="space-y-8">
          {typeScale.map((sample) => (
            <li key={sample.token}>
              <code className="text-caption text-fg-muted">{sample.token}</code>
              <p className={`max-w-reading ${sample.className}`}>
                {sample.text}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Significado dos tons">
        <p className="max-w-reading text-lead">
          Cada tom diz ao cliente que tipo de conteúdo ele está vendo. Usados
          sempre da mesma forma, ele aprende o padrão:{' '}
          <strong>quando escurece, é hora de prestar atenção</strong>.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="tone-light rounded-card border-2 border-forest/15 p-5">
            <p className="font-heading font-bold text-heading">
              Creme · História
            </p>
            <p className="mt-1 text-caption text-fg-muted">
              Narrativa e emoção, lidas no ritmo do cliente.
            </p>
          </li>
          <li className="tone-dark rounded-card p-5">
            <p className="font-heading font-bold text-heading">
              Verde escuro · Atenção
            </p>
            <p className="mt-1 text-caption text-fg-muted">
              Regras e paradas interativas que o cliente precisa absorver.
            </p>
          </li>
          <li className="tone-alert rounded-card p-5">
            <p className="font-heading font-bold text-heading">
              Marrom · Crítico
            </p>
            <p className="mt-1 text-caption text-fg-muted">
              Um aviso cujo descumprimento causa problema real. No máximo um ou
              dois por página.
            </p>
          </li>
        </ul>
      </Section>

      <section className="tone-light px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-page">
          <p className="font-heading text-caption font-semibold tracking-widest text-highlight uppercase">
            Exemplo · tone-light · história
          </p>
          <h2 className="mt-2 font-display text-display text-leaf">
            Um dia na Matilha
          </h2>
          <p className="mt-4 max-w-reading text-lead">
            A rotina começa com a saída dos cães para o quintal. Depois vem o
            café da manhã, servido um cão por vez, e a turma é liberada para
            brincar e socializar sob o olhar atento da equipe.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <h3 className="text-h3 font-bold">Manhã</h3>
              <p className="mt-2">
                Quintal, refeição individual e brincadeiras.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold">Tarde</h3>
              <p className="mt-2">
                Brincadeira ou descanso, respeitando cada cão.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold">Noite</h3>
              <p className="mt-2">
                Jantar, recreação e descanso com vigia noturno.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="tone-dark px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-page">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            Exemplo · tone-dark · atenção
          </p>
          <h2 className="mt-2 text-h1 font-extrabold">
            A carteirinha está em dia?
          </h2>
          <p className="mt-3 max-w-reading text-fg-muted">
            Marque o que o seu cão já tem. Sem as vacinas obrigatórias, não
            conseguimos receber a reserva.
          </p>
          <fieldset className="mt-6 grid max-w-reading gap-3">
            <legend className="sr-only">Vacinas e cuidados</legend>
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
                htmlFor={`vacina-${item.id}`}
                className="flex min-h-12 cursor-pointer items-center gap-4 rounded-md bg-surface-raised px-4 py-3 transition-colors duration-(--duration-fast) hover:bg-forest/70 has-checked:ring-2 has-checked:ring-lime"
              >
                <input
                  id={`vacina-${item.id}`}
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

          <div className="tone-alert mt-10 max-w-reading rounded-card p-6 shadow-lift">
            <p className="font-heading text-caption font-semibold tracking-widest text-fg-muted uppercase">
              Exemplo · tone-alert · crítico
            </p>
            <h3 className="mt-2 text-h2 font-extrabold">
              Importante: tudo por escrito
            </h3>
            <p className="mt-2">
              Nunca passe orientações de alimentação ou medicação apenas
              verbalmente. Como há troca de turnos, precisamos de tudo
              registrado para que toda a equipe tenha acesso.
            </p>
          </div>
        </div>
      </section>

      <Section title="Seção escura" tone="dark">
        <p className="max-w-reading text-lead">
          As seções alternam entre o tom claro (creme) e o escuro (verde oliva),
          como no PDF. Os componentes se adaptam sozinhos ao tom da seção.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold">Monitoramento 24h</h3>
            <p className="mt-2">
              Profissionais qualificados acompanham os cães em tempo integral,
              para garantir segurança e bem-estar.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold text-highlight">
              Importante: tudo por escrito
            </h3>
            <p className="mt-2">
              Orientações sobre alimentação e medicação devem ser enviadas por
              escrito, nunca só verbalmente.
            </p>
          </Card>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Contorno</Button>
        </div>
      </Section>

      <Section title="Componentes">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="text-h3 font-bold">Card com destaque</h3>
            <p className="mt-2">
              Cantos arredondados (<code>rounded-card</code>), sombra suave (
              <code>shadow-card</code>) e a barra lime à esquerda.
            </p>
          </Card>
          <Card accent={false}>
            <h3 className="text-h3 font-bold text-accent">Card simples</h3>
            <p className="mt-2">
              Sem a barra, para grupos de informação secundária.
            </p>
          </Card>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button>Falar no WhatsApp</Button>
          <Button variant="secondary">Ver as regras</Button>
          <Button variant="outline">Voltar</Button>
          <Button disabled>Desabilitado</Button>
        </div>
      </Section>

      <Section title="Movimento" tone="dark">
        <div className="flex flex-wrap items-center gap-10">
          <div className="text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="mx-auto size-16 origin-bottom animate-wag fill-lime"
            >
              <ellipse cx="32" cy="44" rx="14" ry="12" />
              <ellipse cx="14" cy="28" rx="6" ry="8" />
              <ellipse cx="25" cy="16" rx="6" ry="8" />
              <ellipse cx="39" cy="16" rx="6" ry="8" />
              <ellipse cx="50" cy="28" rx="6" ry="8" />
            </svg>
            <p className="text-caption text-fg-muted">animate-wag</p>
          </div>
          <div className="animate-reveal">
            <Card>
              <p className="font-heading font-bold">animate-reveal</p>
              <p className="text-caption">ease-out-soft · 600ms</p>
            </Card>
          </div>
        </div>
        <p className="mt-8 max-w-reading text-caption text-fg-muted">
          Com a opção “reduzir movimento” ativa no aparelho, todas as animações
          são desligadas.
        </p>
      </Section>
    </main>
  );
}
