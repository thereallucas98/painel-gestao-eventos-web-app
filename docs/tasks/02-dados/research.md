# Fase 2 · Camada de dados — Research

Fatos que embasam a camada de dados. Decisões em `exploration.md`.

## json-server — versões

- `latest` no npm = **`1.0.0-beta.15`** (v1). Não há release estável "1.0.0"; a v1 só existe como beta.
- Última estável da linha antiga = **`0.17.4`** (v0).
- **CLI mudou entre as linhas:**
  - v0: `json-server --watch db.json --port 3001` (sintaxe do PDF).
  - v1: `json-server db.json --port 3001` (watch é padrão; `--watch` não existe).
- Ambas servem `/events`, `/participants`, `/checkins`, suportam filtro por campo (`?event_id=`) e `GET/POST/PATCH`.
- Escolha de versão (e impacto no script `pnpm api`) → `exploration.md`.

## Forma dos dados (`db.json` — seed do repo ThiagoLifters/api_test)

Top-level: `events`, `participants`, `checkins`. Contagens: 5 / 65 / 81.

```jsonc
// event
{ id, name, date /* ISO c/ offset -03:00 */, location, status: "active"|"closed"|"cancelled",
  description, expected_count, checkin_count, error_count, entry_rate /* 0..1 */ }

// participant
{ id, event_id, name, type: "vip"|"normal", status: "inside"|"outside", checkin_count }

// checkin
{ id, event_id, participant_id, timestamp /* ISO UTC */, success: bool,
  action: "entry"|"exit", error_reason: null|"already_checked_in"|"event_closed" }
```

## Endpoints (Opção B) e comportamento

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/events` | lista (array flat) |
| GET | `/events/:id` | **evento flat** (sem participants/checkins aninhados) |
| GET | `/participants?event_id=EVT-001` | participantes do evento |
| GET | `/checkins?event_id=EVT-001` | histórico do evento |
| POST | `/checkins` | registra check-in (F5) |
| PATCH | `/participants/:id` | atualiza status/checkin_count (F5) |
| PATCH | `/events/:id` | atualiza métricas (F5) |

**Diferença-chave vs Opção A:** aqui o detalhe **não vem aninhado**. A tela de evento compõe a partir de 3 requisições: `getEvent(id)` + `getParticipants(id)` + `getCheckins(id)`.

## Mapeamento e tipos

- Payload é `snake_case`; o domínio interno usa `camelCase`. O mapeamento acontece **só** em `lib/api` (fronteira). Tipos de API (`*Dto`, snake_case) ≠ tipos de domínio (camelCase).
- Enums já tipados em `src/lib/i18n-enums.ts` — reaproveitar.

## React Query

- Query keys: `['events']`, `['event', id]`, `['participants', eventId]`, `['checkins', eventId]`.
- `staleTime` já definido no provider (30s); mutações (F5) invalidam as keys afetadas.

## Ambiente

- Base URL via `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`). Documentar em `.env.example`.
- json-server roda em paralelo ao Next; rodar os dois juntos → opção em `exploration.md`.
