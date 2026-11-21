import type { ReactNode } from 'react';
import { BaconSays } from '@/components/boarding-guide/bacon-says';
import { BagPacker } from '@/components/boarding-guide/bag-packer';
import { CancellationSimulator } from '@/components/boarding-guide/cancellation-simulator';
import { ChapterSection } from '@/components/boarding-guide/chapter-section';
import { DailyRateSimulator } from '@/components/boarding-guide/daily-rate-simulator';
import { GuidePhoto } from '@/components/boarding-guide/guide-photo';
import { VaccineChecklist } from '@/components/boarding-guide/vaccine-checklist';
import { Card } from '@/components/ui/card';
import { CrossIcon } from '@/components/ui/icons';
import { guidePhotos } from '@/lib/boarding-guide/photos';
import {
  BUSINESS_HOURS,
  CANCELLATION,
  DAILY_RATE_BRL,
  DAILY_RATE_HOURS,
  formatBRL,
} from '@/lib/boarding-guide/pricing';

/*
 * The four checkpoints (dark chapters). This first version renders the full
 * rules as static content; each checkpoint gets its interaction later, on top
 * of this text (which stays as the no-JS fallback).
 */

const notAccepted = [
  'Cães com sintomas de vermes',
  'Cães com infestação de pulgas ou carrapatos',
  'Cadelas no período de cio',
];

