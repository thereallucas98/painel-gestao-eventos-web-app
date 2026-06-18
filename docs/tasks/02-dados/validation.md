# Fase 2 · Camada de dados — Validation

Critérios de pronto e roteiro de QA. QA conduzido **um passo por vez**, sob demanda.

## Critérios de pronto (DoD)

- [ ] `pnpm api` sobe o json-server com o seed em `:3001`.
- [ ] `GET /events` → 5 eventos; `GET /events/EVT-001` → evento flat.
- [ ] `GET /participants?event_id=EVT-001` → 12; `GET /checkins?event_id=EVT-001` → 19.
- [ ] Tipos de domínio camelCase em `types/`; DTOs snake em `lib/api/dto.ts`; mappers cobrem os 3.
- [ ] `lib/api` é a única camada que importa axios/toca rede.
- [ ] Hooks (`useEvents`/`useEvent`/`useParticipants`/`useCheckins`) com keys corretas.
- [ ] `.env.example` presente; client lê `NEXT_PUBLIC_API_URL` com fallback.
- [ ] `pnpm lint` e `pnpm typecheck` limpos.

## Roteiro de QA (passo a passo)

1. **Subir a API** — `pnpm api`. Esperado: json-server em `http://localhost:3001`, lista os recursos `events/participants/checkins`.
2. **Lista de eventos** — abrir `http://localhost:3001/events`. Esperado: array com 5 eventos, campos snake_case (`checkin_count`, `entry_rate`…).
3. **Detalhe flat** — `http://localhost:3001/events/EVT-001`. Esperado: 1 evento, **sem** `participants`/`checkins` aninhados.
4. **Relacionamentos** — `/participants?event_id=EVT-001` (12 itens) e `/checkins?event_id=EVT-001` (19 itens).
5. **Edge case encerrado** — `/events/EVT-002` tem `status: "closed"`; `/events/EVT-004` tem `status: "cancelled"`, `checkin_count: 0`, `entry_rate: 0`.
6. **Compilação/tipos** — `pnpm typecheck` e `pnpm lint`. Esperado: limpos (valida mappers e tipos de domínio).

> A confirmação **visual** de que os hooks entregam dados mapeados (camelCase) acontece na Fase 3, quando a listagem renderiza. Aqui a garantia é via endpoints + compilação dos tipos/mappers.

## Observações

- Mutações (`createCheckin`/`updateParticipant`/`updateEvent`) existem mas não são exercitadas nesta fase (Fase 5).
- Sem testes automatizados aqui (Fase 7).
