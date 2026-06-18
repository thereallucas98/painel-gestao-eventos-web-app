# Fase 7 · Testes — Plan

Suíte **híbrida**: Vitest (regras puras) + Playwright (e2e estados + check-in). Determinismo conforme `exploration`.

## 1. Dependências

- Vitest (unit puro, ambiente node): `vitest`, `vite-tsconfig-paths` (resolve `@/*`).
- Playwright (e2e): `@playwright/test` (+ `playwright install chromium`).
- _Sem jsdom/RTL_: a parte Vitest testa só funções puras; a UI vai para o Playwright.

## 2. Configuração

- `vitest.config.ts`: `plugins: [tsconfigPaths()]`, `test: { environment: 'node', globals: true, include: ['src/**/*.test.ts'] }`.
- `playwright.config.ts`: `testDir: 'e2e'`, `use: { baseURL: 'http://localhost:3000' }`, projeto `chromium`,
  `webServer: [{ command: 'pnpm api', port: 3001, reuseExistingServer: true }, { command: 'pnpm dev', port: 3000, reuseExistingServer: true }]`.
- Scripts: `test` = `vitest run`; `test:watch` = `vitest`; `test:e2e` = `playwright test`; `test:e2e:install` = `playwright install chromium`.

## 3. Vitest — regras (`src/lib/domain/checkin.test.ts`)

- `decideCheckin`: Normal já com check-in → `already_checked_in`; Normal 1ª → allowed; VIP entry/exit livres; evento `closed` e `cancelled` → `event_closed`; exit exige `inside`.
- `planCheckin`: 1ª entrada incrementa `event.checkinCount` + recalcula `entryRate`; reentrada VIP **não** reconta presença; saída só muda participante; erro de regra incrementa `errorCount` e grava checkin `success:false`.

## 4. Playwright — e2e

- `e2e/listagem.spec.ts` (**estados**, GETs reais):
  - **sem resultado**: buscar texto improvável → "Nenhum resultado".
  - **erro**: `page.route('**/events', r => r.abort())` ao carregar → mensagem de erro + "Tentar novamente".
- `e2e/checkin.spec.ts` (**interação**, API mockada via `page.route` p/ determinismo, sem mutar `db.json`):
  - fixtures para `GET /events/:id`, `/participants`, `/checkins`; `POST /checkins` e `PATCH` → fulfill OK; GET de participantes pós-ação reflete "inside".
  - abrir detalhe → tocar participante → **Confirmar check-in** → asserir status "Dentro" + toast "Entrada registrada".
  - asserir botão **desabilitado** + motivo num caso bloqueado (Normal já com check-in / evento encerrado).

## 5. Notas

- `.gitignore` já cobre `playwright-report/` e `test-results/`.
- E2E não persiste (mockado); a spec de estados é read-only.

## Resultado esperado

`pnpm test` (Vitest) passa; `pnpm test:e2e` (Playwright) passa os 2 specs. `lint`/`typecheck` limpos.
