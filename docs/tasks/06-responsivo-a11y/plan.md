# Fase 6 · Responsividade + A11y — Plan

Decisões: classe de foco compartilhada; `aria-label` na busca; `aria-pressed` no filtro; QA responsivo manual. Ajustes pontuais, sem reescrita.

## 1. Padrão de foco visível

- Constante `focusRing` em `lib/utils.ts` (ou inline) =
  `focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Aplicar via `cn()` em:
  - `components/sidebar-nav.tsx` (links de nav).
  - `components/event-dashboard/parts.tsx` → botão do card de participante (`<button>`).
  - `components/events-list/parts.tsx` → botões do `StatusFilter`.

## 2. SearchField — nome acessível

- `components/search-field.tsx`: aplicar `aria-label` no `Input` com default `'Buscar'`, permitindo sobrescrever via prop. Ícone de busca já é decorativo (`pointer-events-none`).

## 3. StatusFilter — semântica

- `components/events-list/parts.tsx`: cada botão do filtro recebe `aria-pressed={value === opt.value}` + o foco visível (item 1).

## 4. Verificação responsiva (QA, sem código novo)

- Conferir nos 3 tamanhos: listagem (tabela↔cards), header da listagem empilhando, métricas (2→4 col), gráficos (empilham até `lg`), participantes (scroll + alvos de toque), credencial (modal↔bottom sheet), configurações (grid).
- Corrigir só se aparecer quebra/overflow real.

## Resultado esperado

Foco visível consistente (ring laranja) nos elementos interativos; busca com nome acessível; filtro comunicando estado (`aria-pressed`); telas sem quebra nos 3 tamanhos. `lint`/`typecheck` limpos.
