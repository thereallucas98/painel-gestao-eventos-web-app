# Decisões (ADR enxuto)

Log das decisões de definição. Formato: contexto → decisão → motivo. Mais recente no topo.

## 2026-06-18

### D-010 · Biblioteca de animação — motion + tailwindcss-animate
**Decisão:** `motion` (sucessor do framer-motion) para layout animations/gestos/orquestração + `tailwindcss-animate` para microinterações CSS. Instaladas no scaffold; aplicadas por fase. Sempre com `prefers-reduced-motion`.
**Motivo:** o polish pedido exige do micro ao avançado; conjunto já exercitado no Turnora.

### D-009 · Política de idioma
**Decisão:** código + comentários em inglês; docs externas, commits e copy de UI em PT-BR.
**Motivo:** regra definida do projeto.

### D-011 · Componentização plana (index + parts)
**Decisão:** componente não-trivial vira pasta plana `components/<nome>/` com `index.tsx` (composição/smart) e `parts.tsx` (peças puras + constants); lógica em `use-*.ts` só se crescer. Sem camada `features/`, sem `ui/`/`model/`, sem `index.ts` de re-export. `theme-toggle/` é a referência.
**Motivo:** separa composição de peças puras sem cerimônia. Uma primeira versão DDD-lite (ui/model/index) foi considerada complexa demais e simplificada.

### D-008 · Tema com toggle dark/light (next-themes)
**Decisão:** suportar dark **e** light via next-themes (toggle). Dark = tokens Plann.er; light = paleta derivada (ver `exploration`/`plan` da Fase 1).
**Motivo:** escolha do usuário; diferencial de UX/a11y. Implica criar tokens light (o style guide não os define) — resolvido antes do `plan`.

### D-007 · Package manager — pnpm
**Decisão:** usar pnpm (app único, sem workspace).
**Motivo:** escolha do usuário; consistente com o Turnora. README documentará `pnpm install`/`pnpm dev`.

### D-006 · Responsividade mobile-first + bottom sheet/modal
**Decisão:** abordagem **mobile → tablet → desktop** (mobile-first). Interações com overlay usam **bottom sheet no mobile** e **modal no desktop/tablet**, via um componente adaptativo único que troca por breakpoint.
**Motivo:** o enunciado exige mobile (cards empilhados, ações acessíveis) e desktop (tabelas expandidas). Bottom sheet é o padrão nativo de ação em mobile; modal em telas maiores. Um wrapper adaptativo evita duplicar lógica.

### D-005 · Fundação Arché vendada no repo
**Decisão:** vendar specs condensadas em `docs/foundation/` (princípios + modos); CLAUDE.md referencia.
**Motivo:** Arché não está instalado como plugin local; repo entregue precisa ser self-contained (SSOT interno), sem dependência externa. Mostra processo ao avaliador.

### D-004 · Commits — Conventional Commits por fase
**Decisão:** 1 commit por fase do roadmap, formato `type(scope): desc`, sem emoji.
**Motivo:** padronizado e legível, sem ruído atômico. Histórico de commits é avaliado no enunciado.

### D-003 · API — Opção B (json-server local)
**Decisão:** usar json-server (`localhost:3001`), CRUD real. `lib/api` isolada para permitir troca.
**Motivo:** dados idênticos à Opção A (mesmo seed: 5 eventos, 65 participantes, 81 check-ins), mas **vivos** — persiste check-ins e exercita o caminho `event_closed`. A é o espelho congelado do mesmo `db.json`; B não custa nenhum dado e ganha persistência.

### D-002 · Base — scaffold novo, app único
**Decisão:** Next.js do zero, app único; reaproveitar convenções de frontend do Turnora (shadcn, React Query+Zustand, configs, testes). Sem backend (Prisma/GraphQL/Supabase/auth).
**Motivo:** o teste é front-end com API pronta; clonar o monorepo traria peso morto que derruba o critério de simplicidade. Histórico de commits nasce limpo.

### D-001 · Style guide — sistema Plann.er/Contatos
**Decisão:** adotar o DS do Plann.er (idêntico ao de Contatos): dark neutro, accent lime `#c4f120` e red `#e61e32`, `content/muted` para estado encerrado, fonte Schibsted Grotesk; tokens como CSS variables.
**Motivo:** tokens semânticos prontos, 2 accents que mapeiam as regras de negócio (sucesso/erro), tipografia sóbria adequada a painel admin. O DS de Filmes (roxo, sem cor de sucesso, 3 fontes decorativas) tem fit funcional baixo.
