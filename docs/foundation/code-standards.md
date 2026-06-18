# Padrões de código

Herdados das convenções do Turnora e das regras transversais do autor. SSOT para "como escrever código aqui".

## TypeScript

- `strict: true`. Sem `any` implícito; prefira tipos derivados e `zod` para fronteiras de dados.
- Tipos de domínio em `src/types`. Tipos de API espelham o payload e são mapeados para o domínio em `lib/api`.

## Componentes

- `components/ui`: primitivas **puras** compartilhadas (shadcn + custom reutilizável).
- `components/<componente>/`: pasta por componente não-trivial, **plana**:
  - `index.tsx` — **composição** (smart: hooks, orquestração, estado); dá o import limpo `@/components/<componente>`.
  - `parts.tsx` — **peças puras** (só props) + `constants` locais.
  - `use-*.ts` — só se a lógica crescer (senão fica inline no `index.tsx`).
- Componente trivial = arquivo único `components/<nome>.tsx`.
- Sem camada `features/`, sem subpastas `ui/`/`model/`, sem `index.ts` de re-export. Ver `theme-toggle/` como referência.
- Variantes com `class-variance-authority`; merge de classes com `cn()` (clsx + tailwind-merge).

## Nomenclatura

- **Arquivos e pastas:** `kebab-case` (`event-card.tsx`, `use-events.ts`). Nunca camelCase/PascalCase no nome do arquivo.
- **Variáveis e funções:** `camelCase`. **Componentes, tipos e classes:** `PascalCase`.
- **Campos da API:** mantêm o `snake_case` do payload; o mapeamento para o domínio acontece em `lib/api`.

## Clean code e concisão

Norte: **simplicidade, experiência, senioridade.** Do básico ao avançado.

- Funções pequenas e puras; nomes reveladores; sem comentários do óbvio; composição sobre repetição.
- **Concisão com null/undefined** (evitar a verbosidade típica de código gerado):
  - Use `?.` (optional chaining) e `??` (nullish coalescing) em vez de `x !== null && x !== undefined`.
  - Use early return e guard clauses; defaults em parâmetros/destructuring.
  - Para listas/strings, prefira `if (!items.length)` a comparar com `undefined`.
  - Compare explicitamente com `null`/`undefined` **só** quando a distinção entre os dois importar (caso raro) — e comente o porquê.
- Sem código morto, sem flags não usadas, sem abstração prematura.

## Animações e UX

- **Polish é requisito**, não enfeite: transições e animações suaves em navegação, estados (loading→conteúdo), entrada/saída de listas e overlays, hover/press.
- Layout animations onde agregar (reordenação, expand/collapse, sheet↔modal).
- Sempre respeitar `prefers-reduced-motion` (degradar para sem animação).
- Microinterações com feedback imediato; nada de salto/flicker de layout.
- **Overlays no mobile = bottom sheet** (Radix Dialog responsivo, padrão Copa Bolão, sem vaul), inclusive selects/seletores (nunca dropdown nativo); desktop = modal/popover. Wrapper `ResponsiveDialog` (D-012).

## Idioma

- **Código e comentários:** inglês (identificadores, JSDoc, mensagens de log internas).
- **Docs externas** (README, `docs/`, decisions, tasks), **mensagens de commit** e **copy de UI:** PT-BR.

## Regras transversais (invioláveis)

- **Ícones:** sempre `lucide-react`. **Nunca emoji** como ícone de UI.
- **Enums na UI:** nunca renderizar valor cru. Traduzir via `lib/i18n-enums.ts` (`active`→Ativo, `closed`→Encerrado, `cancelled`→Cancelado, `vip`→VIP, `normal`→Normal, `inside`→Dentro, `outside`→Fora).
- **Copy:** linguagem amigável ao usuário; sem jargão técnico ("json-server", "sync", "endpoint") em texto visível.
- **Escopo:** implementar exatamente o que foi pedido; refatoração lateral só com permissão.
- **Banco/dados:** nunca resetar/forçar dados sem aprovação explícita.

## Camadas

- A UI **nunca** chama `fetch` direto — sempre via `lib/api`.
- Regras de negócio vivem em `lib/domain` (funções puras, testáveis), não espalhadas em componentes.
- Hooks de dados (`hooks/`) encapsulam React Query; componentes consomem hooks, não o client.

## Dependências

- **Nunca usar versões beta/prerelease/RC.** Sempre a última **estável**.
- Ex.: json-server → `0.17.4` (a linha v1 só existe como beta).

## Qualidade

- ESLint + Prettier (config herdada do Turnora). `tsc --noEmit` limpo antes de commitar.
- Imports/exports ordenados automaticamente via `eslint-plugin-simple-import-sort` (`pnpm lint --fix`).
- Testes relevantes em Vitest: regras de domínio, render de estados, interação de check-in.
