# Padrões de código

Herdados das convenções do Turnora e das regras transversais do autor. SSOT para "como escrever código aqui".

## TypeScript

- `strict: true`. Sem `any` implícito; prefira tipos derivados e `zod` para fronteiras de dados.
- Tipos de domínio em `src/types`. Tipos de API espelham o payload e são mapeados para o domínio em `lib/api`.

## Componentes

- shadcn/ui em `components/ui` (primitivas); composições de produto em `components/features`.
- Variantes com `class-variance-authority`; merge de classes com `cn()` (clsx + tailwind-merge).
- Um componente por arquivo; nome do arquivo = nome do componente (PascalCase).

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

## Qualidade

- ESLint + Prettier (config herdada do Turnora). `tsc --noEmit` limpo antes de commitar.
- Testes relevantes em Vitest: regras de domínio, render de estados, interação de check-in.
