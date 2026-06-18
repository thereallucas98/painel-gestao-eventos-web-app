# Fase 3 · Listagem — Plan

Decisões: E1 `useDebounce(300)`, E2 filtro segmentado, E3 placeholder de detalhe, E4 ordenação toggle (default desc). Client-side.

## 1. Dependências

- `pnpm add date-fns` (estável) — formatação de data com locale pt-BR.
- `pnpm dlx shadcn@latest add skeleton` — loading.

## 2. Utilitários e hooks

- `lib/date/index.ts` → `formatEventDate(iso)` = `15 mai 2025 · 09:00` (date-fns + `ptBR`).
- `hooks/use-debounce.ts` → `useDebounce<T>(value, delay = 300)`.

## 3. Layout `(dashboard)`

- `app/(dashboard)/layout.tsx`: `AppShell` + `Sidebar`
  - nav: `IconButton` ativo "Eventos" (ícone) → `/eventos`.
  - footer: `ThemeToggle`.
  - **Mobile**: header `md:hidden` com `Logo` + `ThemeToggle` (sidebar é desktop-only).
  - `main` com padding e largura máxima.

## 4. Feature `components/events-list/` (convenção plana)

- **`index.tsx`** (composição, `'use client'`):
  - `useEvents()`; estados locais `search`, `status` (`'all' | EventStatus`), `sortDir` (`'asc'|'desc'`).
  - `useDebounce(search)`; `useMemo` → filtrar (nome inclui busca + status) e ordenar por `date`.
  - Renderiza `PageHeader` "Eventos" com ações (`SearchField`, `StatusFilter`, `SortToggle`) + conteúdo conforme estado.
  - Estados: `isLoading` → `ListSkeleton`; `isError` → `ErrorState` (com `refetch`); lista vazia da API → `EmptyState` "sem eventos"; sem match → `EmptyState` "nenhum resultado" (+ limpar filtros).
- **`parts.tsx`** (puros):
  - `EventTable` (desktop, `md:` ) — colunas Nome · Data · Local · `StatusBadge` · Participantes esperados · ação "Ver".
  - `EventCards` (mobile, `< md`) — card por evento com os mesmos dados + "Ver".
  - `StatusFilter` (segmentado: Todos/Ativo/Encerrado/Cancelado, via `i18n-enums`).
  - `SortToggle` (botão asc/desc por data).
  - `ListSkeleton`, `EmptyState`, `ErrorState`.
- Cada linha/card: ação **"Ver"** = `next/link` → `/eventos/[id]`.

## 5. Página e rota

- `app/(dashboard)/eventos/page.tsx`: renderiza `<EventsList />` (remove placeholder atual).
- `app/(dashboard)/eventos/[id]/page.tsx`: **placeholder** — mostra o id + "Detalhe em construção (Fase 4)" + link voltar.

## 6. Comportamento

- Busca: case-insensitive em `name` (debounced).
- Filtro: por `status` (segmentado).
- Ordenação: por `date` (timestamp), toggle asc/desc, default **desc**.
- Tudo client-side sobre o resultado de `useEvents`.

## Resultado esperado

5 eventos renderizam; busca/filtro/ordenação funcionam; loading/vazio/erro corretos (erro com retry); responsivo (tabela ↔ cards); "Ver" navega ao placeholder de detalhe; `lint`/`typecheck` limpos.
