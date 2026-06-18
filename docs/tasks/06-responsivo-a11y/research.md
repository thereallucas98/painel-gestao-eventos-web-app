# Fase 6 · Responsividade + A11y — Research (auditoria)

Estado atual do código. Decisões/priorização em `exploration.md`.

## O que já está OK

- **ARIA labels** em botões só-ícone: fechar (dialog), nav da sidebar (`aria-label` + `aria-current`), toggle de tema, sort por data, chevron "abrir credencial".
- **Landmarks**: `main` (AppShell), `nav` (sidebar + header mobile), `header` (page/event/mobile), `section` (painéis). `lang="pt-BR"`.
- **Foco/animação**: componentes shadcn (button/input/dialog) trazem `focus-visible` ring; `prefers-reduced-motion` tratado globalmente (D-013) e no toggle.
- **Responsivo**: listagem (tabela `md` ↔ cards), métricas (`grid-cols-2 → lg:grid-cols-4`), gráficos (`lg:grid-cols-2`), credencial (modal ↔ bottom sheet), participantes com scroll.

## Gaps encontrados (a corrigir)

1. **SearchField sem nome acessível** — só `placeholder`; falta `aria-label` (placeholder não é label confiável).
2. **StatusFilter (segmentado)** — `<button>` sem `aria-pressed` (estado do filtro) nem `focus-visible` ring.
3. **Foco visível em elementos customizados** — links da `sidebar-nav`, botão do card de participante e botões do filtro não têm ring de foco explícito (dependem do default do browser).
4. **Linha da tabela clicável** — `<tr onClick>` não é focável; o acionamento por teclado depende do `Button` do chevron (existe e tem `aria-label`), mas a linha em si não é tab-stop. Aceitável; manter o botão como ponto de teclado.
5. **Contraste** — revisar visualmente badges/muted nos 2 temas (provável AA ok; `#d84a0c`+branco e `#515252`/branco passam). Baixa prioridade.

## Responsividade — pontos a conferir manualmente

- Tabela de participantes (5 colunas) em larguras `md` apertadas.
- Header da listagem (título + busca + ordenar) empilhando bem no mobile.
- Grid de gráficos no tablet (deve empilhar até `lg`).

## Conclusão

Base sólida; faltam **ajustes pontuais de a11y** (itens 1–3 são os acionáveis) e uma **verificação responsiva** manual. Sem reescrita estrutural.
