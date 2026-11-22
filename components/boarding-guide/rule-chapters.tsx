import type { ReactNode } from 'react';
import { BaconSays } from '@/components/boarding-guide/bacon-says';
import { BagPacker } from '@/components/boarding-guide/bag-packer';
import { CancellationSimulator } from '@/components/boarding-guide/cancellation-simulator';
import { ChapterSection } from '@/components/boarding-guide/chapter-section';
import { DailyRateSimulator } from '@/components/boarding-guide/daily-rate-simulator';
import { GuidePhoto } from '@/components/boarding-guide/guide-photo';
import { VaccinesMotion } from '@/components/boarding-guide/motion/vaccines-motion';
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
    <VaccinesMotion>
      <ChapterSection
        id="vacinas"
        tone="dark"
        number={4}
        eyebrow="Parada 1 de 4"
        titleStyle="heading"
        title="Vacinas e cuidados de saúde"
        intro="Confira o que seu cão precisa ter em dia antes da hospedagem."
      >
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <VaccineChecklist />
          </div>
          <div>
            <div data-vaccine-bacon>
              <BaconSays pose="vaccine" reveal={false}>
                Eu prefiro a parte depois da picadinha, quando ganho carinho.
              </BaconSays>
            </div>
            <h3 className="mt-10 text-h3 font-bold">
              Quando seu cão não pode se hospedar
            </h3>
            <ul className="mt-4 grid gap-3">
              {notAccepted.map((item) => (
                <li
                  key={item}
                  data-not-accepted
                  className="flex items-center gap-3 font-semibold"
                >
                  <span
                    data-not-accepted-icon
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-brown text-cream"
                  >
                    <CrossIcon className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ChapterSection>
    </VaccinesMotion>
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
      title="Como funciona a diária"
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
                Depois desse período, começa uma nova diária.
              </p>
            </Card>
            <Card>
              <h3 className="text-h3 font-bold">Estadias mais curtas</h3>
              <p className="mt-1">
                Cobramos uma diária inteira por estadias de menos de{' '}
                {DAILY_RATE_HOURS} horas, inclusive quando o cão chega e sai no
                mesmo dia.
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
            Eu conto o tempo pela hora da ração. Você pode simular a diária aqui
            embaixo.
          </BaconSays>
          <div className="mt-8">
            <DailyRateSimulator />
          </div>
          <p className="mt-6 text-caption text-fg-muted">
            A simulação dá uma estimativa. Peça o orçamento pelo WhatsApp
            oficial. Reservas feitas com mais antecedência podem ter condições
            especiais.
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
      title="O que levar na malinha"
      intro="Separe ração para toda a estadia e os remédios que seu cão usa. Caminha, mantinha e brinquedo são opcionais. Deixe os potes em casa. Aqui usamos potes que podem ser esterilizados."
    >
      <BaconSays pose="bag">
        Se eu arrumasse a minha mala, começaria pela ração.
      </BaconSays>
      <div className="mt-8">
        <BagPacker />
      </div>

      <div className="mt-16 grid items-start gap-10 md:grid-cols-2">
        <div className="grid gap-4">
          <Card>
            <h3 className="text-h3 font-bold">Alimentação</h3>
            <p className="mt-1">
              Anote a quantidade e o horário de cada refeição. Coloque o bilhete
              na bolsa do cão ou mande pelo WhatsApp oficial.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold">
              Restrições e cuidados especiais
            </h3>
            <p className="mt-1">
              Antes da entrada, informe alergias, restrições alimentares,
              condições de saúde e outros cuidados na ficha cadastral ou por
              escrito no WhatsApp oficial.
            </p>
          </Card>
          <Card>
            <h3 className="text-h3 font-bold">Medicação</h3>
            <p className="mt-1">
              Traga a receita junto com os remédios ou envie uma foto pelo
              WhatsApp oficial. A receita deve indicar o nome do remédio, a
              dose, os horários e a duração do tratamento.
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
        <h3 className="text-h2 font-extrabold">
          Deixe as orientações por escrito
        </h3>
        <p className="mt-2">
          Mesmo que você explique os cuidados na chegada, deixe tudo anotado.
          Assim, quem assumir o próximo turno pode consultar as orientações do
          seu cão.
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
    { label: '48 horas ou mais de antecedência', policy: withNotice },
    { label: 'Menos de 48 horas ou não comparecimento', policy: late },
  ];
  return (
    <ChapterSection
      id="cancelamento"
      tone="dark"
      number={8}
      eyebrow="Parada 4 de 4"
      titleStyle="heading"
      title="Como cancelar ou prolongar a estadia"
      intro="Para cancelar, mande uma mensagem pelo WhatsApp oficial. A antecedência é o tempo entre o envio da mensagem e o horário de entrada previsto na reserva."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((row) => (
          <Card key={row.label} className="scroll-reveal">
            <h3 className="text-h3 font-bold">{row.label}</h3>
            <p className="mt-2">
              Você pode escolher entre devolução e crédito.
            </p>
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
        O crédito vale por {creditValidityMonths} meses a partir do
        cancelamento. Para usá-lo, reserve com antecedência, conforme a
        disponibilidade. A nova hospedagem segue o valor da época. Se houver
        diferença, você paga o restante.
      </p>

      <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
        <BaconSays pose="thinking">
          Por mim, a gente fica mais um dia no quintal.
        </BaconSays>
        <Card>
          <h3 className="text-h3 font-bold">Para ficar mais tempo</h3>
          <p className="mt-1">
            Consulte a equipe da Nossa Matilha para saber se há vaga e confirmar
            a extensão. Se o cão ficar além do período contratado, pode haver
            cobrança de outra diária.
          </p>
        </Card>
      </div>
    </ChapterSection>
  );
}
