import type { Participant } from '@/types/participant'

import { api } from './client'
import type { ParticipantDto } from './dto'
import { toParticipant } from './mappers'

export async function getParticipants(eventId: string): Promise<Participant[]> {
  const { data } = await api.get<ParticipantDto[]>('/participants', {
    params: { event_id: eventId },
  })
  return data.map(toParticipant)
}

// Used by the check-in flow (Phase 5).
export async function updateParticipant(
  id: string,
  patch: Partial<ParticipantDto>,
): Promise<Participant> {
  const { data } = await api.patch<ParticipantDto>(`/participants/${id}`, patch)
  return toParticipant(data)
}
