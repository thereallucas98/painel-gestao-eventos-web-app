import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/** Formats an ISO date as e.g. "15 mai 2025 · 09:00" (pt-BR). */
export function formatEventDate(iso: string): string {
  return format(new Date(iso), "dd MMM yyyy '·' HH:mm", { locale: ptBR })
}
