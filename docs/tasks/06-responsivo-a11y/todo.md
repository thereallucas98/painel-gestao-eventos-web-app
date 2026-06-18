# Fase 6 · Responsividade + A11y — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Foco visível
- ☐ Definir `focusRing` (constante) em `lib/utils.ts`
- ☐ Aplicar em `sidebar-nav.tsx` (links de nav)
- ☐ Aplicar no botão do card de participante (`event-dashboard/parts.tsx`)
- ☐ Aplicar nos botões do `StatusFilter` (`events-list/parts.tsx`)

## Busca
- ☐ `search-field.tsx`: `aria-label` no Input (default "Buscar", sobrescrevível)

## Filtro
- ☐ `StatusFilter`: `aria-pressed={value === opt.value}` em cada botão

## Verificação responsiva (manual — entra no `validation.md`)
- ☐ Listagem: tabela↔cards, header empilha no mobile
- ☐ Dashboard: métricas 2→4 col, gráficos empilham até `lg`, participantes (scroll/alvos)
- ☐ Credencial: modal↔bottom sheet; Configurações: grid
- ☐ Corrigir overflow/quebra se houver

## Qualidade
- ☐ `pnpm lint` e `pnpm typecheck` limpos
- ☐ (Opcional) checar teclado: Tab percorre busca → filtro → ordenar → linhas; foco visível
