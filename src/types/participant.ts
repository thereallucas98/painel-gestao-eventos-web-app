import type { ParticipantStatus, ParticipantType } from '@/lib/i18n-enums'

export interface Participant {
  id: string
  eventId: string
  name: string
  type: ParticipantType
  status: ParticipantStatus
  checkinCount: number
}
