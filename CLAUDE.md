# CLAUDE.md — Painel de Gestão de Eventos

Manual operacional deste repositório. Lido a cada sessão. Mantenha enxuto: referencie, não repita.

## 1. Fundação (Arché)

Este projeto adere ao **Arché** — os princípios que governam o comportamento do assistente.
Fonte vendada (SSOT): [`docs/foundation/arche.md`](docs/foundation/arche.md). Não reproduza os princípios aqui; estenda-os lá.

Resumo dos eixos (detalhe na fonte):

- **Anti-Duplication** — uma única fonte da verdade; referencie, não repita.
- **Anti-Babysitting** — em IMPLEMENTING com TODO list, execute até o fim; marque pendências, não pare.
- **LLM Conciseness** — máximo sinal, mínimo ruído.
- **Principle Enforcement** — pesquise antes de agir; detecte o modo do usuário antes de responder.

## 2. Protocolo de trabalho

Modos cognitivos (ver [`docs/foundation/arche.md`](docs/foundation/arche.md)): EXPLORING → RESEARCHING → PLANNING → IMPLEMENTING. Cada transição exige sinal explícito do usuário.

### Ciclo por fase/task

Cada fase do roadmap roda este pipeline, documentado em `docs/tasks/<fase>/` (ver [`docs/tasks/README.md`](docs/tasks/README.md)):

1. **brief** — objetivo e escopo
2. **research** — fatos relevantes (API, libs, dados)
3. **exploration** — opções e trade-offs
4. **plan** — abordagem escolhida
5. **todo** — checklist de execução
6. **validation** — critérios de pronto + roteiro de QA

Regras invioláveis:

- **Sem perguntas em aberto nas docs.** Dúvida de regra de negócio *ou* de código → perguntar ANTES de escrever. Docs nascem resolvidas.
- Só depois das docs aprovadas → **código**.
- Após o código → **QA passo a passo, um passo de cada vez**; não enviar o próximo sem o usuário solicitar.
- **Commit só após revisão e aprovação final do usuário.** Nunca commitar sem o "ok" explícito.

**Gate de definição:** ao chegar num ponto de decisão — apresente contexto → liste opções com trade-offs → recomende → documente em [`docs/decisions.md`](docs/decisions.md) após o aceite.

Humano no loop em todos os gates.

## 3. Stack e decisões-chave

Decisões completas em [`docs/decisions.md`](docs/decisions.md).

- **Framework:** Next.js (App Router), React 19, TypeScript — **app único** (sem monorepo).
- **UI:** Tailwind v4 + shadcn/ui (Radix + CVA + clsx + tailwind-merge), lucide-react, sonner, next-themes.
- **Estado/dados:** TanStack React Query + Zustand; React Hook Form + Zod onde fizer sentido.
- **API:** json-server local (Opção B do enunciado) em `http://localhost:3001` — CRUD real.
- **Style guide:** sistema Plann.er/Contatos — dark neutro, accent lime `#c4f120` (sucesso/ativo) e red `#e61e32` (erro/cancelado), `content/muted` para encerrado; fonte Schibsted Grotesk. Tokens como CSS variables.

## 4. Estrutura

```
src/
  app/(dashboard)/eventos            # listagem
  app/(dashboard)/eventos/[id]       # detalhe = dashboard do evento
  components/ui                      # shadcn primitives
  components/features                # EventCard, MetricCard, ParticipantTable, CheckInButton…
  hooks                              # useEvents, useEvent, useDebounce
  lib/api                            # client HTTP — UI nunca chama fetch direto
  lib/domain                         # regras de negócio (VIP/Normal/encerrado)
  lib/format · lib/date              # formatação, date-fns
  lib/i18n-enums.ts                  # status/type → PT
  providers                          # React Query provider, tema
  types                              # Event, Participant, Checkin
docs/foundation                      # Arché + padrões de código (vendado)
docs/decisions.md                    # log de decisões (ADR enxuto)
```

## 5. Padrões de código

Ver [`docs/foundation/code-standards.md`](docs/foundation/code-standards.md). Não duplicar aqui.

## 6. Commits

**Conventional Commits, 1 commit por fase do roadmap** (padronizado, não atômico).
Formato: `type(scope): descrição` — `feat` `fix` `chore` `test` `docs` `refactor`.
Sem emoji. Mensagem em português, imperativo. Ex.: `feat(listagem): busca, filtro e estados de carregamento`.

## 7. Roadmap

Fases e progresso em [`ROADMAP.md`](ROADMAP.md). Fase = unidade de commit.
