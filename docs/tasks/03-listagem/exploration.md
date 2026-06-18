# Fase 3 · Listagem — Exploration

Opções e trade-offs. Recomendação ao fim; decisão final no `plan.md` após aceite.

## E1 · Debounce da busca

| Opção | Prós | Contras |
|---|---|---|
| **Hook `useDebounce(value, 300)`** | Explícito e reutilizável; é literalmente o diferencial "debounce na busca" do PDF | +1 hook (pequeno) |
| `useDeferredValue` (React 19) | Zero código | É deferral, não debounce; menos "intencional" p/ o avaliador |

**Recomendação: `useDebounce`** em `hooks/use-debounce.ts`. Pequeno, reutilizável, e cumpre o diferencial à risca.

## E2 · UI do filtro por status

| Opção | Prós | Contras |
|---|---|---|
| **Controle segmentado** (Todos/Ativo/Encerrado/Cancelado) | 4 opções fixas, 1 toque, sem overlay; ótimo em desktop e mobile; não conflita com D-012 (não é dropdown) | ocupa largura |
| Select responsivo (bottom sheet mobile) | Segue o padrão de select da D-012 | mais código para 4 opções |

**Recomendação: segmentado.** Melhor UX para poucas opções; D-012 mira selects/dropdowns — segmentado é botão, não overlay. (Selects em bottom sheet ficam para quando houver muitas opções.)

## E3 · Rota de detalhe (navegação)

| Opção | Prós | Contras |
|---|---|---|
| **Placeholder `/eventos/[id]` agora** | Navegação funciona já na F3 (sem 404); F4 preenche | arquivo extra temporário |
| Sem placeholder | Menos código | links dão 404 até a F4 |

**Recomendação: placeholder mínimo** (mostra o nome do evento + "em construção"), substituído na Fase 4.

## E4 · Ordenação por data

- Botão toggle **asc/desc** (ícone), rótulo claro. Default: **mais recentes primeiro** (desc).
- **Recomendação:** toggle simples no header, default desc.

## Resumo das recomendações

`useDebounce` (300ms) · filtro **segmentado** · **placeholder** de `/eventos/[id]` · ordenação por data com toggle asc/desc (default desc).
