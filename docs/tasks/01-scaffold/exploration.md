# Fase 1 · Scaffold — Exploration

Opções e trade-offs das escolhas de *como* montar o scaffold. Recomendação ao fim de cada uma; decisão final consolidada em `plan.md` após aceite.

## E1 · Package manager

| Opção | Prós | Contras |
|---|---|---|
| **npm** | Zero setup; qualquer avaliador clona e roda; lockfile universal | Mais lento que pnpm |
| pnpm | Igual ao Turnora; rápido; disk-efficient | Exige pnpm instalado no avaliador; `workspace` desnecessário em app único |

**Recomendação: npm.** Entregável público; minimiza fricção de avaliação. Simplicidade > velocidade aqui.

## E2 · shadcn/ui — CLI vs manual

| Opção | Prós | Contras |
|---|---|---|
| **`shadcn init` (CLI)** | Padrão, gera `components.json`, resolve `cn()`/paths, adiciona componentes sob demanda | Uma dependência de tooling a mais |
| Manual | Controle total | Reinventa setup; mais propenso a erro |

**Recomendação: CLI.** Padrão da comunidade, compatível com Tailwind v4 + React 19.

## E3 · Tema — dark fixo vs toggle

| Opção | Prós | Contras |
|---|---|---|
| **Dark fixo** | Style guide Plann.er é dark; menos código; foco no que o teste pede | Sem light mode |
| next-themes (toggle) | Diferencial de UX/a11y | Escopo extra; exige par de tokens light que o style guide não define |

**Recomendação: dark fixo** nesta fase. O Plann.er não especifica tokens light; toggle ficaria como melhoria futura no README.

## E4 · Componente adaptativo bottom sheet ↔ modal (D-006)

| Opção | Prós | Contras |
|---|---|---|
| **`vaul` (Drawer) + Radix Dialog**, via wrapper `ResponsiveDialog` que escolhe por media query | Bottom sheet nativo no mobile (vaul) + modal acessível no desktop (Radix); ambos no padrão shadcn; uma só API de uso | 1 dep a mais (vaul) |
| Só Radix Dialog estilizado como sheet no mobile | Sem dep extra | Gesto de arrastar/snap do bottom sheet fica pobre; reimplementa o que o vaul resolve |

**Recomendação: `vaul` + Radix Dialog** com wrapper `ResponsiveDialog`. Padrão consolidado (shadcn Drawer usa vaul). **Instalação adiada para a Fase 4/5** (quando a primeira interação com overlay existir); aqui só fica registrado o padrão.

## E5 · Breakpoints (mobile-first, D-006)

Tailwind default, mobile-first:

| Faixa | Tailwind | Comportamento |
|---|---|---|
| Mobile `< 768px` | base | cards empilhados; overlay = **bottom sheet** |
| Tablet `768–1023px` | `md:` | layout intermediário; overlay = modal |
| Desktop `≥ 1024px` | `lg:` | tabelas expandidas, header fixo; overlay = **modal** |

**Recomendação:** adotar os breakpoints default do Tailwind (`md`/`lg`); sem custom breakpoints.

## E6 · Biblioteca de animação

Requisito: polish máximo (transições, layout animations, overlays), com `prefers-reduced-motion`.

| Opção | Prós | Contras |
|---|---|---|
| **`motion` (sucessor do framer-motion) + `tailwindcss-animate`** | Layout animations, gestures, orquestração; CSS para microinterações; já exercitado no Turnora | +1 dep de runtime |
| `tailwindcss-animate` só | Leve, CSS puro | Sem layout animations/gestures; polish de overlay/reorder limitado |
| CSS + View Transitions API | Zero dep, nativo | Controle fino menor; suporte/comportamento irregular entre browsers |

**Recomendação: `motion` + `tailwindcss-animate`.** Cobre do micro (CSS) ao avançado (layout/gestos), que é o nível de polish pedido. Instalar já no scaffold; aplicar por fase.

## Resumo das recomendações

pnpm · shadcn CLI · toggle dark/light (paleta light derivada + `brand-strong`) · `ResponsiveDialog` (vaul+Radix, F4/5) · breakpoints default mobile-first · **animação: `motion` + `tailwindcss-animate`** (a confirmar).
