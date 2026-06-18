# Fase 4 · Detalhe do evento (Dashboard) — Brief

## Objetivo

Substituir o placeholder de `/eventos/[id]` por um **dashboard** do evento: cabeçalho, 4 cards de métrica, ao menos 1 gráfico e a lista de participantes — compondo as 3 queries já existentes (`useEvent` + `useParticipants` + `useCheckins`). Somente leitura nesta fase.

## Escopo (in)

- **Cabeçalho do evento**: nome, data, local, `StatusBadge`, link "Voltar".
- **Cards de métrica (4)** — `MetricCard`:
  - Participantes Esperados (`expectedCount`)
  - Check-ins Realizados (`checkinCount`)
  - Tentativas com Erro (`errorCount`)
  - Taxa de Entrada (`entryRate`, em %)
- **Gráfico (≥1)** — escolha da lib na exploration (sem beta):
  - evolução de entradas ao longo do tempo (a partir de `checkins`), e/ou proporção sucesso × erro.
- **Lista de participantes** — desktop tabela / mobile cards:
  - nome, **tipo** (`vip`/`normal` → label PT), **status** (`inside`/`outside` → label PT).
- **Composição**: buscar evento + participantes + check-ins; estados loading/erro/vazio; `notFound()` se o evento não existir.

## Fora de escopo (out)

- Ações de check-in/saída e regras de negócio (VIP/normal/encerrado) → **Fase 5**.
- Testes automatizados → **Fase 7**.

## Definição de pronto (resumo — detalhe em `validation.md`)

- Dashboard renderiza para um evento real (ex.: EVT-001): 4 métricas corretas, gráfico visível, lista de participantes com tipo/status traduzidos.
- Estados loading/erro tratados; evento inexistente → 404.
- Responsivo; `lint`/`typecheck` limpos.

## Referências

- Requisitos: PDF §2.2. Dados/edge cases: §5 (EVT-002 closed, EVT-004 cancelled/zerado).
- Hooks/tipos da Fase 2; enums em `lib/i18n-enums`; tokens/rebrand D-013.
