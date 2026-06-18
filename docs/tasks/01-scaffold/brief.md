# Fase 1 · Scaffold — Brief

## Objetivo

Estabelecer o esqueleto técnico do app: Next.js (App Router) + TypeScript + Tailwind v4, tema dark com os tokens do style guide Plann.er, base do shadcn/ui e provider de dados — pronto para receber features nas fases seguintes. Nenhuma regra de negócio ou tela de produto nesta fase.

## Escopo (in)

- Inicializar **app único** Next.js (App Router, TypeScript, ESLint, diretório `src/`).
- **Tailwind v4** + PostCSS; `globals.css` com os tokens Plann.er como CSS variables (cores `background/content/border`, `accent/brand` lime, `accent/red`) e fonte Schibsted Grotesk.
- **Tema dark** como base do app.
- Utilitário `cn()` (clsx + tailwind-merge) e dependências base de UI (shadcn/Radix conforme necessário, `class-variance-authority`, `lucide-react`, `sonner`).
- **Provider do React Query** e layout raiz montando providers + `Toaster` (sonner).
- **Estrutura de pastas** conforme [CLAUDE.md §4](../../../CLAUDE.md): `components/ui`, `components/features`, `hooks`, `lib/{api,domain,format,date}`, `lib/i18n-enums.ts`, `providers`, `types` — com placeholders mínimos.
- **Configs** ESLint/Prettier/tsconfig adaptadas das convenções do Turnora.
- **Rota mínima** que comprova o app subir (placeholder em `/eventos` ou redirect da raiz).

## Fora de escopo (out)

- Tipos de domínio, `lib/api` real e hooks de dados → **Fase 2**.
- Setup do json-server e `db.json` → **Fase 2**.
- Listagem, busca, filtro, ordenação, estados loading/vazio/erro → **Fase 3**.
- Dashboard, métricas, gráfico, tabela de participantes → **Fase 4**.
- Regras de negócio e check-in → **Fase 5**.
- Testes automatizados → **Fase 7**.

## Definição de pronto (resumo — detalhe em `validation.md`)

- `dev` sobe sem erros e renderiza a rota placeholder com tema dark e tokens aplicados.
- `lint` e `typecheck` limpos.
- Estrutura de pastas criada conforme CLAUDE.md.

## Referências

- Decisões D-001 (style guide), D-002 (base/app único) em [`docs/decisions.md`](../../decisions.md).
- Convenções de código em [`docs/foundation/code-standards.md`](../../foundation/code-standards.md).
