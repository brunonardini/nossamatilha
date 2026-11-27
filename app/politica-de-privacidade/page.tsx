import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/home/site-footer';
import { SiteHeader } from '@/components/home/site-header';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Nossa Matilha',
  description:
    'Como a Nossa Matilha, em Resende (RJ), trata os dados pessoais de quem visita o site e de quem fala com a gente pelo WhatsApp, conforme a LGPD.',
};

/** Date of the last change to this policy (update it with every change). */
const UPDATED_AT = '26 de novembro de 2026';

/** A numbered policy section. */
function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section className="mt-10">
      <h2 className="text-h2 font-extrabold">{title}</h2>
      <div className="mt-3 space-y-3 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}

/**
 * Privacy policy (LGPD), linked from the footer. It describes only what the
 * site and the business actually do (see AGENTS.md "Privacy and LGPD" and
 * docs/business.md): the site stores nothing, sets no cookies and loads no
 * trackers; the quote form only builds a WhatsApp message. Update it, and
 * `UPDATED_AT`, whenever data collection, cookies or third parties change.
 */
export default function PrivacyPolicyPage(): ReactNode {
  const link = 'font-semibold text-leaf-ink underline underline-offset-4';

  return (
    <>
      <SiteHeader />
      <main className="tone-light px-4 pt-10 pb-20 sm:px-8 sm:pt-16">
        <article className="mx-auto max-w-reading">
          <p className="font-heading text-caption font-semibold tracking-widest text-accent uppercase">
            LGPD · Lei nº 13.709/2018
          </p>
          <h1 className="mt-2 text-h1 font-extrabold">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-lead text-fg-muted">
            Explicamos aqui, de forma simples, quais dados pessoais tratamos,
            para quê e como você pode exercer os seus direitos.
          </p>
          <p className="mt-2 text-caption text-fg-muted">
            Última atualização: {UPDATED_AT}.
          </p>

          <Section title="Quem somos">
            <p>
              A Nossa Matilha é um espaço de creche, hospedagem e adestramento
              para cães em Resende (RJ) e é a responsável (controladora) pelos
              dados pessoais descritos nesta política.
            </p>
          </Section>

          <Section title="O que o site coleta">
            <p>
              <strong>Nada fica salvo no site.</strong> Não usamos cadastro,
              login, banco de dados nem armazenamento no seu navegador.
            </p>
            <p>
              O formulário de orçamento pede apenas o necessário: o seu nome, o
              nome do seu cão e os serviços de interesse (ou uma mensagem
              escrita por você). Esses dados servem só para montar a mensagem.
              Ao clicar no botão, o WhatsApp abre com o texto pronto, e é você
              quem decide se envia. Nada do que você digita é guardado ou
              registrado pelo site.
            </p>
          </Section>

          <Section title="Cookies e rastreamento">
            <p>
              O site não usa cookies, ferramentas de análise de audiência,
              pixels de anúncios ou qualquer outro rastreador. As fontes e as
              imagens são servidas pelo próprio site, sem chamadas a serviços de
              terceiros.
            </p>
            <p>
              Se um dia passarmos a usar alguma ferramenta desse tipo, ela só
              será carregada com o seu consentimento, e esta política será
              atualizada antes.
            </p>
          </Section>

          <Section title="Registros de acesso">
            <p>
              Como em qualquer site, o servidor que hospeda as páginas pode
              registrar dados técnicos de acesso, como endereço IP, data e hora,
              e tipo de navegador, para manter o site funcionando com segurança.
              Esses registros não são usados para identificar visitantes nem
              para publicidade.
            </p>
          </Section>

          <Section title="O que tratamos no atendimento pelo WhatsApp">
            <p>
              Orçamentos, reservas, cancelamentos e orientações sobre o seu cão
              acontecem pelo nosso WhatsApp oficial. Nessa conversa, podemos
              tratar:
            </p>
            <ul>
              <li>seu nome, telefone e as mensagens trocadas;</li>
              <li>
                para reservas, a ficha cadastral, a carteira de vacinação,
                receitas veterinárias e instruções de alimentação e saúde do
                cão;
              </li>
              <li>comprovantes de pagamento.</li>
            </ul>
            <p>
              Usamos esses dados para responder ao seu pedido, fazer o
              orçamento, confirmar a reserva, cuidar do seu cão com segurança e
              cumprir obrigações legais. A base legal é a execução do contrato e
              dos procedimentos que você solicita antes dele, e o cumprimento de
              obrigações legais. Esses documentos circulam só pelo WhatsApp
              oficial: nunca pelo site.
            </p>
            <p>
              O WhatsApp é um serviço da Meta, que trata os dados da conversa
              conforme a política de privacidade dela.
            </p>
          </Section>

          <Section title="Compartilhamento">
            <p>
              Não vendemos nem alugamos dados pessoais. O banho e tosa é feito
              no nosso espaço pela parceira Encantacão, mas é agendado
              diretamente com ela, que trata os seus dados de forma
              independente.
            </p>
            <p>
              Os links para o WhatsApp, para o nosso{' '}
              <a
                href={INSTAGRAM_URL}
                className={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ({INSTAGRAM_HANDLE})
              </a>{' '}
              e para as avaliações no Google levam a serviços de terceiros, com
              políticas de privacidade próprias. Eles só recebem dados se você
              abrir esses links.
            </p>
          </Section>

          <Section title="Avaliações e fotos publicadas">
            <p>
              As avaliações de clientes exibidas no site, com nome e foto de
              perfil, foram publicadas com autorização de cada pessoa. As fotos
              da equipe e dos cães também são usadas com autorização de uso de
              imagem. Quem quiser retirar a sua avaliação ou foto pode pedir
              pelo WhatsApp, e atenderemos.
            </p>
          </Section>

          <Section title="Por quanto tempo guardamos">
            <p>
              Guardamos os dados do atendimento apenas pelo tempo necessário
              para prestar o serviço e cumprir obrigações legais. Depois disso,
              eles são eliminados ou anonimizados.
            </p>
          </Section>

          <Section title="Seus direitos">
            <p>Pela LGPD (art. 18), você pode pedir a qualquer momento:</p>
            <ul>
              <li>
                a confirmação de que tratamos dados seus e o acesso a eles;
              </li>
              <li>
                a correção de dados incompletos, inexatos ou desatualizados;
              </li>
              <li>
                a anonimização, o bloqueio ou a eliminação de dados
                desnecessários ou tratados em desconformidade com a lei;
              </li>
              <li>a portabilidade dos dados a outro fornecedor;</li>
              <li>informações sobre com quem compartilhamos os seus dados;</li>
              <li>
                a revogação do consentimento, quando o tratamento depender dele,
                e a eliminação dos dados tratados com base nele.
              </li>
            </ul>
          </Section>

          <Section title="Mudanças nesta política">
            <p>
              Atualizaremos esta página sempre que mudar a forma como tratamos
              dados pessoais. A data da última atualização fica no topo.
            </p>
          </Section>

          <p className="mt-12">
            <Link href="/" className={link}>
              Voltar para a página inicial
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
