# Painel de Gestão de Eventos

Painel para acompanhar eventos e controlar o acesso de participantes (check-in/saída), com um dashboard de métricas e regras de negócio. Front-end em **Next.js / React**.

> Teste técnico Front-End. Listagem de eventos → dashboard do evento → check-in com regras (VIP / Normal / evento encerrado).

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 16** (App Router) · **React 19** · TypeScript (strict) |
| UI | **Tailwind v4** + **shadcn/ui** (Radix) · `lucide-react` · `sonner` (toasts) · `next-themes` |
| Animação | `motion` (framer-motion) — com `prefers-reduced-motion` |
| Estado/dados | **TanStack React Query** (server state + mutações otimistas) |
| HTTP | `axios` (instância isolada em `lib/api`) |
| Gráficos | `recharts` (via wrapper `chart` do shadcn) |
| Datas | `date-fns` (pt-BR) |
| API (mock) | **json-server** (Opção B — CRUD real, persiste) |
| Testes | **Vitest** (regras) · **Playwright** (e2e) |
| Tooling | ESLint + Prettier + `simple-import-sort` · pnpm |

Tipografia: **Exo** (títulos) + **Saira** (corpo). Tema **claro/escuro** com seletor.

---

## Como rodar

Pré-requisitos: **Node ≥ 18** e **pnpm**.

```bash
pnpm install
cp .env.example .env          # NEXT_PUBLIC_API_URL=http://localhost:3001
```

Suba os dois serviços (terminais separados):

```bash
pnpm api      # json-server (API)  → http://localhost:3001
pnpm dev      # aplicação (Next)   → http://localhost:3000
```

Acesse **http://localhost:3000** (redireciona para `/eventos`).

### Testes

```bash
pnpm test                      # Vitest (regras de negócio)
pnpm test:e2e:install          # baixa o navegador (1ª vez)
pnpm test:e2e                  # Playwright (estados + check-in) — sobe a API/app sozinho
```

---

## Funcionalidades

- **Listagem** (`/eventos`): nome, data, local, status, participantes esperados — com **busca por nome (debounce)**, **filtro por status**, **ordenação por data** e estados **loading / vazio / sem-resultado / erro** (com retry). Tabela no desktop, cards no mobile.
- **Dashboard** (`/eventos/[id]`): 4 cards de métrica (esperados, check-ins, erros, taxa de entrada), **4 gráficos** (entradas acumuladas, ocupação no tempo, comparecimento, sucesso × erro) e a **lista de participantes** com scroll.
- **Check-in / saída** com **regras de negócio** e **confirmação** (credencial do participante) + feedback (toasts); persiste no json-server (mutação otimista).
- **Configurações** (`/configuracoes`): perfil (mock) + seletor de tema.

---

## Regras de negócio

Centralizadas e puras em **`src/lib/domain/checkin.ts`** (testadas):

- **Evento `closed`/`cancelled`** → bloqueia entradas (motivo exibido).
- **VIP** → entra e sai múltiplas vezes (presença não é recontada na reentrada).
- **Normal** → apenas **um** check-in; nova tentativa → erro claro.

---

## Arquitetura / estrutura

```
src/
  app/(dashboard)/eventos · eventos/[id] · configuracoes   # rotas (App Router)
  components/                # design system + features (convenção "plana": index + parts)
    ui/                      # primitivas shadcn
  hooks/                     # React Query (use-events, use-event, use-checkin…) + use-debounce
  lib/
    api/                     # axios client + DTOs (snake) + mappers → domínio (camel)
    domain/checkin.ts        # regras puras (testáveis)
    event-metrics.ts         # derivações dos gráficos (puras)
    date · i18n-enums · utils
  types/                     # tipos de domínio
e2e/                         # Playwright (+ seed de teste)
docs/                        # decisões (ADR), foundation e tasks por fase
```

**Princípios:** a UI nunca chama `fetch`/axios direto (sempre via `lib/api`); regras de negócio isoladas em `lib/domain`; tipos de API (`snake_case`) mapeados para o domínio (`camelCase`) na fronteira.

