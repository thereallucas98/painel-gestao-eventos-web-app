# Fase 7 · Testes — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Dependências
- ☐ `pnpm add -D vitest vite-tsconfig-paths`
- ☐ `pnpm add -D @playwright/test` + `pnpm exec playwright install chromium`

## Config
- ☐ `vitest.config.ts` (node, globals, tsconfigPaths, include `src/**/*.test.ts`)
- ☐ `playwright.config.ts` (testDir `e2e`, webServer [api, dev], chromium, baseURL)
- ☐ Scripts no `package.json`: `test`, `test:watch`, `test:e2e`, `test:e2e:install`

## Vitest — regras
- ☐ `src/lib/domain/checkin.test.ts` — `decideCheckin` (Normal 2ª / VIP / closed / cancelled / exit) + `planCheckin` (efeitos, presença, recálculo de taxa, erro)

## Playwright — e2e
- ☐ `e2e/listagem.spec.ts` — sem resultado (busca) + erro (`route.abort`) com "Tentar novamente"
- ☐ `e2e/checkin.spec.ts` — API mockada; tocar participante → Confirmar → "Dentro" + toast; caso bloqueado desabilita + motivo

## Verificação (entra no `validation.md`)
- ☐ `pnpm test` passa (regras)
- ☐ `pnpm test:e2e` passa (2 specs)
- ☐ `pnpm lint` e `pnpm typecheck` limpos
