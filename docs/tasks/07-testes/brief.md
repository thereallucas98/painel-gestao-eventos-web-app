# Fase 7 · Testes automatizados — Brief

## Objetivo

Cobrir os comportamentos relevantes com testes automatizados (PDF pede 2–3). Configurar **Vitest** + **Testing Library** e cobrir as três frentes sugeridas no enunciado.

## Escopo (in)

- **Setup**: Vitest + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom`; `vitest.config.ts`; scripts `test`/`test:watch`.
- **Testes**:
  1. **Regra de negócio (VIP vs Normal)** — `lib/domain/checkin` (puro): Normal não faz 2º check-in (`already_checked_in`); VIP entra/sai múltiplas vezes; evento `closed`/`cancelled` bloqueia (`event_closed`); `planCheckin` calcula efeitos corretos (presença não reconta em reentrada VIP).
  2. **Render de estados** — listagem (`EventsList` ou parts): loading (skeleton), vazio e erro aparecem nas condições corretas (mockando o hook/fetch).
  3. **Interação de check-in** — confirmar na credencial dispara a ação e atualiza o estado (ou cobre `planCheckin` aplicado ao cache); ao menos um teste de interação.

## Fora de escopo (out)

- Testes E2E (Playwright) — não exigidos.
- Cobertura exaustiva; foco nos comportamentos do enunciado.

## Definição de pronto (resumo — detalhe em `validation.md`)

- `pnpm test` roda e **passa** (≥3 testes cobrindo regra, estados e interação).
- `lint`/`typecheck` limpos.

## Referências

- PDF §6 (testes). `lib/domain/checkin` (Fase 5), hooks/estados (Fases 2–3).
