# Fase 1 · Scaffold — Validation

Critérios de pronto e roteiro de QA. O QA é conduzido **um passo por vez**, sob demanda, após o código.

## Critérios de pronto (DoD)

- [ ] `pnpm install` e `pnpm dev` rodam sem erro.
- [ ] `/` redireciona para `/eventos`.
- [ ] `/eventos` renderiza o placeholder usando tokens (fundo `surface`, textos `content*`).
- [ ] Tema **dark por padrão**; toggle alterna dark ↔ light e persiste no reload.
- [ ] Tokens corretos nos dois temas (lime `brand` como preenchimento; `brand-strong` para texto de sucesso no light).
- [ ] Fonte **Schibsted Grotesk** aplicada.
- [ ] Estrutura de pastas do `plan.md §7` criada; `cn()` em `lib/utils.ts`.
- [ ] `pnpm lint` e `pnpm typecheck` sem erros nem warnings.
- [ ] Sem código de feature (dados/listagem/dashboard) — só esqueleto.

## Roteiro de QA (passo a passo)

1. **Instalar e subir** — `pnpm install` → `pnpm dev`. Esperado: compila sem erro, sobe em `:3000`.
2. **Redirect** — abrir `http://localhost:3000/`. Esperado: navega para `/eventos`.
3. **Render base** — ver o placeholder em `/eventos`. Esperado: fundo escuro (`surface`), título legível (`content-heading`), fonte Schibsted Grotesk.
4. **Toggle de tema** — clicar no toggle (sun/moon). Esperado: alterna para light; superfícies claras, textos escuros, "sucesso/ativo" em verde escuro legível (`brand-strong`).
5. **Persistência** — recarregar a página no tema light. Esperado: permanece light (next-themes persiste).
6. **Voltar ao dark** — alternar de novo. Esperado: lime puro aparece vibrante no dark.
7. **Qualidade** — rodar `pnpm lint` e `pnpm typecheck`. Esperado: ambos limpos.

## Observações

- `vaul`/`ResponsiveDialog` não fazem parte desta fase — não testar overlays aqui.
- Responsividade detalhada (mobile/tablet/desktop) é validada nas fases de UI; aqui basta o layout não quebrar ao redimensionar.
