# Fase 8 · README / Entrega — Brief

## Objetivo

Produzir a documentação de entrega em **dois artefatos** (o recrutador pediu, além do README, a descrição das tecnologias com **motivo, o que ajudou e tempo gasto**):

1. **`README.md`** (no repo, para o avaliador) — PDF §8.
2. **Explicação à parte (externa, NÃO versionada)** — `tmp/puzzles/ENTREGA-painel-eventos.md`, fora do repo: narrativa de tecnologias × motivo × benefício × **tempo**, base para a mensagem ao recrutador. Decisão do usuário: só o README vai pro Git.

## Escopo (in)

### README.md
- **Visão geral** do painel + screenshot/descrição.
- **Como rodar** localmente (pré-requisitos, `pnpm install`, `pnpm api`, `pnpm dev`, `.env`).
- **Stack** e **decisões técnicas com justificativa** (resumo de `docs/decisions.md`): Next App Router, React Query + Zustand(n/u), shadcn/Tailwind v4, tokens/rebrand, json-server (Opção B), domínio puro de regras, etc.
- **Diferenciais**: App Router/SSR, React Query, **debounce**, **acessibilidade**, **design system próprio**, **uso de IA documentado**, edge cases.
- **Testes**: Vitest + Playwright e como rodar.
- **Estrutura de pastas** (resumo).
- **Melhorias com mais tempo**.
- **Como utilizei IA** (processo: spec-as-code/Arché, gates de decisão, geração + revisão).

### docs/ENTREGA.md (externo)
- Tabela/seções **Tecnologia → Por que → O que ajudou → Tempo**.
- Inclui o que **não** cabe no README (tempo por área, narrativa do processo de decisão, ferramentas de apoio: Figma MCP, etc.).

## Divisão README × externo
- **README**: o que o avaliador precisa para rodar e entender o *projeto* (técnico, atemporal).
- **Externo**: a *história do processo* — escolhas, benefícios e **tempo** (o recrutador pediu explicitamente).

## Fora de escopo (out)
- Mudança de código/feature.

## Pendência a resolver antes de escrever
- **Tempo real por área** (o recrutador exige): o David fornece os números, ou eu proponho uma estimativa por fase para ele revisar/ajustar (não inventar dado).

## Definição de pronto (resumo — detalhe em `validation.md`)
- README completo na raiz, instruções funcionam, decisões justificadas, IA documentada.
- `docs/ENTREGA.md` com tecnologias × motivo × benefício × tempo.

## Referências
- PDF §8 + mensagem do recrutador. `docs/decisions.md` (D-001…D-014), `ROADMAP.md`, `docs/foundation/`.
