# Fase 4 · Dashboard — Research

Fatos que embasam a tela. Decisões em `exploration.md`.

## Bibliotecas de gráfico (estáveis, sem beta)

| Lib | Versão estável | Notas |
|---|---|---|
| **recharts** | 3.8.1 | Madura, React 19 ok, base do wrapper `chart` do shadcn; declarativa (Area/Line/Pie) |
| chart.js + react-chartjs-2 | estável | Canvas; menos "React-declarativo" |
| visx | estável | Baixo nível (D3); poderoso, mais verboso |
| nivo / tremor | estáveis | Mais opinativos/pesados |

- **recharts** exige client (`'use client'` + `ResponsiveContainer`). Render client-side.
- shadcn tem `chart` (wrapper sobre recharts) — opcional. (Escolha lib + wrapper na exploration.)

## Métricas (do agregado do evento)

- `expectedCount`, `checkinCount`, `errorCount` diretos; **Taxa de Entrada** = `entryRate * 100` (vem 0..1).
- Edge: EVT-004 (cancelled) → `checkinCount = 0`, `entryRate = 0` (cards devem exibir zeros, sem quebrar).

## Derivação dos gráficos (a partir de `checkins`)

- **Evolução de entradas no tempo**: filtrar `action === 'entry' && success`, ordenar por `timestamp`, acumular contagem (bucket por hora ou ponto por check-in) → Area/Line.
- **Sucesso × erro**: contar `success === true` vs `success === false` (ou `errorReason != null`) → Pie/Donut.
- EVT-001 tem 19 check-ins ao longo de um dia (dados suficientes p/ a série).

## Composição das 3 queries

- `useEvent(id)` + `useParticipants(id)` + `useCheckins(id)` (Fase 2). Combinar `isLoading`/`isError` dos três.
- **Evento inexistente**: `getEvent` em id inválido → json-server 404 → `ApiError(status: 404)` → `useEvent.isError`. Tratar como "não encontrado" (UI client) ou `notFound()`. (Escolha na exploration: página client com estado not-found vs server prefetch + `notFound()`.)

## Participantes

- `useParticipants(id)` → `Participant[]`. Renderizar nome, **tipo** e **status** via `participantTypeLabel`/`participantStatusLabel` (já em `lib/i18n-enums`).
- `status` inside/outside → indicador visual (badge/ponto). VIP pode ter `checkinCount > 1`.

## Componentes a criar

`MetricCard` (rótulo + valor + ícone/acento), gráfico(s), `ParticipantTable`/cards. Reusar `Card`, `StatusBadge` (evento), `ContentLabel`, `PageHeader`.
