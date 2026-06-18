# Fase 5 · Regras + Check-in — Plan

Decisões: hook `use-checkin` (domínio puro + api); botões inline + credencial-dialog (diferencial, após ler design); banner+desabilitar em evento encerrado; `entry_rate` recalculado. Persiste (Opção B).

## 1. Domínio puro — `lib/domain/checkin.ts` (testável, F7)

- `decideCheckin(event, participant, action): { allowed: boolean; errorReason?: CheckinErrorReason }`
  - `event.status !== 'active'` → `{ allowed:false, errorReason:'event_closed' }`.
  - `action='entry'` e `normal` com `checkinCount >= 1` → `already_checked_in`.
  - `action='exit'` exige `status==='inside'`.
- `availableActions(event, participant): { canEnter; canExit; blockedReason? }` — para habilitar/ocultar botões.
- `planCheckin(event, participant, action)` (puro) → `{ decision, checkin: {action,success,errorReason}, nextParticipant?, nextEvent? }`:
  - sucesso entrada: `nextParticipant {status:'inside', checkinCount+1}`; se `participant.checkinCount===0` → `nextEvent {checkinCount+1, entryRate=recalc}`.
  - sucesso saída: `nextParticipant {status:'outside', checkinCount+1}`.
  - erro de regra: `checkin.success=false`; `nextEvent {errorCount+1}`.
  - `entryRate = nextCheckinCount / expectedCount`.

## 2. Mensagens — `lib/i18n-enums.ts`

- `checkinErrorLabel`: `already_checked_in → "Participante já realizou check-in"`, `event_closed → "Evento encerrado — check-ins bloqueados"`.

## 3. Hook — `hooks/use-checkin.ts`

- `useMutation`; entrada `{ participant, action }`.
- `mutationFn`: usa `planCheckin`; chama `lib/api` → `createCheckin` (POST) + `updateParticipant`/`updateEvent` (PATCH) conforme o plano; retorna `{ outcome: 'entered'|'exited'|'blocked', errorReason? }`.
- **Otimista**: `onMutate` calcula `planCheckin` e aplica em `['participants',eventId]`/`['event',eventId]` (no caso de regra-erro só `errorCount`); snapshot; `onError` rollback; `onSettled` invalida `['participants']`/`['event']`/`['checkins']`.
- **Toasts** por `outcome` (sonner): entrou/saiu → success; bloqueado → error com `checkinErrorLabel`.
- `timestamp = new Date().toISOString()`; id do checkin: json-server gera.

## 4. UI (event-dashboard)

- **Ações por participante** (tabela e cards): botão **Check-in** (quando `outside` e evento ativo) e **Saída** (quando `inside`; na prática VIP). Desabilitados/ocultos conforme `availableActions`.
- **Banner** no topo quando `event.status !== 'active'`: "Check-ins bloqueados — evento encerrado/cancelado".
- Estado `isPending` desabilita o botão da linha em ação.
- **Credencial "cartão de embarque"** (ResponsiveDialog ao tocar no participante) — diferencial; implementar após ler o frame `1-642`.

## 5. API (Fase 2, já existe)

`createCheckin`, `updateParticipant`, `updateEvent`. Mapear o payload domínio → DTO (snake) no hook/api.

## Resultado esperado

Normal: 1 check-in OK; 2ª tentativa (ex.: Pedro Freitas, normal/outside/checkinCount 1) → erro com toast. VIP: entra/sai repetidamente. EVT-002 (closed) → banner + ações desabilitadas. Métricas/status atualizam (otimista) e persistem. `lint`/`typecheck` limpos.
