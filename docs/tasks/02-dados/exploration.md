# Fase 2 · Camada de dados — Exploration

Opções e trade-offs. Recomendação ao fim de cada uma; decisão final no `plan.md` após aceite.

## E1 · Versão do json-server — RESOLVIDO

`0.17.4` (estável), por política de não usar beta. CLI `json-server --watch db.json --port 3001` (igual ao PDF). Sem mais discussão.

## E2 · Rodar app + API juntos

| Opção | Prós | Contras |
|---|---|---|
| **`concurrently` + script `dev:all`** | Um comando sobe os dois; melhor DX; README simples | +1 devDep (estável) |
| Dois terminais (`pnpm api` / `pnpm dev`) | Zero dep | Dois passos manuais; fácil esquecer a API |
| `npm-run-all` | Similar ao concurrently | Menos usado hoje |

**Recomendação: `concurrently`** com `dev:all` (mantendo `api` e `dev` separados também). Custa pouco e melhora a experiência de quem clona.

## E3 · Client HTTP

| Opção | Prós | Contras |
|---|---|---|
| **`fetch` nativo + wrapper fino** | Zero dep; suficiente para GET/POST/PATCH; controle do erro | Escrever o tratamento de erro |
| axios | Interceptors, menos boilerplate | Dep desnecessária para este escopo |

**Recomendação:** `fetch` + wrapper.
**Decisão do usuário: `axios`.** Instância única em `lib/api/client.ts` (baseURL via env) + interceptor para normalizar erro em `ApiError`. Menos boilerplate e interceptors prontos para a Fase 5.

## E4 · Mapeamento snake_case → domínio

| Opção | Prós | Contras |
|---|---|---|
| **Tipos de API (`*Dto`, snake) + mappers para domínio (camel)** | Fronteira limpa; UI nunca vê snake_case; testável | Um pouco mais de código |
| Usar snake_case direto na UI | Menos código | Vaza formato da API pra toda a app; inconsistente com o style |

**Recomendação: DTOs + mappers** em `lib/api`. A UI só conhece tipos de domínio camelCase.

## E5 · Local do `db.json`

| Opção | Prós | Contras |
|---|---|---|
| **Raiz do projeto (`./db.json`)** | Convenção do json-server; comando idêntico ao PDF | Arquivo de dados na raiz |
| `mock/db.json` | Organiza | Comando precisa do caminho; foge do PDF |

**Recomendação: `./db.json` na raiz.** Casa com `json-server --watch db.json`.

## Resumo das recomendações

json-server `0.17.4` · `concurrently` (`dev:all`) · **`axios`** (instância + interceptor) · DTOs + mappers · `db.json` na raiz.