---

## Decisões técnicas (resumo)

> Histórico completo (ADR) em [`docs/decisions.md`](docs/decisions.md).

- **App único + App Router** (sem monorepo): o teste é front-end com API pronta; simplicidade favorece a avaliação.
- **json-server (Opção B)** em vez da Opção A (só leitura): mesmos dados, mas **persiste** os check-ins e exercita o caminho `event_closed`. A camada `lib/api` é isolada — trocar a fonte não toca a UI.
- **React Query**: server state, **mutações otimistas** (com rollback/invalidação) e cache — base natural para o fluxo de check-in. `retry: 1` para erros surgirem rápido com 1 retry de resiliência.
- **Design system próprio** (shadcn + tokens em CSS variables): tema claro/escuro, **rebrand** (laranja `#ff7437`, fontes Exo/Saira) sem reescrever componentes. Status e tipo/estado do participante traduzidos (nunca enum cru na UI).
- **Domínio puro** (`lib/domain/checkin`): regras como funções puras → testáveis e reaproveitadas pela mutação otimista (`planCheckin`).
- **Overlays responsivos** (`ResponsiveDialog`): modal no desktop, **bottom sheet** no mobile (Radix Dialog + tailwindcss-animate).
- **Gráficos** com recharts; derivações de dados puras em `lib/event-metrics` (também testáveis).

---

## Diferenciais cobertos

- **Next.js App Router** (file-based routing, server/client components).
- **Gerenciamento de estado** com React Query (+ mutação otimista).
- **Debounce** na busca.
- **Acessibilidade**: foco visível, `aria-label`/`aria-pressed`, navegação por teclado, contraste, `prefers-reduced-motion`.
- **Componentização** própria (design system + convenção plana `index`/`parts`).
- **Edge cases**: evento cancelado/zerado (EVT-004), evento encerrado (EVT-002), VIP com reentradas, estados de lista.
- **Uso de IA documentado** (abaixo).

---

## Testes

- **Vitest** — regras de negócio (`decideCheckin` / `planCheckin`): Normal não repete check-in, VIP entra/sai, evento encerrado bloqueia, recálculo de taxa, presença não recontada.
- **Playwright (e2e)** — estados da listagem (sem-resultado, erro + tentar novamente) e check-in (confirma → "Dentro" + feedback; bloqueia 2ª tentativa com motivo). Roda contra um **db de teste regenerado** a cada execução (não muta o seed de desenvolvimento).

---

## Melhorias com mais tempo

- Refinar a **credencial** ao design exato do Figma (cartão/boarding pass).
- **Histórico de check-ins** do participante (timeline) na credencial.
- **Seletor de status em bottom sheet** no mobile (hoje é um segmentado).
- Mais cobertura de testes (componentes isolados, acessibilidade automatizada).
- Paginação/virtualização caso a base de participantes cresça muito.

---

## Como utilizei IA

Usei IA como **par de programação**, mantendo as decisões e a revisão sob meu controle:

- **Decisão antes do código.** Em cada ponto de definição (stack, API, design, regras de negócio, testes), avaliei as opções e os trade-offs e registrei a escolha em [`docs/decisions.md`](docs/decisions.md) antes de implementar.
- **Trabalho por fases.** Cada etapa seguiu um pipeline curto — `brief → research → exploration → plan → todo → validation` (em `docs/tasks/`) — antes de gerar código; o histórico de commits reflete essas fases.
- **Revisão humana em todo commit.** A IA acelerou o boilerplate, a exploração de alternativas e a varredura de edge cases; eu revisei, ajustei e validei cada entrega (QA manual + `lint`/`typecheck`/testes) antes de commitar.
- **Apoio de ferramentas.** Leitura do design direto do Figma (Dev Mode MCP) para derivar tokens e componentes.

As **decisões de arquitetura/produto e a qualidade final foram minhas** — a IA foi a ferramenta para chegar lá com mais velocidade.
