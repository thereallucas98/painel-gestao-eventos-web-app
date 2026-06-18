# Decisões (ADR enxuto)

Log das decisões de definição. Formato: contexto → decisão → motivo. Mais recente no topo.

## 2026-06-18

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
