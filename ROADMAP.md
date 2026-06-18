# Roadmap

Cada fase é a unidade de commit (Conventional Commits, ver [CLAUDE.md](CLAUDE.md#6-commits)).
Status: ☐ pendente · ◐ em andamento · ☑ concluída.

| # | Fase | Entregáveis | Commit |
|---|---|---|---|
| 0 | ☑ Fundação | CLAUDE.md, `docs/foundation`, `docs/decisions.md`, ROADMAP, init git | `chore: fundação do projeto e documentação base` |
| 1 | ☑ Scaffold | Next app único, Tailwind v4 + tokens Plann.er, shadcn base, providers, tema dark | `chore(scaffold): app next, tailwind e tema base` |
| 2 | ☑ Camada de dados | `types`, `lib/api`, hooks React Query, setup json-server + `db.json` | `feat(dados): client de api, tipos e hooks` |
| 2.5 | ☑ UI & Componentes | Analisar frames Figma (Contatos) → componentes shadcn primários/secundários + interface | `feat(ui): componentes base do design` |
| 3 | ☑ Listagem | lista de eventos, busca (debounce), filtro por status, ordenação por data, estados loading/vazio/erro | `feat(listagem): eventos com busca, filtro e estados` |
| 4 | ☑ Dashboard | detalhe do evento: 4 cards de métrica, gráfico, tabela de participantes | `feat(dashboard): métricas, gráfico e participantes` |
| 5 | ☑ Regras + Check-in | `lib/domain` (VIP/Normal/encerrado), mutações otimistas, feedback via toasts | `feat(check-in): regras de negócio e interações` |
| 6 | ☐ Responsivo + a11y | layout mobile (cards empilhados), ARIA, navegação por teclado, contraste | `feat(ux): responsividade e acessibilidade` |
| 7 | ☐ Testes | Vitest: regra VIP×Normal, render de estados, interação de check-in | `test: regras, estados e check-in` |
| 8 | ☐ README | instruções, decisões, melhorias futuras, uso de IA | `docs: readme completo de entrega` |

## Critérios de avaliação (peso) — referência

Funcionalidade 30% · Qualidade de código 20% · Arquitetura 15% · Integração/estado 15% · UX/UI 10% · Testes 5% · Documentação 5%.
