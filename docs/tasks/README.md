# Tasks

Cada fase do [ROADMAP](../../ROADMAP.md) tem uma pasta `docs/tasks/<NN-nome>/` com o pipeline Arché.
Nenhum artefato contém pergunta em aberto — dúvidas são resolvidas com o usuário antes de escrever.

## Artefatos por task

| Arquivo | Conteúdo |
|---|---|
| `brief.md` | Objetivo, escopo, fora de escopo |
| `research.md` | Fatos: contratos de API, libs, formato dos dados |
| `exploration.md` | Opções consideradas e trade-offs |
| `plan.md` | Abordagem escolhida e justificativa |
| `todo.md` | Checklist de execução (☐/☑) |
| `validation.md` | Critérios de pronto + roteiro de QA passo a passo |

## Fluxo

```
brief → research → exploration → plan → todo → validation
   → código → QA (1 passo por vez, sob demanda) → revisão → commit
```

Commit só após aprovação final do usuário. Um commit padronizado por fase.
