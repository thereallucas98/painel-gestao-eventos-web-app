# Fase 5 · Regras + Check-in — Validation

Critérios de pronto e roteiro de QA. QA conduzido **um passo por vez**, sob demanda.

## Critérios de pronto (DoD)

- [ ] **Normal — 1ª vez**: check-in OK → status "Dentro", sem repetir.
- [ ] **Normal — 2ª vez** (ex.: Pedro Freitas, EVT-001, fora/checkinCount 1): tentativa → **erro** "participante já realizou check-in" (toast), sem mudar status.
- [ ] **VIP**: entra e sai múltiplas vezes; `checkinCount` aumenta a cada ação; status alterna.
- [ ] **Evento encerrado/cancelado** (EVT-002 closed / EVT-004 cancelled): **banner** + botões de ação desabilitados (motivo exibido).
- [ ] **Métricas** (check-ins, erros, taxa) e gráficos atualizam após a ação (otimista) e **persistem** após reload (Opção B).
- [ ] Erro de rede → rollback do otimista + toast.
- [ ] `pnpm lint` e `pnpm typecheck` limpos.

## Roteiro de QA (passo a passo)

1. **Subir** — `pnpm api` + `pnpm dev`; abrir EVT-001.
2. **Check-in OK (normal)** — num participante normal "Fora" com checkinCount 0: clicar Check-in → vira "Dentro", toast de sucesso; card "Check-ins" +1, taxa sobe.
3. **Erro normal (2ª vez)** — em **Pedro Freitas** (normal, Fora, já com check-in): clicar Check-in → toast de erro "já realizou check-in"; card "Tentativas com erro" +1; status não muda.
4. **VIP entra/sai** — num VIP: Saída → "Fora"; Check-in → "Dentro"; repetir; `checkinCount` cresce; presença (check-ins) não duplica na reentrada.
5. **Ocupação** — o gráfico de ocupação reflete entradas/saídas.
6. **Evento encerrado** — abrir EVT-002 (closed): banner no topo, botões desabilitados com motivo.
7. **Persistência** — após ações no EVT-001, recarregar a página: estado mantém (json-server).
8. **Qualidade** — `pnpm typecheck` + `pnpm lint` (rodo eu mesmo).

## Atualização — confirmação via Credencial (D-014)

As ações **não** são instantâneas no clique: tocar no participante abre a **Credencial** (`ResponsiveDialog`, estilo boarding pass: nome, evento, data, local, classe, status, código + barcode). O botão **Confirmar check-in/saída** fica no rodapé; regra bloqueada → desabilitado + motivo no card. Os passos 2–4 do roteiro acima passam por essa credencial.

## Observações

- Refinar a Credencial ao ler o frame Figma `1-642` (quando for a aba ativa).
- Testes automatizados das regras → Fase 7 (`lib/domain/checkin.ts` já isolado).
