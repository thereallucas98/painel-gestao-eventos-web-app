# Fase 4 · Dashboard — Exploration

Opções e trade-offs. Recomendação ao fim; decisão final no `plan.md` após aceite.

## E1 · Lib e wrapper do gráfico

| Opção | Prós | Contras |
|---|---|---|
| **recharts + wrapper `chart` do shadcn** | Temável via CSS vars (usa nossos tokens), tooltips/acessibilidade prontos, consistente com o kit | precisa definir cores de chart + `pnpm dlx shadcn add chart` |
| recharts direto | Menos setup | tematização manual (cores hardcoded) |
| outra lib (chart.js/visx) | — | sai do padrão; mais verboso |

**Recomendação: recharts + wrapper shadcn `chart`** (estável). Integra com o brand laranja e o tema.

## E2 · Quais gráficos

| Opção | Prós | Contras |
|---|---|---|
| **Ambos: área "entradas no tempo" + donut "sucesso × erro"** | Dashboard mais rico; cobre as duas sugestões do PDF (diferencial) | mais trabalho |
| Só área (entradas no tempo) | Cumpre o "≥1"; foco | menos completo |
| Só donut (sucesso × erro) | Simples | menos informativo |

**Recomendação: ambos** — uma área principal (entradas acumuladas no tempo) + um donut compacto (sucesso × erro). O enunciado pede ≥1; entregar 2 é diferencial.

## E3 · Evento inexistente

| Opção | Prós | Contras |
|---|---|---|
| **Estado "não encontrado" no client** | Coerente com os hooks React Query (client); detecta `ApiError(404)` | não usa o `notFound()` nativo |
| Server prefetch + `notFound()` | Usa 404 nativo do Next | duplica fetch (server) fora do padrão de hooks |

**Recomendação: estado not-found no client** (quando `useEvent` falhar com 404). Mantém a arquitetura de dados atual.

## E4 · Indicador de status do participante

- `inside` → badge/realce sutil (presente no evento); `outside` → neutro. VIP marcado com badge de tipo.
- **Recomendação:** badge pequeno para tipo (VIP/Normal) + indicador para status (Dentro/Fora), reutilizando o padrão de `StatusBadge`.

## Resumo das recomendações

recharts + wrapper shadcn `chart` · **2 gráficos** (área + donut) · not-found no client · badges de tipo/status do participante.
