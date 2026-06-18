# Fase 2.5 · Inventário de componentes (por frame)

Componentes extraídos dos frames do Figma, com specs e mapeamento para shadcn. Tokens batem com `globals.css`.

## Frame 1 · `3106-396` — Criar conta (Cadastro / auth)

### Primárias (primitivas)
| Componente | Specs | shadcn |
|---|---|---|
| **Button** (primary/lime) | bg `accent/brand`; texto `content/inverse #111` Schibsted SemiBold 14/22; `rounded-12`, `p-12`, `gap-4`; ícone opcional | `button` (ajustar variante default p/ lime + `rounded-xl`) |
| **Input** | bg `background/secondary`; borda `border/primary`; `rounded-8`, `h~39`, `p-12`; placeholder `text/small #777` | `input` |
| **Label** | Schibsted SemiBold 14/22, `content/primary` | `label` |
| **TextField** (composição) | Label + Input, `gap-4` | wrapper `field` (Label+Input) |

### Secundárias / específicas de auth
| Componente | Specs |
|---|---|
| **ValidationItem** | ícone 16px (X vermelho = inválido / check lime = válido) + texto Regular 14/20 `content/body` |
| **Brand/Logo "GUARD"** | ícone SVG + wordmark **Sora ExtraBold** 24 uppercase (fonte de marca; só no logo) |
| **TextLink** | "Acessar conta" — lime bold inline |
| **AuthSplitLayout** | painel esquerdo decorativo (swirls lime + `backdrop-blur-32`) + painel direito `background/secondary`, centralizado (`px-88 py-40`, coluna 321px) |

### Notas de implementação
- **Raios divergem**: botão `12px`, input `8px` (nosso `--radius` = 10px). Aplicar por componente (`rounded-xl` no botão, `rounded-lg` no input) em vez de mudar o global.
- Fonte do wordmark é **Sora** (só o logo); resto é Schibsted Grotesk.
- Esta é uma tela de **auth** — ver questão de escopo (harvest de primitivas vs. construir a tela).

### shadcn a instalar (a partir deste frame)
`button`, `input`, `label`.

## Frame 2 · `3110-759` — Acessar conta (Login / auth)

Mesma `AuthSplitLayout`. Heading "Acessar conta", 2 `TextField` (E-mail, Senha), `Button` "Acessar conta", `TextLink` "Criar conta", `Logo`.
**Nenhuma primitiva nova** — confirma e reaproveita as do frame 1. Forma o par login↔cadastro.

> **Escopo de auth decidido: (a)** — auth é só fonte de primitivas; **não** construímos as telas de login/cadastro.

## Frame 3 · `3110-841` — Lista de contatos (= molde da listagem, Fase 3)

Tela de painel. Tokens batem 100% (inclui `background/tertiary #303030`, `content/muted #5e5e5e`).

### Componentes do painel (o kit de verdade)
| Componente | Specs | shadcn |
|---|---|---|
| **AppShell** | sidebar + área principal sobre `background/primary` | layout próprio |
| **Sidebar** | logo (topo) + nav de `IconButton` (vertical) + footer "Logado como" (`text/xsmall` muted) | próprio |
| **IconButton** | quadrado; `lg ~48` (nav) e `sm ~28` (ações de linha); `bg tertiary`, rounded, estilo secundário | `button` (variante `icon`) |
| **PageHeader/Navbar** | título (`heading` 24) + slot de ações | próprio |
| **SearchField** | `Input` + ícone de busca à esquerda; placeholder "Pesquisar" | `input` + ícone |
| **Button** (variantes) | primary (lime + ícone "+"), secondary ("Editar", `bg tertiary`, menor), icon | `button` (variantes) |
| **DataTable** | head (`text/small` muted) + linhas; SectionHeader (letra) + Separator | `table` |
| **Row** | avatar + `ContentLabel`(título+subtítulo) \| telefone \| email \| ações | composição |
| **Avatar** | 44px arredondado, imagem | `avatar` |
| **ContentLabel** | título (`label/medium` `content/primary`) + subtítulo (`text/small` `content/muted`) | próprio |
| **Separator** | linha `border/primary` | `separator` |
| **Filtro A-Z** | rail lateral (específico de contatos) → no painel vira **filtro por status** | — |

