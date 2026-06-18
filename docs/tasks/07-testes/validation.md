# Fase 7 · Testes — Validation

Critérios de pronto e roteiro de QA.

## Critérios de pronto (DoD)

- [ ] `pnpm test` (Vitest) passa: regras `decideCheckin`/`planCheckin` (Normal 2ª = erro, VIP entra/sai, evento encerrado bloqueia, recálculo de taxa, presença não reconta).
- [ ] `pnpm test:e2e` (Playwright) passa: **estados** (sem-resultado + erro/retry) e **check-in** (Confirmar → "Dentro" + toast; bloqueado desabilita + motivo).
- [ ] E2E não mutam o `db.json` (mockados onde escrevem).
- [ ] `pnpm lint` e `pnpm typecheck` limpos.

## Roteiro de QA (passo a passo)

1. **Unit** — `pnpm test`: todos os casos de regra verdes; saída lista os testes.
2. **Instalar browser** — `pnpm test:e2e:install` (primeira vez).
3. **E2E estados** — `pnpm test:e2e e2e/listagem.spec.ts`: passa "sem resultado" e "erro + tentar novamente".
4. **E2E check-in** — `pnpm test:e2e e2e/checkin.spec.ts`: passa o fluxo de confirmação e o caso bloqueado.
5. **Tudo** — `pnpm test && pnpm test:e2e`: suíte completa verde.
6. **Qualidade** — `pnpm typecheck` + `pnpm lint` limpos (rodo eu mesmo).

## Resultado (executado)

- **Vitest 9/9** · **Playwright 4/4** · typecheck/lint/build limpos.

## Observações

- E2E usa um **db de teste regenerado** (`e2e/seed.json` → `e2e/db.json`, resetado a cada run via `reset-db.mjs` + `globalSetup`); o Playwright sobe o próprio `api:e2e` (`reuseExistingServer: false`) p/ não reusar o db dev. O spec de check-in testa o **fluxo real** (persiste e atualiza estado), sem mock.
- Cobertura focada nas 3 frentes do enunciado (regra, estados, interação), não exaustiva.
