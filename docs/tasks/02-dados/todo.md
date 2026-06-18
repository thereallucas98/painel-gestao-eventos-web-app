# Fase 2 · Camada de dados — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Dependências e seed
- ☑ `pnpm add axios`
- ☑ `pnpm add -D json-server@0.17.4`
- ☑ Adicionar `db.json` na raiz (seed: 5 eventos, 65 participantes, 81 check-ins)
- ☑ Script `"api": "json-server --watch db.json --port 3001"` no `package.json`
- ☑ `.env.example` com `NEXT_PUBLIC_API_URL=http://localhost:3001`

## Tipos de domínio (`src/types/`)
- ☑ `event.ts` — `Event` (camelCase: expectedCount, checkinCount, errorCount, entryRate)
- ☑ `participant.ts` — `Participant` (eventId, checkinCount)
- ☑ `checkin.ts` — `Checkin`, `CheckinAction`, `CheckinErrorReason`
- ☑ Reaproveitar `EventStatus`/`ParticipantType`/`ParticipantStatus` de `lib/i18n-enums`

## `lib/api/`
- ☑ `dto.ts` — `EventDto`, `ParticipantDto`, `CheckinDto` (snake_case)
- ☑ `client.ts` — instância axios (baseURL via env) + interceptor → `ApiError`
- ☑ `mappers.ts` — `toEvent`, `toParticipant`, `toCheckin`
- ☑ `events.ts` — `getEvents`, `getEvent`, `updateEvent` (F5)
- ☑ `participants.ts` — `getParticipants`, `updateParticipant` (F5)
- ☑ `checkins.ts` — `getCheckins`, `createCheckin` (F5)

## Hooks (`src/hooks/`)
- ☑ `use-events.ts` — `useEvents()` key `['events']`
- ☑ `use-event.ts` — `useEvent(id)` key `['event', id]`
- ☑ `use-participants.ts` — `useParticipants(eventId)` key `['participants', eventId]`
- ☑ `use-checkins.ts` — `useCheckins(eventId)` key `['checkins', eventId]`
- ☑ Remover `.gitkeep` das pastas que passaram a ter arquivos

## Verificação (entra no `validation.md`)
- ☑ `pnpm api` sobe o seed em `:3001` (testar `GET /events`, `/participants?event_id=EVT-001`)
- ☑ `useEvents`/`useEvent` retornam tipos de domínio camelCase
- ☑ `lib/api` é a única camada que toca rede
- ☑ `pnpm lint` e `pnpm typecheck` limpos
