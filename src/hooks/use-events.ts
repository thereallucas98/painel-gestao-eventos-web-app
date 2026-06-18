'use client'

import { useQuery } from '@tanstack/react-query'

import { getEvents } from '@/lib/api/events'

export function useEvents() {
  return useQuery({ queryKey: ['events'], queryFn: getEvents })
}
