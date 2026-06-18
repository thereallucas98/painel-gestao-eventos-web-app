import type {
  EventStatus,
  ParticipantStatus,
  ParticipantType,
} from '@/lib/i18n-enums'
import type { CheckinAction, CheckinErrorReason } from '@/types/checkin'

// API payloads (snake_case). Confined to lib/api — never used by the UI.

export interface EventDto {
  id: string
  name: string
  date: string
  location: string
  status: EventStatus
  description: string
  expected_count: number
  checkin_count: number
  error_count: number
  entry_rate: number
}

export interface ParticipantDto {
  id: string
  event_id: string
  name: string
  type: ParticipantType
  status: ParticipantStatus
  checkin_count: number
}

export interface CheckinDto {
  id: string
  event_id: string
  participant_id: string
  timestamp: string
  success: boolean
  action: CheckinAction
  error_reason: CheckinErrorReason | null
}
