import { format } from 'date-fns'

import type { Checkin } from '@/types/checkin'
import type { Event } from '@/types/event'

export interface TimePoint {
  time: string
  value: number
}

function byTimestamp(a: Checkin, b: Checkin): number {
  return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
}

function hhmm(iso: string): string {
  return format(new Date(iso), 'HH:mm')
}

/** Cumulative successful entries over time. */
export function cumulativeEntries(checkins: Checkin[]): TimePoint[] {
  let total = 0
  return checkins
    .filter((c) => c.action === 'entry' && c.success)
    .sort(byTimestamp)
    .map((c) => {
      total += 1
      return { time: hhmm(c.timestamp), value: total }
    })
}

/** Net occupancy ("inside now") over time: entry +1, exit -1. */
export function occupancyOverTime(checkins: Checkin[]): TimePoint[] {
  let inside = 0
  return checkins
    .filter((c) => c.success && (c.action === 'entry' || c.action === 'exit'))
    .sort(byTimestamp)
    .map((c) => {
      inside += c.action === 'entry' ? 1 : -1
      return { time: hhmm(c.timestamp), value: Math.max(inside, 0) }
    })
}

/** Count of successful vs failed check-in attempts. */
export function successErrorCounts(checkins: Checkin[]): {
  success: number
  error: number
} {
  return checkins.reduce(
    (acc, c) => {
      if (c.success) acc.success += 1
      else acc.error += 1
      return acc
    },
    { success: 0, error: 0 },
  )
}

/** Attendance: check-ins vs expected, as a 0..100 percentage. */
export function attendance(event: Event): {
  checkin: number
  expected: number
  ratePct: number
} {
  return {
    checkin: event.checkinCount,
    expected: event.expectedCount,
    ratePct: Math.round(event.entryRate * 100),
  }
}
