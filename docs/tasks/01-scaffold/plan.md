# Fase 1 · Scaffold — Plan

Abordagem consolidada. Decisões: D-001, D-002, D-006, D-007 (pnpm), D-008 (toggle + paleta light derivada).

## 1. Inicialização

- `pnpm create next-app@latest . --ts --app --src-dir --eslint --use-pnpm` (Tailwind v4 incluso por padrão).
- Node ≥ 18; `dev` na porta 3000 (json-server usará 3001 na Fase 2).

## 2. Tokens (Tailwind v4, CSS-first + theme-reactive)

Em `src/app/globals.css`: variáveis semânticas em `:root` (light) e `.dark` (dark), expostas como utilitários via `@theme inline`.

**Dark (Plann.er):**
```
surface #111111 · surface-2 #1b1b1b · surface-3 #303030 · border #303030
content #ffffff · content-body #e2e2e2 · content-heading #c6c6c6
content-muted #5e5e5e · content-placeholder #777777
brand #c4f120 · brand-strong #c4f120 · danger #e61e32
```
**Light (derivada, D-008):**
```
surface #ffffff · surface-2 #f4f4f5 · surface-3 #e8e8ea · border #e2e2e5
content #111111 · content-body #3f3f46 · content-heading #52525b
content-muted #71717a · content-placeholder #a1a1aa
brand #c4f120 (só preenchimento + texto escuro) · brand-strong #5c7a0a · danger #e61e32
```
**Vocabulário:** usar os nomes de token do **shadcn** (`background/foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`) populados com os valores Plann.er — assim os componentes shadcn funcionam sem fricção. Extras de negócio: `brand` (lime) e `brand-strong`.
**Mapa:** `primary` = lime (texto `primary-foreground` = `#111`); `destructive` = red; `muted-foreground` = estado "encerrado". `card` = surface secundária.
**Regra de uso do lime:** preenchimento = `primary`/`brand` (texto escuro por cima); texto/ícone/borda de sucesso = `brand-strong` no light (no dark colapsa pro lime).

## 3. Tema (next-themes)

- `ThemeProvider` (next-themes, `attribute="class"`, `defaultTheme="dark"`, `enableSystem`).
- Toggle em `components/features/theme-toggle.tsx` (ícones lucide sun/moon) — montado no header base.

## 4. Fonte

- `Schibsted_Grotesk` via `next/font/google` no layout; variável CSS aplicada no `<body>`.

## 5. Dependências

- Base UI: `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `sonner`, `next-themes`.
- Animação (D-010): `motion` + `tailwindcss-animate` (plugin via `@plugin "tailwindcss-animate"` no CSS v4). Hook `use-reduced-motion` aplicado nas animações.
- shadcn via CLI (`pnpm dlx shadcn@latest init`) — `components.json`, `cn()` em `lib/utils.ts`; primitivas adicionadas sob demanda nas próximas fases.
- Dados: `@tanstack/react-query` (provider já nesta fase; hooks na F2).
- `vaul` (ResponsiveDialog) **adiado** para F4/5.

## 6. Providers e layout

- `providers/query-provider.tsx` (`"use client"`, `QueryClient` em `useState`).
- `app/layout.tsx`: html `lang="pt-BR"`, classe da fonte, `ThemeProvider` → `QueryProvider` → `children` + `<Toaster richColors />`.

## 7. Estrutura de pastas (placeholders mínimos)

```
src/
  app/layout.tsx · app/globals.css
  app/(dashboard)/eventos/page.tsx        # placeholder "em construção"
  app/page.tsx                            # redirect → /eventos
  components/ui/                           # (shadcn popula)
  components/features/theme-toggle.tsx
  hooks/.gitkeep
  lib/utils.ts (cn)
  lib/api/.gitkeep · lib/domain/.gitkeep · lib/format/.gitkeep · lib/date/.gitkeep
  lib/i18n-enums.ts                        # stub com mapas vazios + tipos
  providers/query-provider.tsx · providers/theme-provider.tsx
  types/.gitkeep
```

## 8. Configs

- ESLint/Prettier/tsconfig adaptados das convenções do Turnora (strict, paths `@/*`).
- `package.json` scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`.

## 9. Responsividade (D-006)

- Mobile-first; breakpoints default `md` (768) / `lg` (1024).
- Padrão `ResponsiveDialog` (bottom sheet mobile / modal desktop) **documentado**, implementado na F4/5.

## Resultado esperado

`pnpm dev` sobe, `/` redireciona para `/eventos` (placeholder), tema dark por padrão com toggle funcional, tokens aplicados, `pnpm lint` e `pnpm typecheck` limpos.
