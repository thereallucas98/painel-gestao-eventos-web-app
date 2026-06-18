# Fase 4 · Dashboard — Validation

Critérios de pronto e roteiro de QA. QA conduzido **um passo por vez**, sob demanda.

## Critérios de pronto (DoD)

- [ ] `/eventos/EVT-001` mostra cabeçalho (nome, data, local, status, voltar).
- [ ] **4 métricas** corretas: esperados, check-ins, erros, taxa de entrada (%).
- [ ] **4 gráficos** renderizam: entradas acumuladas (área), ocupação no tempo (linha), comparecimento (radial), sucesso × erro (donut).
- [ ] **Participantes** listados: nome, tipo (VIP/Normal), status (Dentro/Fora) traduzidos; tabela (desktop) / cards (mobile).
- [ ] **EVT-004** (cancelado/zerado) não quebra: métricas zeradas, gráficos com estado vazio gracioso.
- [ ] **id inválido** (ex.: `/eventos/XPTO`) → "evento não encontrado" + voltar.
- [ ] Loading com skeletons; erro (não-404) com retry.
- [ ] Responsivo; `pnpm lint` e `pnpm typecheck` limpos.

## Roteiro de QA (passo a passo)

1. **Subir** — `pnpm api` + `pnpm dev`; em `/eventos`, clicar "Ver" no Tech Summit (EVT-001).
2. **Cabeçalho** — nome/data/local/status corretos; "Voltar" retorna à lista.
3. **Métricas** — conferir os 4 valores contra a API (esperados 12, check-ins 11, erros 1, taxa 92%).
4. **Gráfico — entradas acumuladas** — área crescente ao longo do tempo.
5. **Gráfico — ocupação** — linha sobe/desce (VIPs entram e saem).
6. **Gráfico — comparecimento** — radial ~92% (check-ins/esperados).
7. **Gráfico — sucesso × erro** — donut com fatia de erro pequena.
8. **Participantes** — nomes com tipo/status em PT; VIPs identificados.
9. **Edge zerado** — abrir EVT-004: métricas 0, sem quebrar; gráficos vazios graciosos.
10. **Not found** — abrir `/eventos/XPTO`: mensagem "não encontrado".
11. **Responsivo** — < md: gráficos empilham, participantes viram cards.
12. **Participantes — scroll** — abrir EVT-005 (20): a lista trava a altura (~10 linhas), rola com scrollbar custom **sempre visível** e cabeçalho fixo. EVT-003 (10) não rola.
13. **Qualidade** — `pnpm typecheck` + `pnpm lint` (rodo eu mesmo).

## Observações

- Ações de check-in/saída e regras de negócio chegam na Fase 5.
- Sem testes automatizados aqui (Fase 7) — mas `lib/event-metrics.ts` já fica pronto para testar.
