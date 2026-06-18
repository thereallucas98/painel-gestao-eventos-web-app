import type { Checkin } from '@/types/checkin'
import type { Event } from '@/types/event'
import type { Participant } from '@/types/participant'

import type { CheckinDto, EventDto, ParticipantDto } from './dto'

export function toEvent(dto: EventDto): Event {
  return {
    id: dto.id,
    name: dto.name,
    date: dto.date,
    location: dto.location,
    status: dto.status,
    description: dto.description,
    expectedCount: dto.expected_count,
    checkinCount: dto.checkin_count,
    errorCount: dto.error_count,
    entryRate: dto.entry_rate,
  }
}

export function toParticipant(dto: ParticipantDto): Participant {
  return {
    id: dto.id,
    eventId: dto.event_id,
    name: dto.name,
    type: dto.type,
    status: dto.status,
    checkinCount: dto.checkin_count,
  }
}

export function toCheckin(dto: CheckinDto): Checkin {
  return {
    id: dto.id,
    eventId: dto.event_id,
    participantId: dto.participant_id,
    timestamp: dto.timestamp,
    success: dto.success,
    action: dto.action,
    errorReason: dto.error_reason,
  }
}
