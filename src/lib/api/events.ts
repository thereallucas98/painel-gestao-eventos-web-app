import type { Event } from '@/types/event'

import { api } from './client'
import type { EventDto } from './dto'
import { toEvent } from './mappers'

export async function getEvents(): Promise<Event[]> {
  const { data } = await api.get<EventDto[]>('/events')
  return data.map(toEvent)
}

export async function getEvent(id: string): Promise<Event> {
  const { data } = await api.get<EventDto>(`/events/${id}`)
  return toEvent(data)
}

// Used by the check-in flow (Phase 5).
export async function updateEvent(
  id: string,
  patch: Partial<EventDto>,
): Promise<Event> {
  const { data } = await api.patch<EventDto>(`/events/${id}`, patch)
  return toEvent(data)
}
