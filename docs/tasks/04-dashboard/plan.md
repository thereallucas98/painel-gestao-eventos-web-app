# Fase 4 · Dashboard — Plan

Decisões: E1 recharts + wrapper `chart` (shadcn); E2 **4 gráficos** (escolha do usuário); E3 not-found no client; E4 badges de tipo/status. Read-only.

## 1. Dependências

- `pnpm add recharts` (estável) + `pnpm dlx shadcn@latest add chart` (wrapper `ChartContainer`/`ChartTooltip`).
- Cores de série via `ChartConfig` (brand laranja, `--midnight`, verde, vermelho), respeitando o tema.

## 2. Derivações puras (`lib/event-metrics.ts`) — testáveis (Fase 7)

- `cumulativeEntries(checkins)` → série de entradas (`action='entry' && success`) acumuladas por timestamp.
- `occupancyOverTime(checkins)` → série de "dentro agora" (entry +1 / exit −1, acumulado).
- `successErrorCounts(checkins)` → `{ success, error }`.
- `attendance(event)` → `{ checkin, expected, ratePct }` (de `entryRate`).

## 3. Feature `components/event-dashboard/` (convenção plana)

- **`index.tsx`** (`'use client'`): recebe `eventId`; usa `useEvent`/`useParticipants`/`useCheckins`; combina loading/erro; **404 → estado "não encontrado"**; monta o layout.
- **`parts.tsx`** (puros): `EventHeader`, grids, `ParticipantTable` (desktop) + cards (mobile) com badges de tipo/status.
- **`charts.tsx`** (puros, recharts): `EntriesAreaChart`, `OccupancyLineChart`, `AttendanceRadial`, `SuccessErrorDonut`.

## 4. Componentes reutilizáveis

- `components/metric-card.tsx` — `{ label, value, icon, accent? }`. Os 4 cards: Esperados · Check-ins · Erros · Taxa de Entrada (%).

## 5. Layout da tela

1. `EventHeader` (nome, data, local, `StatusBadge`, "Voltar").
2. **Métricas**: grid de 4 `MetricCard` (2 col mobile → 4 col desktop).
3. **Gráficos**: grid 2×2 — Entradas acumuladas (área) · Ocupação no tempo (linha) · Comparecimento (radial) · Sucesso × erro (donut).
4. **Participantes**: tabela (desktop) / cards (mobile) — nome, tipo (VIP/Normal), status (Dentro/Fora).

## 6. Rota

- `app/(dashboard)/eventos/[id]/page.tsx`: `const { id } = await params` → `<EventDashboard eventId={id} />` (remove o placeholder).

## 7. Estados

- Loading: skeletons (cards + gráficos + tabela). Erro (não-404): mensagem + retry. 404: "Evento não encontrado" + voltar. Sem participantes/checkins: gráficos/tabela com estado vazio gracioso (ex.: EVT-004 zerado).

## Resultado esperado

Dashboard de EVT-001 com 4 métricas corretas, 4 gráficos renderizando, lista de participantes traduzida; EVT-004 (zerado) sem quebrar; 404 tratado; responsivo; `lint`/`typecheck` limpos.
