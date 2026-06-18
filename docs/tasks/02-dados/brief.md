# Fase 2 · Camada de dados — Brief

## Objetivo

Montar a camada de dados que alimenta todas as telas: tipos do domínio, client de API isolado (Opção B — json-server) e hooks React Query. A UI nunca chama `fetch` direto. Nenhuma tela de produto nesta fase.

## Escopo (in)

- **Tipos** (`types/`): `Event`, `Participant`, `Checkin` e seus enums (reaproveitando os de `lib/i18n-enums`). Tipos de API em `snake_case` espelhando o payload, mapeados para o domínio.
- **json-server** (D-003): incluir `db.json` no repo (seed: 5 eventos, 65 participantes, 81 check-ins), script `pnpm api` na porta 3001, base URL via env (`NEXT_PUBLIC_API_URL`, default `http://localhost:3001`).
- **`lib/api`**: client HTTP fino (fetch + tratamento de erro tipado) e funções de acesso:
  - `getEvents()`, `getEvent(id)`
  - `getParticipants(eventId)`, `getCheckins(eventId)`
  - `createCheckin(...)`, `updateParticipant(...)`, `updateEvent(...)` (mutações usadas na Fase 5)
- **Hooks** (`hooks/`): `useEvents`, `useEvent(id)` com React Query (query keys, staleTime). Mutações ficam definidas mas exercitadas na Fase 5.

## Fora de escopo (out)

- Busca/filtro/ordenação e estados visuais → **Fase 3**.
- Componentes de UI (lista, cards, tabela, dashboard) → **Fases 3–4**.
- Regras de negócio (VIP/Normal/encerrado) e lógica de check-in → **Fase 5**.
- Debounce de busca → **Fase 3**.

## Definição de pronto (resumo — detalhe em `validation.md`)

- `pnpm api` sobe o json-server com o seed em `:3001`.
- `getEvents()`/`getEvent(id)` retornam dados tipados; hooks consultam o json-server.
- `lib/api` é a única camada que toca a rede; tipos de API mapeados para o domínio.
- `lint` e `typecheck` limpos.

## Referências

- Contrato e endpoints: PDF seções 5 (Opção B) e estrutura de dados; decisão D-003 em [`docs/decisions.md`](../../decisions.md).
- Enums/labels já criados em `src/lib/i18n-enums.ts`.
