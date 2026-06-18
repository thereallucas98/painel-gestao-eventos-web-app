# Fase 6 · Responsividade + Acessibilidade — Brief

## Objetivo

Fechar a **responsividade** e a **acessibilidade** do painel: revisar as telas em mobile/tablet/desktop e garantir ARIA, navegação por teclado, foco visível e contraste — cumprindo a §6 (responsividade) e o diferencial de Acessibilidade do PDF.

## Escopo (in)

### Responsividade (mobile → tablet → desktop)
- Revisar **listagem** (tabela ↔ cards), **dashboard** (métricas, grid de gráficos, participantes), **configurações** e a **credencial** (modal ↔ bottom sheet) nos 3 tamanhos.
- Corrigir overflow/quebras; garantir alvos de toque adequados no mobile.

### Acessibilidade
- **ARIA**: rótulos em botões só-ícone (toggle, nav, chevron, fechar), `aria-current` na nav, `aria-label` no campo de busca.
- **Teclado/foco**: foco visível (`focus-visible`) consistente; ordem de tabulação lógica; linhas/credencial acionáveis por teclado; foco preso e restaurado nos dialogs (Radix).
- **Contraste**: validar textos e estados (laranja, badges, muted) em ambos os temas (AA).
- **Semântica**: landmarks (`header`/`nav`/`main`), hierarquia de headings, `lang` (já `pt-BR`), `prefers-reduced-motion` (já global).

## Fora de escopo (out)

- Testes automatizados → **Fase 7**.
- README → **Fase 8**.
- Refino visual da credencial ao Figma `1-642` (quando a aba estiver ativa).

## Definição de pronto (resumo — detalhe em `validation.md`)

- Telas funcionam sem quebra em mobile/tablet/desktop.
- Botões só-ícone com nome acessível; foco visível navegável por teclado; busca/seletores operáveis sem mouse.
- Sem violações graves de contraste; `lint`/`typecheck` limpos.

## Referências

- PDF §6 (responsividade) e §7 (Acessibilidade). Decisões D-006 (mobile-first), D-012 (overlays), D-013 (cores/contraste).
