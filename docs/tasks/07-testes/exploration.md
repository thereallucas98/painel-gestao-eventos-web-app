# Fase 7 · Testes — Exploration

Opções e trade-offs. Recomendação ao fim.

## E1 · Como isolar dados nos testes de componente

| Opção | Prós | Contras |
|---|---|---|
| **Mockar os hooks (`vi.mock('@/hooks/use-events')`)** | Simples, rápido, sem rede; controla loading/vazio/erro direto | não exercita a camada de fetch |
| MSW (mock service worker) | testa do fetch ao render | setup mais pesado; rede simulada |

**Recomendação: mockar os hooks.** O foco do enunciado é o comportamento da UI por estado; a camada de API já é coberta indiretamente e o setup fica leve.

## E2 · Alvo do teste de interação

| Opção | Prós | Contras |
|---|---|---|
| **`ParticipantCredentialDialog` (props)** | orientado a props; clica "Confirmar" → `onConfirm(action)`; testa também o botão desabilitado por regra | não passa pela mutação real |
| Fluxo completo (dashboard + useCheckin + json-server) | end-to-end-ish | exige API no ar; frágil em unit |

**Recomendação: credencial via props.** Cobre "clique dispara a ação" de forma determinística; a lógica de efeito/estado é coberta no teste puro de `planCheckin`.

## E3 · Escopo dos testes (mínimo do PDF = 2–3)

- **3 arquivos**: `checkin.test.ts` (regra+plan), `events-list.test.tsx` (estados), `credential-dialog.test.tsx` (interação). Cobre as 3 frentes do enunciado.

## DECISÃO: suíte híbrida (Vitest + Playwright)

- **Vitest (unit)** → **regras puras** (`decideCheckin`/`planCheckin`): rápido, muitos casos.
- **Playwright (e2e)** → **estados** e **check-in** no navegador real contra o json-server.

### Playwright — determinismo
- `webServer` em **array**: sobe `pnpm api` (3001) e `pnpm dev` (3000) antes dos testes.
- **GETs** (listagem/detalhe) batem no json-server real (read-only, estável).
- **Estados**: "sem resultado" via busca improvável; **erro** via `page.route('**/events', r => r.abort())` + botão "Tentar novamente".
- **Check-in**: interceptar `POST /checkins` e `PATCH` (fulfill OK) para **não mutar** o `db.json` e manter o teste repetível; asserir o update **otimista** (status "Dentro" + toast).

### Resumo
Vitest: 1 arquivo de regra (vários casos). Playwright: 2 specs (estados, check-in). Total ≫ 3.
