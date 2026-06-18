// Domain enums and their PT-BR labels for the UI.
// Raw enum values must never be shown to the user — render through these maps.

import type { CheckinErrorReason } from '@/types/checkin'

export type EventStatus = 'active' | 'closed' | 'cancelled'
export type ParticipantType = 'vip' | 'normal'
export type ParticipantStatus = 'inside' | 'outside'

export const eventStatusLabel: Record<EventStatus, string> = {
  active: 'Ativo',
  closed: 'Encerrado',
  cancelled: 'Cancelado',
}

export const participantTypeLabel: Record<ParticipantType, string> = {
  vip: 'VIP',
  normal: 'Normal',
}

export const participantStatusLabel: Record<ParticipantStatus, string> = {
  inside: 'Dentro',
  outside: 'Fora',
}

export const checkinErrorLabel: Record<CheckinErrorReason, string> = {
  already_checked_in: 'Participante já realizou check-in',
  event_closed: 'Evento encerrado — check-ins bloqueados',
}
