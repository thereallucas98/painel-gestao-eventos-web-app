# Fase 5 · Regras + Check-in — Exploration

Opções e trade-offs. Recomendação ao fim; decisão final no `plan.md` após aceite.

## E1 · Onde orquestrar a mutação

| Opção | Prós | Contras |
|---|---|---|
| **Hook `use-checkin` (useMutation)** que usa `lib/domain` (decide) + `lib/api` (persiste) | Coloca a lógica de React Query/otimista num lugar; componentes só chamam `checkin(participant, action)`; domínio puro separado | — |
| Use-case em `lib` + hook fino | Camada extra | over-engineering p/ o escopo |

**Recomendação: hook `use-checkin`** orquestrando; `lib/domain` puro (regra), `lib/api` persiste. Mantém testável o que importa.

## E2 · UI das ações

| Opção | Prós | Contras |
|---|---|---|
| **Botões inline por participante (Check-in / Saída) + credencial no dialog (diferencial)** | Funcionalidade direta (peso 30%) já na tabela/cards; credencial "boarding pass" como camada extra | credencial depende de ler o design |
| Só botões inline | Simples; cobre o requisito | sem o diferencial visual |
| Só via dialog | Bonito | esconde a ação principal num passo extra |

**Recomendação:** **botões inline agora** (Check-in / Saída por regra) — entrega o núcleo; a **credencial "cartão de embarque"** (dialog) entra como diferencial **depois de ler o frame** `1-642` (pode ser ainda nesta fase ou uma F5.1).

## E3 · Evento encerrado/cancelado

| Opção | Prós | Contras |
|---|---|---|
| **Banner no topo + botões desabilitados (motivo)** | Comunica o bloqueio claramente; cumpre "motivo exibido" | — |
| Só desabilitar botões | menos código | usuário não sabe o porquê |

**Recomendação: banner + botões desabilitados** com tooltip/texto do motivo.

## E4 · Recálculo de `entry_rate`

- Manter razão `checkin_count / expected_count` (0..1) no PATCH do evento; a exibição arredonda (%).
- **Recomendação:** recalcular no client após a ação e enviar no PATCH; exibir `Math.round(rate*100)`.

## Resumo das recomendações

hook `use-checkin` (domínio puro + api) · botões inline + credencial-dialog como diferencial (após ler design) · banner+desabilitar em evento encerrado · `entry_rate` recalculado.
