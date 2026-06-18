# Fase 1 · Scaffold — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Init
- ☑ `pnpm create next-app@latest . --ts --app --src-dir --eslint --use-pnpm`
- ☑ Confirmar Tailwind v4 instalado (`@tailwindcss/postcss`, `postcss.config.mjs`)
- ☑ Limpar boilerplate (page inicial, css de exemplo, assets demo)

## Dependências
- ☑ UI base: `clsx tailwind-merge class-variance-authority lucide-react sonner next-themes`
- ☑ Animação: `motion tailwindcss-animate` (D-010)
- ☑ Dados: `@tanstack/react-query`
- ☑ `pnpm dlx shadcn@latest init` (gera `components.json`, `lib/utils.ts` com `cn()`)

## Tokens e estilo
- ☑ `globals.css`: `@import "tailwindcss"`
- ☑ Variáveis light em `:root` + dark em `.dark` (valores do `plan.md` §2)
- ☑ `@theme inline` mapeando utilitários (`bg-surface*`, `text-content*`, `border-border`, `bg-brand`, `text-brand-strong`, `*-danger`)
- ☑ Fonte `Schibsted_Grotesk` via `next/font/google` + variável no `<body>`

## Providers e layout
- ☑ `providers/theme-provider.tsx` (next-themes, `attribute="class"`, `defaultTheme="dark"`, `enableSystem`)
- ☑ `providers/query-provider.tsx` (`"use client"`, `QueryClient` em `useState`)
- ☑ `app/layout.tsx`: `lang="pt-BR"`, fonte, ThemeProvider → QueryProvider → children + `<Toaster richColors />`
- ☑ `components/features/theme-toggle.tsx` (sun/moon lucide)

## Estrutura
- ☑ `app/page.tsx` → redirect `/eventos`
- ☑ `app/(dashboard)/eventos/page.tsx` → placeholder "em construção" (usa tokens + toggle visível)
- ☑ Pastas com `.gitkeep`: `hooks`, `lib/{api,domain,format,date}`, `types`
- ☑ `lib/i18n-enums.ts` stub (tipos `EventStatus`/`ParticipantType`/`ParticipantStatus` + mapas vazios tipados)

## Configs
- ☑ tsconfig: `strict`, paths `@/*`
- ☑ ESLint/Prettier alinhados ao Turnora
- ☑ Scripts em `package.json`: `dev build start lint typecheck format`

## Verificação (entra no `validation.md`)
- ☑ `pnpm dev` sobe sem erro; `/` redireciona p/ `/eventos`
- ☑ Placeholder renderiza com tema dark + tokens; toggle alterna dark/light
- ☑ `pnpm lint` e `pnpm typecheck` limpos
