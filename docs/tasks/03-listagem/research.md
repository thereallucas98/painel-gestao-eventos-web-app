# Fase 3 · Listagem — Research

Fatos que embasam a tela. Decisões em `exploration.md`.

## Dados

- `useEvents()` retorna **todos** os eventos (5). Dataset pequeno → **busca, filtro e ordenação client-side** (sem query params no json-server).
- `Event` (domínio, camelCase): `name`, `date` (ISO), `location`, `status`, `expectedCount`, `checkinCount`, `errorCount`, `entryRate`.

## Busca com debounce

- Opções: hook próprio `useDebounce(value, delay)` (setTimeout) **ou** `useDeferredValue` do React 19. Ambos evitam recomputar a cada tecla. (escolha na exploration)
- Filtro é client-side, então "debounce" aqui é p/ suavizar render, não requisição.

## Estados

- `useQuery` expõe `isLoading` / `isError` / `data`.
- **Loading**: shadcn `skeleton` (a instalar) — linhas/cards fantasma.
- **Vazio**: distinguir **sem eventos** (lista vazia da API) de **sem resultado** (busca/filtro não casaram) — mensagens diferentes.
- **Erro**: `isError` → mensagem amigável + botão "Tentar novamente" (`refetch`).

## Data / formatação

- **`date-fns`** + locale `pt-BR` (a instalar; estável). Formato sugerido: `15 mai 2025 · 09:00`. Helper em `lib/date`.
- Ordenação por `date`: comparar timestamps (`new Date(iso).getTime()`), asc/desc.

## Filtro por status (D-012)

- shadcn `select` é popover (não vira bottom sheet no mobile por padrão).
- Opções: **(a)** controle segmentado (Todos/Ativo/Encerrado/Cancelado — 4 itens, sem overlay); **(b)** select responsivo (bottom sheet no mobile via `ResponsiveDialog`). (escolha na exploration)

## Navegação ao detalhe

- `next/link` → `/eventos/[id]`. A rota `[id]` é da **Fase 4**; para a navegação funcionar já na F3, criar um **placeholder** mínimo de `/eventos/[id]` (senão 404 até a F4). (decisão na exploration)

## Responsividade (D-006)

- `md+`: `Table` (colunas expandidas). `< md`: **cards empilhados**. Mesmo dado, dois arranjos.

## Componentes disponíveis (Fase 2.5)

`AppShell`, `Sidebar`, `PageHeader`, `SearchField`, `StatusBadge`, `IconButton`, `Table`, `Card`, `ResponsiveDialog`. Faltam instalar: `skeleton` (loading) e `date-fns`.
