# Fase 3 · Listagem — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Dependências
- ☐ `pnpm add date-fns`
- ☐ `pnpm dlx shadcn@latest add skeleton`

## Utils e hooks
- ☐ `lib/date/index.ts` — `formatEventDate(iso)` (date-fns + `ptBR`)
- ☐ `hooks/use-debounce.ts` — `useDebounce(value, 300)`
- ☐ Remover `.gitkeep` de `lib/date` e `lib/format` se aplicável

## Layout (dashboard)
- ☐ `app/(dashboard)/layout.tsx` — `AppShell` + `Sidebar` (nav: Eventos ativo; footer: `ThemeToggle`)
- ☐ Header mobile `md:hidden` (Logo + ThemeToggle)
- ☐ `main` com padding/maxwidth

## Feature events-list
- ☐ `components/events-list/parts.tsx` — `EventTable`, `EventCards`, `StatusFilter`, `SortToggle`, `ListSkeleton`, `EmptyState`, `ErrorState`
- ☐ `components/events-list/index.tsx` — composição: `useEvents`, estados (search/status/sortDir), `useDebounce`, `useMemo` filtrar+ordenar, render header + estados
- ☐ Ação "Ver" por linha/card → `next/link` `/eventos/[id]`

## Rotas
- ☐ `app/(dashboard)/eventos/page.tsx` → `<EventsList />` (remover placeholder atual)
- ☐ `app/(dashboard)/eventos/[id]/page.tsx` → placeholder (id + "em construção" + voltar)

## Verificação (entra no `validation.md`)
- ☐ 5 eventos renderizam (json-server no ar)
- ☐ Busca (debounced), filtro por status e ordenação por data funcionam
- ☐ Loading (skeleton), vazio (sem eventos / sem resultado), erro (com retry) corretos
- ☐ Responsivo: tabela (md+) ↔ cards (mobile)
- ☐ "Ver" navega ao detalhe (placeholder)
- ☐ `pnpm lint` e `pnpm typecheck` limpos
