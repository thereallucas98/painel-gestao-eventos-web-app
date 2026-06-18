# Fase 1 · Scaffold — Research

Fatos que embasam o scaffold. Sem decisões (essas vão em `exploration.md`).

## Versões atuais (npm, jun/2026)

| Pacote | Versão | Uso |
|---|---|---|
| next | 16.2.9 | framework (App Router) |
| react / react-dom | 19.2.7 | runtime |
| tailwindcss / @tailwindcss/postcss | 4.3.1 | estilos (v4) |
| @tanstack/react-query | 5.101.0 | dados (Fase 2, provider na Fase 1) |
| sonner | 2.0.7 | toasts |
| class-variance-authority | 0.7.1 | variantes de componente |
| tailwind-merge | 3.6.0 | `cn()` |
| clsx | 2.1.1 | `cn()` |
| lucide-react | 1.21.0 | ícones |
| next-themes | 0.4.6 | tema (se houver toggle) |
| recharts | 3.8.1 | gráfico (Fase 4 — só registrado) |
| zod | 4.4.3 | validação de dados (Fase 2) |

## Tailwind v4 — mecânica

- Config **CSS-first**: tokens declarados em `@theme { --color-...: ... }` dentro do CSS; `tailwind.config.js` é opcional (não obrigatório como no v3).
- PostCSS via plugin `@tailwindcss/postcss` em `postcss.config.mjs`. Sem `autoprefixer`/`postcss-import` manuais (embutidos).
- Import único no CSS: `@import "tailwindcss";`.
- Variáveis viram utilitários automaticamente (ex.: `--color-brand` → `bg-brand`, `text-brand`).

## Tokens do style guide Plann.er (do Figma)

Cores:
```
background/primary   #111111      content/primary    #ffffff
background/secondary #1b1b1b      content/body       #e2e2e2
background/tertiary  #303030      content/heading    #c6c6c6
border/primary       #303030      content/muted      #5e5e5e   (→ estado "encerrado")
accent/brand (lime)  #c4f120      content/placeholder#777777
accent/red           #e61e32      content/inverse    #111111
```
Tipografia: **Schibsted Grotesk**. Escala: text 10/12/14 (regular, lineHeight 14/20/22), label 12/14 (semibold). Heading ~24.
Fonte carregável via `next/font/google` (`Schibsted_Grotesk`).

## App Router — montagem

- **React Query** exige provider em **Client Component** (`"use client"`): criar `providers/query-provider.tsx` com `QueryClient` em `useState` e envolver `children` no `app/layout.tsx`.
- **sonner**: `<Toaster />` montado no layout (client). Tema dark via prop.
- Layout raiz aplica `className` da fonte, `lang`, e fundo `background/primary`.

## create-next-app

- `create-next-app@latest` scaffolda Next 16 + React 19 + **Tailwind v4 por padrão**, com opção de `src/`, App Router, TypeScript e ESLint via flags (`--ts --app --src-dir --eslint --tailwind --use-npm`).
- Gera `postcss.config.mjs` e `app/globals.css` com `@import "tailwindcss"` — ponto de entrada para os `@theme`.

## shadcn/ui — considerações factuais

- shadcn é **copy-in** (componentes vão para `components/ui`), depende de `cn()`, Radix, CVA — compatível com Tailwind v4 e React 19.
- Pode ser inicializado via CLI (`shadcn init`) ou montado manualmente. (Escolha em `exploration.md`.)

## Referência de convenções

- Turnora confirma o conjunto (Next 16 / React 19 / Tailwind 4 / shadcn / React Query + Zustand / Vitest) como stack já exercitada — base segura para reaproveitar configs ESLint/Prettier/tsconfig.