### Mapa para a listagem de eventos (Fase 3)
Mesmo shell + tabela. Colunas: **Nome · Data · Local · Status · Participantes**; ação = **"Ver"** (navega ao detalhe); busca por nome; filtro por status; ordenação por data. Sem "Adicionar" (painel é read-mostly), mas mantém o padrão de navbar.

### shadcn a instalar (deste frame)
`button`, `input`, `label`, `table`, `avatar`, `separator` (depois: `badge`, `card`, `select`, `dropdown-menu`, `tooltip`, `skeleton`).

## Frame 4 · `3123-801` — Lista (estado criptografado/mascarado)

Mesma tela do frame 3 com **dados sensíveis mascarados** (`**********`); o icon button de cadeado na navbar alterna a máscara. **Nenhum componente novo** — é um estado de privacidade. Não se aplica ao painel de eventos (sem dados sensíveis); ignorado no entregável.

## Frame 5 · `3123-2077` — Modal "Visualizar informações"

Modal sobre backdrop blur. **Specs:** container `bg primary`, `rounded-16`, `p-12`, `gap-16`; header (título Bold 20 + close 20px) · divisor · conteúdo (`px-16 py-20`) · divisor · footer (`justify-end`, `gap-13`).

| Componente | Specs | shadcn / plano |
|---|---|---|
| **ResponsiveDialog** | header(title+close) / body / footer(actions). Desktop = modal; **mobile = bottom sheet** | **Radix `dialog` responsivo (padrão Copa Bolão), sem vaul** |
| **Button secondary** | `bg background/tertiary #303030`, texto `content/primary`, `rounded-12`, SemiBold 14 | variante `secondary` do `button` |

> Confirma o par de botões primary(lime)/secondary(dark). Raio dos botões = `12px` (`rounded-xl`).

## Frame 6 · `3123-1165` — Modal "Adicionar contato" (form de criação)

Mesmo `ResponsiveDialog` (header+close / body / footer Cancelar·Salvar), body com upload de foto (avatar placeholder + botão "Adicionar foto") + 3 TextField (Nome/Telefone/E-mail). **Nenhuma primitiva nova** (auth/contato-específico; painel é read-mostly).

## Frame 7 · `3123-1288` — Modal "Editar contato"

Variante de **edição** do mesmo `ResponsiveDialog` (campos pré-preenchidos + avatar com botão "Substituir", footer Cancelar/Salvar). **Nenhuma primitiva nova** — par criar/editar.

## Diretriz de overlays (D-012)
**Sempre bottom sheet no mobile — inclusive selects/seletores.** Nada de dropdown nativo no mobile. Desktop: modal/popover; mobile: bottom sheet. Vale para `ResponsiveDialog` e para qualquer `Select`/seletor.

### Padrão de bottom sheet (referência: Copa Bolão `prediction-bottom-sheet.tsx`)
**Radix Dialog responsivo, sem vaul.** Recipe:
- `Dialog.Overlay`: `fixed inset-0 bg-black/60 backdrop-blur-sm` + `fade-in/out`.
- `Dialog.Content` mobile: `fixed inset-x-0 bottom-0 rounded-t-2xl pb-safe` + `slide-in-from-bottom`; grab handle `mx-auto h-1 w-12 rounded-full bg-border md:hidden`.
- `md:`: `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md rounded-xl` + `zoom-in-95`.
- Animações via `tailwindcss-animate` (já instalado). Selects no mobile reusam esse mesmo wrapper.

## Observação sobre dashboard
O app de **Contatos não tem tela de dashboard** (cards de métrica / gráfico). Os componentes da nossa **Fase 4** (4 cards de métrica + gráfico) serão compostos por nós usando os mesmos tokens — sem frame de referência no Figma.
