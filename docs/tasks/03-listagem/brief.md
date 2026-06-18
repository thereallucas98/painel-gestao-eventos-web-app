# Fase 3 · Listagem de eventos — Brief

## Objetivo

Construir a tela principal: listagem de eventos consumindo `useEvents`, com busca, filtro, ordenação, estados e navegação ao detalhe — montada sobre o kit da Fase 2.5 (`AppShell`/`Sidebar`/`PageHeader`) e responsiva (desktop tabela, mobile cards).

## Escopo (in)

- **Layout `(dashboard)`**: `app/(dashboard)/layout.tsx` com `AppShell` + `Sidebar` (nav: Eventos ativo + `ThemeToggle`).
- **Header**: `PageHeader` "Eventos" com `SearchField` (busca por nome, **debounce**), **filtro por status** (seletor — bottom sheet no mobile, D-012) e **ordenação por data** (asc/desc).
- **Lista**:
  - Desktop: `Table` — colunas **Nome · Data · Local · Status · Participantes esperados · ação "Ver"**.
  - Mobile: **cards empilhados** com os mesmos dados + ação.
  - `StatusBadge` no status; data formatada (`date-fns`, `lib/date`); contagem de participantes esperados.
- **Estados obrigatórios**:
  - **Loading**: skeleton da lista.
  - **Vazio**: sem eventos / sem resultado para a busca-filtro (mensagens distintas).
  - **Erro**: falha na requisição, com ação de **tentar novamente**.
- **Navegação**: clique/ação → `/eventos/[id]`.

## Fora de escopo (out)

- Detalhe/dashboard do evento → **Fase 4**.
- Regras de negócio e check-in → **Fase 5**.
- Testes automatizados → **Fase 7**.
- Criar/editar/excluir eventos (o enunciado não pede; painel é read-mostly).

## Definição de pronto (resumo — detalhe em `validation.md`)

- Lista renderiza os 5 eventos do json-server; busca, filtro e ordenação funcionam (client-side).
- Loading, vazio e erro aparecem nas condições corretas; erro permite retry.
- Responsivo (tabela ↔ cards); navega ao detalhe.
- `lint` e `typecheck` limpos.

## Referências

- Requisitos: PDF §2.1. Estilo/tokens: D-001. Responsividade: D-006. Seletores: D-012.
- Hooks/tipos: `useEvents` e `Event` (Fase 2). Kit: `docs/tasks/02.5-ui-figma/inventory.md`.
