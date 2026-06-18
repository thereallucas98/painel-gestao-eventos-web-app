'use client'

import { useQuery } from '@tanstack/react-query'

import { getCheckins } from '@/lib/api/checkins'

export function useCheckins(eventId: string) {
  return useQuery({
    queryKey: ['checkins', eventId],
    queryFn: () => getCheckins(eventId),
    enabled: Boolean(eventId),
  })
}
