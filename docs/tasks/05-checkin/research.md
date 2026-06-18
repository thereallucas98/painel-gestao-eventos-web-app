# Fase 5 · Regras + Check-in — Research

Fatos e modelagem. Decisões em `exploration.md`.

## Semântica dos agregados (inferida do seed)

- EVT-001: `expected 12`, `checkin_count 11`, `entry_rate 0.92` → **`entry_rate = checkin_count / expected_count`**, e `checkin_count` = nº de **participantes que entraram ao menos uma vez** (presença), não o nº de registros de check-in (há 19 registros).
- `participant.checkin_count` = nº de **ações** do participante (entradas + saídas) — VIPs têm `>1`, alternando entry/exit.
- `error_count` = nº de tentativas com falha.

## Modelo das regras (`lib/domain`, puro)

`decideCheckin(event, participant, action)` → `{ allowed, errorReason? }`:
- `event.status !== 'active'` → bloqueado (`event_closed`). _(closed e cancelled bloqueiam.)_
- `action === 'entry'`:
  - `normal` e já entrou (`checkinCount >= 1`) → erro `already_checked_in`.
  - senão → permitido.
- `action === 'exit'`: permitido só p/ quem está `inside` (na prática, VIP).

## Efeitos por resultado (persistência — Opção B)

| Caso | checkins (POST) | participant (PATCH) | event (PATCH) |
|---|---|---|---|
| Entrada OK (1ª vez do participante) | success, action=entry | status=inside, checkin_count+1 | checkin_count+1, entry_rate recalc |
| Entrada OK (VIP reentrando, já contado) | success, action=entry | status=inside, checkin_count+1 | — (já presente) |
| Saída VIP | success, action=exit | status=outside, checkin_count+1 | — |
| Erro (normal 2ª / encerrado) | success=false, error_reason | — | error_count+1 |

- "1ª vez" = `participant.checkinCount === 0` no momento da entrada (reentrada de VIP que saiu tem `checkinCount > 0` → não recontar presença).
- `timestamp` = `new Date().toISOString()` na ação. `id` do check-in: deixar o json-server gerar (POST sem id).

## Mutação otimista (React Query)

- `useMutation` com `onMutate` (cancelQueries + snapshot + `setQueryData` otimista em `['participants', eventId]` e `['event', eventId]`), `onError` (rollback do snapshot), `onSettled` (invalidate `['participants']`/`['event']`/`['checkins']`).
- A `mutationFn` orquestra POST checkin + PATCH(s) via `lib/api`. Erros de **regra** não são exceções de rede: a decisão é tomada antes; o "erro de negócio" grava um checkin `success=false` e atualiza `error_count` (não faz rollback — é um resultado válido).

## Feedback (toasts `sonner`)

- Sucesso entrada/saída → `toast.success`. Erro de regra (`already_checked_in`) → `toast.error` com mensagem amigável. Evento encerrado → ação **desabilitada** + motivo (sem toast, ou toast informativo ao tentar).

## UI

- Ações na linha/credencial do participante. Botão "Check-in" (entrada) e "Saída" (VIP inside). Desabilitar conforme `decideCheckin`. Credencial "cartão de embarque" no `ResponsiveDialog` (diferencial; design a ler).
- Mensagens via `lib/i18n-enums` / mapa de `errorReason` → texto PT.
