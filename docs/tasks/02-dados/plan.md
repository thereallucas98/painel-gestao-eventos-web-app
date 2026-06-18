# Fase 2 · Camada de dados — Plan

Abordagem consolidada. Decisões: D-003 (Opção B), E1 json-server `0.17.4`, E2 dois terminais, E3 axios, E4 DTOs+mappers, E5 `db.json` na raiz.

## 1. Dependências e scripts

- Runtime: **`axios`** (estável). Dev: **`json-server@0.17.4`**.
- `db.json` na raiz (seed do repo ThiagoLifters/api_test: 5 eventos, 65 participantes, 81 check-ins).
- Scripts:
  - `"api": "json-server --watch db.json --port 3001"`
  - `dev`/`api` rodados em terminais separados (documentar no README).
- Env: `.env.example` com `NEXT_PUBLIC_API_URL=http://localhost:3001`.

## 2. Tipos de domínio (`src/types/`, camelCase)

```ts
// event.ts
type Event = { id; name; date /* ISO string */; location; status: EventStatus;
  description; expectedCount; checkinCount; errorCount; entryRate /* 0..1 */ }
// participant.ts
type Participant = { id; eventId; name; type: ParticipantType; status: ParticipantStatus; checkinCount }
// checkin.ts
type CheckinAction = 'entry' | 'exit'
type CheckinErrorReason = 'already_checked_in' | 'event_closed'
type Checkin = { id; eventId; participantId; timestamp; success: boolean;
  action: CheckinAction; errorReason: CheckinErrorReason | null }
```
Enums `EventStatus`/`ParticipantType`/`ParticipantStatus` reaproveitados de `lib/i18n-enums`.

## 3. `lib/api/`

- **`dto.ts`** — tipos da API em `snake_case` (`EventDto`, `ParticipantDto`, `CheckinDto`).
- **`client.ts`** — instância axios única (`baseURL` via env) + interceptor de resposta que normaliza falhas em `ApiError` (mensagem + status). UI nunca toca axios direto.
- **`mappers.ts`** — `toEvent(dto)`, `toParticipant(dto)`, `toCheckin(dto)` (snake → camel).
- **`events.ts`** — `getEvents(): Promise<Event[]>`, `getEvent(id)`, `updateEvent(id, patch)` (F5).
- **`participants.ts`** — `getParticipants(eventId)`, `updateParticipant(id, patch)` (F5).
- **`checkins.ts`** — `getCheckins(eventId)`, `createCheckin(payload)` (F5).

Mutações são definidas aqui mas só exercitadas na Fase 5.

## 4. Hooks (`src/hooks/`, React Query)

- `use-events.ts` → `useEvents()` — key `['events']`.
- `use-event.ts` → `useEvent(id)` — key `['event', id]`.
- `use-participants.ts` → `useParticipants(eventId)` — key `['participants', eventId]`.
- `use-checkins.ts` → `useCheckins(eventId)` — key `['checkins', eventId]`.

Componentes consomem hooks; hooks chamam `lib/api`. (A composição do dashboard a partir das 3 queries acontece na Fase 4.)

## 5. Tratamento de erro/loading

- React Query expõe `isLoading`/`isError`; a UI (F3) decide o visual.
- `ApiError` carrega status para mensagens específicas quando útil.

## Resultado esperado

`pnpm api` sobe o seed em `:3001`; `useEvents()`/`useEvent(id)` retornam tipos de domínio camelCase; `lib/api` é a única camada que toca a rede; `lint`/`typecheck` limpos.
