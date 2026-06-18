# Fase 6 · Responsividade + A11y — Exploration

Ajustes são pontuais; aqui só a abordagem/priorização. Recomendação ao fim.

## E1 · Padrão de foco visível

| Opção | Prós | Contras |
|---|---|---|
| **Classe utilitária compartilhada** (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none`) aplicada via `cn()` nos elementos customizados | Consistente, 1 padrão; já casa com o `--ring` (laranja) | string repetida (mitigável com constante) |
| Ring ad-hoc por componente | flexível | inconsistente |

**Recomendação: padrão único** (mesma string nos 3 pontos: sidebar-nav, card de participante, botões do filtro), alinhado ao ring laranja do tema.

## E2 · Nome acessível do SearchField

| Opção | Prós | Contras |
|---|---|---|
| **`aria-label` (default "Buscar", sobrescrevível)** | simples; sem markup extra | — |
| `<label>` visualmente oculto | semântico explícito | mais markup |

**Recomendação: `aria-label`** com default "Buscar"; o uso pode passar um mais específico (ex.: "Buscar por nome").

## E3 · Semântica do StatusFilter (segmentado, seleção única)

| Opção | Prós | Contras |
|---|---|---|
| **`aria-pressed` nos botões** | simples; comunica estado ativo | menos "purista" que radiogroup |
| `role="radiogroup"`/`radio` + `aria-checked` | semanticamente exato p/ seleção única | mais atributos/teclado custom |

**Recomendação: `aria-pressed`** (suficiente e leve para 4 botões) + foco visível.

## Prioridade

1. Foco visível (E1) nos 3 pontos. 2. `aria-label` da busca (E2). 3. `aria-pressed` no filtro (E3). 4. Verificação responsiva manual (QA).

## Resumo

Classe de foco compartilhada · `aria-label` na busca · `aria-pressed` no filtro · QA responsivo manual.
