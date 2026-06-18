# Fase 6 · Responsividade + A11y — Validation

Critérios de pronto e roteiro de QA. QA conduzido **um passo por vez**, sob demanda.

## Critérios de pronto (DoD)

- [ ] **Foco visível** (ring laranja) ao tabular por: busca, filtro, ordenar, linhas/cards de participante, nav da sidebar.
- [ ] **Busca** com nome acessível (`aria-label`).
- [ ] **Filtro** comunica o ativo via `aria-pressed`.
- [ ] **Responsivo** sem quebra em mobile / tablet / desktop (listagem, dashboard, credencial, configurações).
- [ ] Operável **sem mouse** (Tab/Enter/Espaço) nas ações principais.
- [ ] `pnpm lint` e `pnpm typecheck` limpos.

## Roteiro de QA (passo a passo)

1. **Teclado — listagem** — em `/eventos`, dar Tab: foco visível percorre busca → filtro (segmentado) → ordenar → linhas; Enter abre o detalhe.
2. **Busca por teclado** — focar a busca e digitar; leitor de tela anuncia "Buscar" (aria-label).
3. **Filtro** — Tab até os botões de status; o ativo expõe `aria-pressed=true`; foco visível.
4. **Dashboard — teclado** — Tab até um participante (chevron) → Enter abre a credencial; dentro do dialog o foco fica preso e volta ao fechar (Esc).
5. **Responsivo mobile** (< md) — listagem vira cards; header com nav; dashboard empilha; credencial vira bottom sheet.
6. **Responsivo tablet** (md–lg) — tabela aparece; gráficos ainda empilhados (até `lg`); métricas 2 col.
7. **Responsivo desktop** (≥ lg) — sidebar fixa, gráficos 2 col, métricas 4 col.
8. **Contraste** — alternar tema claro/escuro; textos, badges e botões legíveis nos dois.
9. **Qualidade** — `pnpm typecheck` + `pnpm lint` (rodo eu mesmo).

## Fixes de overflow/responsividade (encontrados no QA)

- **Busca** estourava a linha (`w-full` + Ordenar) → `flex-1 min-w-0` (fixa `w-64` só no `sm+`); eliminou o scroll horizontal e o header voltou a encostar nas bordas.
- **Gráficos** (recharts em grid) não encolhiam → `min-w-0` + `overflow-hidden` no painel.
- **MetricCard** com fonte responsiva (`text-2xl → sm:text-3xl`), padding/label menores, `min-w-0`.
- **Radial de Comparecimento** com tamanho responsivo (`w-full max-w-[220px]`) + % adaptável.

## Observações

- Refino visual da credencial ao Figma `1-642` fica para quando a aba estiver ativa.
- Testes automatizados → Fase 7.
