'use client'

import { useQuery } from '@tanstack/react-query'

import { getParticipants } from '@/lib/api/participants'

export function useParticipants(eventId: string) {
  return useQuery({
    queryKey: ['participants', eventId],
    queryFn: () => getParticipants(eventId),
    enabled: Boolean(eventId),
  })
}
