# Fase 5 · Regras + Check-in — Todo

Checklist executável. Segue o `plan.md`. ☐ pendente · ☑ feito.

## Domínio puro
- ☐ `lib/domain/checkin.ts` — `decideCheckin`, `availableActions`, `planCheckin` (+ tipos)
- ☐ Remover `.gitkeep` de `lib/domain`

## Mensagens
- ☐ `lib/i18n-enums.ts` — `checkinErrorLabel` (already_checked_in / event_closed)

## Hook
- ☐ `hooks/use-checkin.ts` — `useMutation` otimista (onMutate/onError/onSettled), orquestra POST+PATCH, toasts por resultado, mapeia domínio → DTO

## UI (event-dashboard)
- ☐ Ações por participante na tabela e nos cards: Check-in / Saída (habilitação via `availableActions`, `isPending`)
- ☐ Banner "check-ins bloqueados" quando `event.status !== 'active'`
- ☐ (Diferencial) credencial "cartão de embarque" no ResponsiveDialog — após ler frame `1-642`

## Verificação (entra no `validation.md`)
- ☐ Normal: 1 check-in OK; 2ª tentativa → erro com toast (Pedro Freitas EVT-001)
- ☐ VIP: entra/sai múltiplas vezes; status e checkinCount atualizam
- ☐ EVT-002 (closed): banner + ações desabilitadas
- ☐ Métricas (check-ins/erros/taxa) atualizam após ação e persistem (reload mantém)
- ☐ `pnpm lint` e `pnpm typecheck` limpos
