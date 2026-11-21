# Boarding guide page — script

Chapter-by-chapter script for the interactive boarding guide, live at `/guia-da-hospedagem` (plan: [boarding-guide-plan.md](boarding-guide-plan.md)). Every fact comes from [business.md](business.md). Structure and notes are in English; the copy blocks are the pt-BR text visitors will read (draft for the owner's review).

Tone meaning follows [design-system.md](design-system.md#what-each-tone-means): **light** = story, **dark** = rule or interactive checkpoint, **alert** = critical warning block.

## Narrative arc

The visitor follows a first stay in order: first they fall in love with the place (who we are, space, team, a day in the routine), then they prepare for the stay (vaccines, booking, daily rate, the bag, cancellation), and they end with a treat (bath and grooming) and the call to action.

| #   | Chapter                    | Tone             | Interaction                  | Brochure pages |
| --- | -------------------------- | ---------------- | ---------------------------- | -------------- |
| 0   | Bem-vindo à Matilha        | light            | — (chapter index)            | 1, 2           |
| 1   | Quem somos e o espaço      | light            | Animated numbers             | 3, 4           |
| 2   | Nossa equipe               | light            | —                            | 5              |
| 3   | Um dia na Matilha          | light            | Scroll: morning → night      | 11, 12         |
| 4   | A carteirinha está em dia? | **dark**         | **Vaccine checklist**        | 6              |
| 5   | Como reservar              | light            | — (4 illustrated steps)      | 7              |
| 6   | Como funciona a diária     | **dark**         | **Daily-rate clock**         | 7, 9, 15, 16   |
| 7   | Arrumando a malinha        | **dark** + alert | **Pack the bag**             | 10, 13         |
| 8   | E se os planos mudarem?    | **dark**         | **Cancellation simulator**   | 8, 9           |
| 9   | Banho e tosa               | light            | —                            | 14             |
| 10  | Tudo pronto!               | light            | Summary of checkpoints + CTA | 15, 17         |

7 light chapters and 4 dark ones: about one section in three is dark, matching the 60-30-10 split. The single `tone-alert` block is in chapter 7.

## Global elements

- **Progress bar** at the top and a **chapter index** (opened from a button), so returning visitors can jump straight to a rule.
- **Checkpoint counter**: "2 de 4 paradas concluídas". Completing the 4 dark checkpoints unlocks the final summary. State lives only in memory for the visit (no storage, no personal data).
- **WhatsApp call to action** stays reachable (floating button on mobile after chapter 3, never covering content).
- Every interaction has a static fallback: the full rule text is always in the HTML, readable without JavaScript and with reduced motion.

## Narrator: Bacon, and Silvia

- **Bacon** (Silvia's dog) guides the visitor through the whole page. He appears as an **illustrated character** in speech bubbles: a short line per chapter, in first person, light and funny, never carrying a rule on his own (rules always stay in the main text). See [illustration-guide.md](illustration-guide.md).
- **Silvia Matrumoto** (CEO) is the human face of the business and appears in **real photos**, often together with the real Bacon. The illustrated Bacon is the guide; the photos prove that the place, the people and the dog are real.
- Bacon's lines are marked `🐶 Bacon:` in the copy blocks below.

## Chapters

### 0 · Bem-vindo à Matilha (light)

Hero with the logo, a short welcome and a scroll cue. Visual: the logo silhouettes animate in (dog, cat, small dog, leash circle drawing itself).

```text
Bem-vindo à Matilha!
Que bom ter você e o seu cão aqui.

🐶 Bacon: Oi! Eu sou o Bacon, e esta é a minha casa. Vem comigo que eu te mostro
tudo — até as regras, mas prometo que é rapidinho.
Preparamos este guia para você conhecer a nossa casa, a nossa rotina e tudo o que
precisa saber antes da primeira hospedagem. Leva só alguns minutos — e tem
algumas paradas pelo caminho.
[Começar]
```

### 1 · Quem somos e o espaço (light)

Numbers count up when they enter the screen. Visual: aerial photo of the space and photos of the areas (`fotos/hospedagem`, `fotos/creche`).

```text
Um espaço completo de lazer, cuidado e descanso para o seu cão.

+ de 1.100 m² para brincar, explorar e descansar
até 32 cães, com conforto, segurança e cuidado individual
24h de monitoramento, com profissionais qualificados em tempo integral

Socialização natural
Aqui os cães não são separados por tamanho, e sim por nível de energia.
Conviver com cães de tamanhos diferentes também faz parte da socialização.

🐶 Bacon: Eu sou grandão, mas brinco com todo mundo. O que importa é a energia!
```

### 2 · Nossa equipe (light)

Opens with Silvia: a real photo of Silvia with Bacon (`fotos/silvia`), then four cards about the team. Staff photos (`fotos/time`, `fotos/creche`) may be used (image authorizations on file).

```text
Gente que entende de cachorro

Silvia Matrumoto, CEO da Nossa Matilha e adestradora certificada pela FBAA
(Federação Brasileira dos Adestradores de Animais), lidera uma equipe preparada
para cuidar do seu cão como se fosse da família.

🐶 Bacon: Essa é a Silvia, a minha humana. Ela que me ensinou a sentar — e a
esperar a minha vez na hora da comida.

Auxiliar veterinário
Todos os profissionais que cuidam dos cães hospedados têm formação em auxiliar
veterinário.

Monitor de creche
Formação específica para atuar como monitores de creche canina.

Treinamento contínuo
A equipe passa por treinamentos de aperfeiçoamento.
```

### 3 · Um dia na Matilha (light)

The signature scroll scene: a pinned sky changes from sunrise to night while three moments pass. CSS scroll-driven animation, with a static three-card fallback.

```text
Um dia na Matilha

Manhã
O dia começa com a saída para o quintal. Depois vem a alimentação, oferecida
individualmente, um cão por vez, com a equipe acompanhando. Em seguida, a turma
vai para os espaços da creche brincar e socializar.
Quem precisa ou está acostumado ganha também um almoço no meio do dia.

Tarde
Mais brincadeira ou descanso, respeitando o perfil e as necessidades de cada cão.

Noite
O jantar também é individual. Depois de mais um pouco de diversão, cada um vai
para o quarto de descanso, onde passa a noite tranquilo, com um vigia noturno
acompanhando.

🐶 Bacon: Minha parte favorita? A hora de comer. Cada um no seu tempo, sem briga!
```

### 4 · A carteirinha está em dia? (dark · checkpoint 1)

**Interaction:** checklist. Ticking the two required vaccines and the antiparasitic completes the checkpoint; flu is optional. Then three "not accepted" cards flip in.

```text
A carteirinha está em dia?
Marque o que o seu cão já tem:

[ ] V10 (vacina polivalente múltipla) — obrigatória
[ ] Raiva — obrigatória
[ ] Antiparasitário e vermífugo em dia — obrigatório
[ ] Gripe — aconselhável

→ Tudo certo! Na hora de reservar, é só enviar uma foto do cartão de vacinação
  atualizado junto com a ficha cadastral.

🐶 Bacon: Vacina dói um pouquinho, mas é o que deixa a gente brincar junto sem
medo.

Para a segurança de todos, não podemos hospedar:
✕ cães com sintomas de vermes;
✕ cães com infestação de pulgas ou carrapatos;
✕ cadelas no período de cio.
```

If a required item is left unticked, the message is friendly, not blocking: "Sem a V10, a raiva e o antiparasitário em dia, não conseguimos receber o seu cão. Fale com o seu veterinário antes de reservar."

### 5 · Como reservar (light)

Four illustrated steps that appear one by one. The 48-hour rule gets a big number.

```text
Como reservar

Trabalhamos somente com reserva, feita pelo WhatsApp oficial da Nossa Matilha,
com pelo menos 48h de antecedência do horário de entrada, conforme
disponibilidade de vaga.

1. Ficha cadastral preenchida
2. Foto do cartão de vacinação atualizado
3. Datas e horários previstos de entrada e saída
4. Comprovante de pagamento

A reserva é confirmada depois que conferimos a documentação e a vaga, você
aceita as regras e o pagamento é feito.
Orçamento não é reserva. Pacotes também precisam ser reservados com 48h de
antecedência.

🐶 Bacon: É tudo pelo WhatsApp. Até eu consigo!
```

### 6 · Como funciona a diária (dark · checkpoint 2)

**Interaction:** daily-rate clock. The visitor picks check-in and check-out (day and time, limited to 7h–18h); a clock ring fills in 24-hour laps and shows the number of diárias and the reference total. The checkpoint completes after one simulation.

```text
Como funciona a diária?

R$ 120,00 por diária
Cada diária tem 24 horas, contadas a partir do horário de entrada. Passou das 24
horas, começa uma nova diária.

Não fazemos meia diária: estadias de menos de 24 horas, inclusive com entrada e
saída no mesmo dia, contam como uma diária completa.

Entrada e retirada: das 7h às 18h.

🐶 Bacon: Eu não sei ler relógio, mas a Silvia sabe. Testa aí embaixo!

[Simulador]
Entrada: sex, 10h  ·  Saída: dom, 16h
→ 3 diárias · R$ 360,00
"Dica: sair até as 10h de domingo fecharia em 2 diárias."

Valor de referência. O orçamento oficial é feito pelo WhatsApp — reservas com
mais antecedência podem ter condições especiais.
```

Logic: `diárias = max(1, ceil((saída − entrada) / 24h))`; the tip appears when the stay passes a 24-hour boundary by less than a few hours. The price comes from a single constant shared with the rest of the site.

### 7 · Arrumando a malinha (dark · checkpoint 3)

**Interaction:** pack the bag. Items are tapped (or dragged on desktop) into the bag. Required items (food, medication if used) must go in; optional items show "pode trazer, mas aqui já temos!". The checkpoint completes when the food is in.

```text
Arrumando a malinha

Indispensável
🥣 Ração suficiente para toda a estadia
💊 Remédios, se o seu cão usar

Se quiser, pode trazer
🐶 Bacon: Ração é o mais importante. Sério. Não esquece a ração.

Caminha, mantinha e brinquedos favoritos deixam a estadia ainda mais
aconchegante. Mas fique tranquilo: caminhas, potes e brinquedos nós já temos!

Alimentação
Informe por escrito a quantidade e os horários de cada refeição: num bilhete na
bolsa do cão ou pelo WhatsApp oficial.

Restrições e cuidados especiais
Alergias, restrições alimentares, condições de saúde e outros cuidados vão na
ficha cadastral ou por escrito no WhatsApp, antes da entrada.

Medicação
Os remédios precisam vir com a prescrição veterinária (junto com as coisas do
cão ou por foto no WhatsApp), informando o nome, a dose, os horários e o período
do tratamento.
```

`tone-alert` block at the end of the chapter:

```text
Importante: tudo por escrito
Não passe orientações só de boca, nem na hora de deixar o cão. Como há troca de
turnos e de profissionais, precisamos de tudo registrado para que toda a equipe
tenha as informações certas.
```

### 8 · E se os planos mudarem? (dark · checkpoint 4)

**Interaction:** cancellation simulator. The visitor picks the notice ("48h ou mais" / "menos de 48h ou não comparecimento") and sees both options side by side, with values computed from the diárias of chapter 6 (or 1 diária by default). The checkpoint completes after trying both notices.

```text
E se os planos mudarem?

Cancelamentos são feitos pelo WhatsApp oficial. A antecedência conta a partir do
horário previsto de entrada até o horário em que você enviou a mensagem.

Com 48h ou mais de antecedência, você escolhe:
• devolução de 90% do valor das diárias canceladas; ou
• 100% em crédito para uma próxima hospedagem.

Com menos de 48h, ou se não comparecer:
• devolução de 60% do valor; ou
• 90% em crédito para uma próxima hospedagem.

[Simulador · 3 diárias = R$ 360,00]
48h ou mais:      devolução R$ 324,00  ou  crédito R$ 360,00
Menos de 48h:     devolução R$ 216,00  ou  crédito R$ 324,00

As opções são alternativas e as retenções não se somam. O crédito vale por 3
meses a partir do cancelamento, precisa ser agendado conforme a vaga, e a nova
hospedagem segue o valor da época (com pagamento de eventual diferença).

🐶 Bacon: Mudou de ideia e quer ficar mais? Eu sempre quero!

Precisa ficar mais tempo?
Peça a extensão para a Nossa Matilha. Ela depende de vaga e da confirmação da
equipe, e a permanência além do contratado pode gerar uma nova diária.
```

### 9 · Banho e tosa (light)

A small reward before the end. Visual: before/after style photos from `fotos/banho e tosa` (dogs only).

```text
Volta para casa cheiroso

Além da hospedagem, tem banho e tosa aqui mesmo na Nossa Matilha, com a
Encantacão, nossa parceira. É só pedir na reserva:

Sem correria: o banho é feito aqui, junto com a hospedagem.
Cuidado de quem conhece o seu cão: ele é atendido pela equipe que já está
com ele.
Chega em casa pronto: é só abraçar.

🐶 Bacon: Banho? Só se tiver toalha quentinha depois.

Agende direto com a Encantacão pelo WhatsApp [número de NEXT_PUBLIC_GROOMING_WHATSAPP_PHONE_NUMBER].
```

### 10 · Tudo pronto! (light)

Summary of the four checkpoints with ticks, the main call to action, and social media.

```text
Tudo pronto para a primeira estadia!

✓ Carteirinha em dia
✓ Diária de 24 horas, das 7h às 18h
✓ Malinha com ração (e remédio, com receita)
✓ Cancelamento pelo WhatsApp

[Pedir orçamento no WhatsApp]

🐶 Bacon: Agora você já sabe tudo. Te espero aqui!

As promoções de hospedagem, quando houver, são divulgadas no nosso Instagram.
Segue a gente lá! [@nossamatilha.resende → INSTAGRAM_URL em lib/contact.ts]
```

## Decisions (owner, 2026-11-21)

1. **Narrator:** Bacon, illustrated; Silvia Matrumoto (CEO) in real photos, often with Bacon.
2. **Official WhatsApp:** read from `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER` ([environment.md](environment.md)); never written in the repository.
3. **Registration form:** today it is sent on WhatsApp, so the page only explains it. A future version will bring the form to the site (needs the privacy review described in `AGENTS.md`).
4. **Encantacão contact:** shown on the page, from `NEXT_PUBLIC_GROOMING_WHATSAPP_PHONE_NUMBER`.
5. **Social media:** the Instagram profile in `lib/contact.ts`.
6. **Photos with people:** allowed; the business holds signed image-use authorizations.
7. **Voice:** "você", warm and light.
