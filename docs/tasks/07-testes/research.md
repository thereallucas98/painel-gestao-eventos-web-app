# Fase 7 · Testes — Research

Fatos para o setup. Decisões em `exploration.md`.

## Versões (estáveis, sem beta)

| Pacote | Versão |
|---|---|
| vitest | 4.1.9 |
| @vitejs/plugin-react | 6.0.2 |
| jsdom | 29.1.1 |
| @testing-library/react | 16.3.2 |
| @testing-library/jest-dom | 6.9.1 |
| @testing-library/user-event | 14.6.1 |
| vite-tsconfig-paths | 6.1.1 |

## Configuração

- `vitest.config.ts`: `plugins: [react(), tsconfigPaths()]`, `test: { environment: 'jsdom', globals: true, setupFiles: ['./vitest.setup.ts'] }`.
- `vitest.setup.ts`: `import '@testing-library/jest-dom'`.
- `vite-tsconfig-paths` resolve o alias `@/*` (lê o `tsconfig`).
- Scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.
- ESLint: o `eslint-config-next` já lida com TS; arquivos `*.test.tsx` entram no glob.

## Particularidades (Next 16 / React 19 / Tailwind v4)

- **Domínio puro** (`lib/domain/checkin`): zero setup — só importar e asserir.
- **Componentes client**: testáveis em jsdom. `EventsList` usa `useEvents` (React Query) + `useDebounce` (useEffect/setTimeout) — para testar estados, **mockar `@/hooks/use-events`** (vi.mock) e controlar `isLoading`/`isError`/`data`.
- **next/link** renderiza `<a>` em jsdom (ok). **sonner** `toast` é no-op/mockável. **next/font** só no layout (não usado nos testes de unidade).
- A **credencial** (`ParticipantCredentialDialog`) é orientada a props (`participant`, `onConfirm`) → ótima para teste de **interação** sem rede: clicar "Confirmar" chama `onConfirm('entry')`.

## Estratégia de teste

- **Regra**: unit puro em `decideCheckin`/`planCheckin` (vários casos).
- **Estados**: render de `EventsList` com `use-events` mockado (loading/vazio/erro).
- **Interação**: render do `ParticipantCredentialDialog`, `user-event` clica Confirmar → assert `onConfirm` com a ação; e que o botão fica desabilitado quando a regra bloqueia.
