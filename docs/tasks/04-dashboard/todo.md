# Fase 4 · Dashboard — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Dependências
- ☐ `pnpm add recharts`
- ☐ `pnpm dlx shadcn@latest add chart`

## Derivações puras
- ☐ `lib/event-metrics.ts` — `cumulativeEntries`, `occupancyOverTime`, `successErrorCounts`, `attendance`

## Componentes
- ☐ `components/metric-card.tsx` — `{ label, value, icon, accent? }`
- ☐ `components/event-dashboard/charts.tsx` — `EntriesAreaChart`, `OccupancyLineChart`, `AttendanceRadial`, `SuccessErrorDonut` (recharts + ChartConfig)
- ☐ `components/event-dashboard/parts.tsx` — `EventHeader`, `ParticipantTable` (desktop) + cards (mobile) com badges tipo/status, skeletons/empty
- ☐ `components/event-dashboard/index.tsx` — `'use client'`, 3 queries, estados (loading/erro/404), layout

## Rota
- ☐ `app/(dashboard)/eventos/[id]/page.tsx` → `<EventDashboard eventId={id} />` (remover placeholder)

## Verificação (entra no `validation.md`)
- ☐ EVT-001: 4 métricas corretas, 4 gráficos renderizam, participantes com tipo/status traduzidos
- ☐ EVT-004 (zerado) não quebra; estados vazios graciosos
- ☐ id inválido → "evento não encontrado"
- ☐ Responsivo (grid de gráficos e tabela ↔ cards)
- ☐ `pnpm lint` e `pnpm typecheck` limpos
