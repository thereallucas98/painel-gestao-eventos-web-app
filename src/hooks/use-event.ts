'use client'

import { useQuery } from '@tanstack/react-query'

import { getEvent } from '@/lib/api/events'

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    enabled: Boolean(id),
  })
}
