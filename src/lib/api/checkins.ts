import type { Checkin } from '@/types/checkin'

import { api } from './client'
import type { CheckinDto } from './dto'
import { toCheckin } from './mappers'

export async function getCheckins(eventId: string): Promise<Checkin[]> {
  const { data } = await api.get<CheckinDto[]>('/checkins', {
    params: { event_id: eventId },
  })
  return data.map(toCheckin)
}

// Used by the check-in flow (Phase 5).
export async function createCheckin(
  payload: Omit<CheckinDto, 'id'>,
): Promise<Checkin> {
  const { data } = await api.post<CheckinDto>('/checkins', payload)
  return toCheckin(data)
}
