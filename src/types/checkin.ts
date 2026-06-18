export type CheckinAction = 'entry' | 'exit'
export type CheckinErrorReason = 'already_checked_in' | 'event_closed'

export interface Checkin {
  id: string
  eventId: string
  participantId: string
  timestamp: string // ISO 8601 (UTC)
  success: boolean
  action: CheckinAction
  errorReason: CheckinErrorReason | null
}
