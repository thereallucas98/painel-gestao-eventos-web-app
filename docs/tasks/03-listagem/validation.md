# Fase 3 · Listagem — Validation

Critérios de pronto e roteiro de QA. QA conduzido **um passo por vez**, sob demanda.

## Critérios de pronto (DoD)

- [ ] `/eventos` lista os 5 eventos (json-server no ar) — desktop em tabela, mobile em cards.
- [ ] Cada item mostra: nome, data formatada (pt-BR), local, `StatusBadge`, participantes esperados, ação "Ver".
- [ ] **Busca** por nome (debounced) filtra a lista.
- [ ] **Filtro** segmentado por status (Todos/Ativo/Encerrado/Cancelado) funciona.
- [ ] **Ordenação** por data com toggle asc/desc (default desc).
- [ ] **Loading**: skeleton enquanto carrega.
- [ ] **Vazio**: "sem eventos" (API vazia) e "nenhum resultado" (filtros) — mensagens distintas.
- [ ] **Erro**: mensagem amigável + "Tentar novamente" (refetch).
- [ ] **"Ver"** navega para `/eventos/[id]` (placeholder).
- [ ] Sidebar (desktop) + header (mobile) com tema funcionando.
- [ ] `pnpm lint` e `pnpm typecheck` limpos.

## Roteiro de QA (passo a passo)

1. **Subir** — `pnpm api` (terminal 1) + `pnpm dev` (terminal 2); abrir `/eventos`.
2. **Render** — 5 eventos listados; data legível, status com cor, contagem de participantes; sidebar à esquerda (desktop).
3. **Busca** — digitar parte de um nome (ex.: "Tech"); lista filtra após ~300ms (debounce).
4. **Filtro** — alternar status (ex.: "Encerrado" → só EVT-002; "Cancelado" → só EVT-004).
5. **Ordenação** — toggle asc/desc; ordem por data muda.
6. **Sem resultado** — buscar algo inexistente ("zzz"); aparece "nenhum resultado" (distinto de "sem eventos").
7. **Erro** — parar o `pnpm api` e recarregar; aparece erro + "Tentar novamente"; religar a API e clicar → recarrega.
8. **Loading** — recarregar com a API no ar (throttle/3G no devtools ajuda); skeleton aparece antes dos dados.
9. **Navegação** — clicar "Ver"; vai para `/eventos/<id>` (placeholder "em construção").
10. **Responsivo** — reduzir a largura (< md); tabela vira cards empilhados; header mobile com tema.
11. **Qualidade** — `pnpm typecheck` + `pnpm lint` limpos (rodo eu mesmo).

## QA adicional (UI / rebrand)

12. **Configurações** — abrir `/configuracoes`: seções Perfil + Aparência (grid 2 col no desktop), toggle de tema funcionando.
13. **Nav mobile** — em < md, o header traz Logo + nav (Eventos/Configurações); navegação funciona.
14. **Rebrand** — brand laranja; botões primários `#d84a0c` + texto branco; títulos em Exo, corpo em Saira; badge "Ativo" laranja; tema light por padrão.

## Observações

- Detalhe do evento é placeholder (Fase 4).
- Sem testes automatizados aqui (Fase 7).
