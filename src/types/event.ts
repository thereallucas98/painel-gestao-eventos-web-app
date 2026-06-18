import type { EventStatus } from '@/lib/i18n-enums'

export interface Event {
  id: string
  name: string
  date: string // ISO 8601 with offset
  location: string
  status: EventStatus
  description: string
  expectedCount: number
  checkinCount: number
  errorCount: number
  entryRate: number // 0..1
}