/** Chapter 4 (checkpoint 1): vaccines and health requirements. */
export function VaccinesChapter(): ReactNode {
  return (
    <ChapterSection
      id="vacinas"
      tone="dark"
      number={4}
      eyebrow="Parada 1 de 4"
      titleStyle="heading"
      title="A carteirinha está em dia?"
      intro="Para hospedar o seu cão, ele precisa estar com estas vacinas e cuidados em dia:"
    >
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <VaccineChecklist />
        </div>
        <div>
          <BaconSays pose="vaccine">
            Vacina dói um pouquinho, mas é o que deixa a gente brincar junto sem
            medo.
          </BaconSays>
          <h3 className="mt-10 text-h3 font-bold">
            Para a segurança de todos, não podemos hospedar:
          </h3>
          <ul className="mt-4 grid gap-3">
            {notAccepted.map((item) => (
              <li
                key={item}
                className="scroll-reveal flex items-center gap-3 font-semibold"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brown text-cream">
                  <CrossIcon className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChapterSection>
  );
}

/** Chapter 6 (checkpoint 2): how the daily rate works. */
export function DailyRateChapter(): ReactNode {
  return (
    <ChapterSection
      id="diaria"
      tone="dark"
      number={6}
      eyebrow="Parada 2 de 4"
      titleStyle="heading"
      title="Como funciona a diária?"
    >
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <p className="font-display text-display text-accent">
            {formatBRL(DAILY_RATE_BRL)}
          </p>
          <p className="font-heading text-lead font-semibold">por diária</p>
          <div className="mt-8 grid gap-4">
            <Card>
              <h3 className="text-h3 font-bold">
                {DAILY_RATE_HOURS} horas a partir da entrada
              </h3>
              <p className="mt-1">
                Cada diária tem {DAILY_RATE_HOURS} horas, contadas a partir do
                horário de entrada. Passou das {DAILY_RATE_HOURS} horas, começa
                uma nova diária.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold">Não fazemos meia diária</h3>
              <p className="mt-1">
                Estadias de menos de {DAILY_RATE_HOURS} horas, inclusive com
                entrada e saída no mesmo dia, contam como uma diária completa.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold">
                Das {BUSINESS_HOURS.opens}h às {BUSINESS_HOURS.closes}h
              </h3>
              <p className="mt-1">
                A entrada e a retirada acontecem somente nesse horário.
              </p>
            </Card>
          </div>
        </div>
        <div>
          <BaconSays pose="clock">
            Eu não sei ler relógio, mas a Silvia sabe. Testa aí embaixo!
          </BaconSays>
          <div className="mt-8">
            <DailyRateSimulator />
          </div>
          <p className="mt-6 text-caption text-fg-muted">
            Valor de referência. O orçamento oficial é feito pelo WhatsApp —
            reservas com mais antecedência podem ter condições especiais.
          </p>
        </div>
      </div>
    </ChapterSection>
  );
}

/** Chapter 7 (checkpoint 3): what to bring, feeding and medication. */
export function BagChapter(): ReactNode {
  return (
    <ChapterSection
      id="malinha"
      tone="dark"
      number={7}
      eyebrow="Parada 3 de 4"
      titleStyle="heading"
      title="Arrumando a malinha"
      intro="Não pode faltar a ração para toda a estadia e os remédios, se o seu cão usar. Caminha, mantinha e brinquedo são opcionais. Potes não precisa trazer: usamos os nossos, que são esterilizáveis."
    >
      <BaconSays pose="bag">
        Ração é o mais importante. Sério. Não esquece a ração.
      </BaconSays>
      <div className="mt-8">
        <BagPacker />
      </div>

      <div className="mt-16 grid items-start gap-10 md:grid-cols-2">
        <div className="grid gap-4">
          <Card>
            <h3 className="text-h3 font-bold">Alimentação</h3>
            <p className="mt-1">
              Informe por escrito a quantidade e os horários de cada refeição:
              num bilhete na bolsa do cão ou pelo WhatsApp oficial.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold">
              Restrições e cuidados especiais
            </h3>
            <p className="mt-1">
              Alergias, restrições alimentares, condições de saúde e outros
              cuidados vão na ficha cadastral ou por escrito no WhatsApp, antes
              da entrada.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold">Medicação</h3>
            <p className="mt-1">
              Os remédios precisam vir com a prescrição veterinária (junto com
              as coisas do cão ou por foto no WhatsApp), informando o nome, a
              dose, os horários e o período do tratamento.
            </p>
          </Card>
        </div>
        <GuidePhoto
          photo={guidePhotos.bagFoodRoom}
          sizes="(min-width: 768px) 45vw, 100vw"
          caption="A ração do seu cão fica guardada na nossa sala de alimentação."
          className="mx-auto w-full max-w-md"
        />
      </div>

      <div className="tone-alert mt-12 max-w-reading rounded-card p-6 shadow-lift sm:p-8">
        <h3 className="text-h2 font-extrabold">Importante: tudo por escrito</h3>
        <p className="mt-2">
          Não passe orientações só de boca, nem na hora de deixar o cão. Como há
          troca de turnos e de profissionais, precisamos de tudo registrado para
          que toda a equipe tenha as informações certas.
        </p>
      </div>
    </ChapterSection>
  );
}

/** Chapter 8 (checkpoint 4): cancellation and extension. */
export function CancellationChapter(): ReactNode {
  const { withNotice, late, creditValidityMonths } = CANCELLATION;
  const percent = (value: number): string => `${Math.round(value * 100)}%`;
  const rows = [
    { label: '48h ou mais de antecedência', policy: withNotice },
    { label: 'Menos de 48h, ou não comparecimento', policy: late },
  ];
  return (
    <ChapterSection
      id="cancelamento"
      tone="dark"
      number={8}
      eyebrow="Parada 4 de 4"
      titleStyle="heading"
      title="E se os planos mudarem?"
      intro="Cancelamentos são feitos pelo WhatsApp oficial. A antecedência conta a partir do horário previsto de entrada até o horário em que você enviou a mensagem."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <Card key={row.label} className="scroll-reveal">
            <h3 className="text-h3 font-bold">{row.label}</h3>
            <p className="mt-2">Você escolhe uma das opções:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Devolução de {percent(row.policy.refund)}</strong> do
                valor das diárias canceladas
              </li>
              <li>
                <strong>{percent(row.policy.credit)} em crédito</strong> para
                uma próxima hospedagem
              </li>
            </ul>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <CancellationSimulator />
      </div>
      <p className="mt-6 max-w-reading text-fg-muted">
        As opções são alternativas e as retenções não se somam. O crédito vale
        por {creditValidityMonths} meses a partir do cancelamento, precisa ser
        agendado conforme a vaga, e a nova hospedagem segue o valor da época
        (com pagamento de eventual diferença).
      </p>

      <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
        <BaconSays pose="thinking">
          Mudou de ideia e quer ficar mais? Eu sempre quero!
        </BaconSays>
        <Card>
          <h3 className="text-h3 font-bold">Precisa ficar mais tempo?</h3>
          <p className="mt-1">
            Peça a extensão para a Nossa Matilha. Ela depende de vaga e da
            confirmação da equipe, e a permanência além do contratado pode gerar
            uma nova diária.
          </p>
        </Card>
      </div>
    </ChapterSection>
  );
}
