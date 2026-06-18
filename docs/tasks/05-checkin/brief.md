# Fase 5 · Regras de negócio + Check-in — Brief

## Objetivo

Implementar as **regras de negócio** e as **interações de check-in/saída** no dashboard do evento, com feedback claro e atualização consistente do estado (Opção B — persiste via POST/PATCH). É a fase de maior peso (Funcionalidade 30%).

## Regras (PDF §3) — em `lib/domain` (funções puras, testáveis)

- **Evento `closed`/`cancelled`**: bloqueia qualquer entrada (motivo `event_closed`).
- **VIP**: entra e sai múltiplas vezes; cada entrada/saída registrada no histórico.
- **Normal**: apenas **um** check-in; nova tentativa → erro `already_checked_in`.
- Resultado de uma ação = `{ allowed, action, errorReason? }` (decisão pura, sem efeito).

## Interações (PDF §4)

- **Check-in (entrada)** para participante `outside` (regras acima).
- **Saída (exit)** para **VIP** `inside`.
- Botões habilitam/desabilitam conforme a regra; ação bloqueada mostra o **motivo**.
- **Feedback por ação** (toasts `sonner`):
  - VIP/Normal sucesso → "entrada registrada", status → `inside`.
  - Normal 2ª vez → erro "participante já realizou check-in".
  - Evento encerrado → ação desabilitada + motivo.
  - Saída VIP → status → `outside`, pode entrar de novo.

## Estado e persistência (Opção B)

- `createCheckin` (POST) + `updateParticipant` (PATCH status/checkin_count) + `updateEvent` (PATCH checkin_count/error_count/entry_rate).
- **Mutação otimista** (React Query) com rollback em erro; invalidar `['event']`/`['participants']`/`['checkins']`.

## UI — credencial do participante (diferencial, ideia guardada)

- Tocar num participante abre um `ResponsiveDialog` com um **"cartão de embarque"** (credencial estilo boarding pass) + ações de check-in/saída. Design a ler do Figma "Cartão de Embarque" (node `1-642`) quando for a aba ativa; mapeia nome/evento/data/local/tipo(VIP=classe)/status/id. Sem assento/portão/QR real (mock/omitir).

## Fora de escopo (out)

- Testes automatizados → **Fase 7** (mas `lib/domain` já fica pronto para testar).

## Definição de pronto (resumo — detalhe em `validation.md`)

- Normal só faz 1 check-in (2ª → erro); VIP entra/sai repetidamente; evento encerrado bloqueia.
- Métricas e status do participante atualizam após cada ação; feedback correto por caso.
- `lint`/`typecheck` limpos.

## Referências

- Regras/feedback: PDF §3 e §4. Endpoints/mutações: Fase 2 (`lib/api`). Enums em `lib/i18n-enums`.
