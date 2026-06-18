# Fase 2.5 · UI & Componentes (a partir do Figma) — Brief

> **Instruções salvas (resistem a compactação de contexto).** Esta é a fonte para retomar a fase.

## Objetivo

Analisar frames do Figma (arquivo **Gerenciador de Contatos**, que usa o design system Plann.er) via o **Figma Dev Mode MCP** e, a partir deles, montar os **componentes primários e secundários** e a **interface** do painel — usando **shadcn/ui**.

## Diretrizes fixas

- **shadcn/ui** é a base dos componentes. Docs de referência:
  - Componentes: https://ui.shadcn.com/docs/components.md
  - Instalação: https://ui.shadcn.com/docs/installation
  - `components.json` já existe; adicionar via `pnpm dlx shadcn@latest add <componente>`.
- Tokens do tema Plann.er já configurados (vocabulário shadcn em `globals.css`).
- Convenção de componentização **plana** (`components/<nome>/index.tsx` + `parts.tsx`), ver `theme-toggle/` e D-011.
- Estilo, idioma, política de deps, etc.: ver `docs/foundation/code-standards.md`.

## Sequência de frames a analisar (preencher conforme chegam)

| # | Frame (node) | Arquivo | Status |
|---|---|---|---|
| 1 | `3106-396` | Gerenciador de Contatos | ✅ analisado (Criar conta) — ver `inventory.md` |
| 2 | `3110-759` | Gerenciador de Contatos | ✅ analisado (Acessar conta) — reusa primitivas do frame 1 |
| 3 | `3110-841` | Gerenciador de Contatos | ✅ analisado (Lista) — molde da listagem (Fase 3); kit de painel |
| 4 | `3123-801` | Gerenciador de Contatos | ✅ analisado (Lista criptografada) — estado de máscara; sem componente novo |
| 5 | `3123-2077` | Gerenciador de Contatos | ✅ analisado (Modal) — ResponsiveDialog + button secondary |
| 6 | `3123-1165` | Gerenciador de Contatos | ✅ analisado (Adicionar contato) — mesmo ResponsiveDialog; sem primitiva nova |
| 7 | `3123-1288` | Gerenciador de Contatos | ✅ analisado (Editar contato) — variante de edição; sem primitiva nova |

**Escopo de auth: (a)** — só primitivas; não construir telas de auth.

> O MCP do Figma só enxerga a **aba ativa** do Figma Desktop. Para cada frame, o arquivo correspondente precisa estar como aba ativa.

## Saída esperada da fase

- Inventário de componentes (primários: button, input, select, badge, card…; secundários: composições).
- Componentes shadcn instalados + ajustados aos tokens.
- Componentes de produto na convenção plana.
- Base pronta para a Fase 3 (listagem) consumir.

## Retomada pós-compactação

Se o contexto foi compactado: reler este arquivo + `docs/decisions.md` + `code-standards.md`. Continuar a partir do primeiro frame com status ⏳.
