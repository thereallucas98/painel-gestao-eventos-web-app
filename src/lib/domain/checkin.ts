import type { CheckinAction, CheckinErrorReason } from '@/types/checkin'
import type { Event } from '@/types/event'
import type { Participant } from '@/types/participant'

export interface CheckinDecision {
  allowed: boolean
  errorReason?: CheckinErrorReason
}

/** Pure business rule: is this action allowed for this participant/event? */
export function decideCheckin(
  event: Event,
  participant: Participant,
  action: CheckinAction,
): CheckinDecision {
  if (event.status !== 'active') {
    return { allowed: false, errorReason: 'event_closed' }
  }
  if (action === 'entry') {
    if (participant.type === 'normal' && participant.checkinCount >= 1) {
      return { allowed: false, errorReason: 'already_checked_in' }
    }
    return { allowed: true }
  }
  // exit
  return { allowed: participant.status === 'inside' }
}

export interface AvailableActions {
  canEnter: boolean
  canExit: boolean
  blocked: boolean
}

/** Which action buttons to offer for a participant (UI helper). */
export function availableActions(
  event: Event,
  participant: Participant,
): AvailableActions {
  if (event.status !== 'active') {
    return { canEnter: false, canExit: false, blocked: true }
  }
  return {
    canEnter: participant.status === 'outside',
    canExit: participant.status === 'inside' && participant.type === 'vip',
    blocked: false,
  }
}

export interface CheckinPlan {
  decision: CheckinDecision
  checkin: {
    action: CheckinAction
    success: boolean
    errorReason: CheckinErrorReason | null
  }
  nextParticipant?: Pick<Participant, 'status' | 'checkinCount'>
  nextEvent?: Pick<Event, 'checkinCount' | 'errorCount' | 'entryRate'>
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/**
 * Pure plan of an action's effects: the check-in record plus the next
 * participant/event aggregates. Used both for the optimistic cache update and
 * the persisted PATCHes — single source of truth for the effects.
 */
export function planCheckin(
  event: Event,
  participant: Participant,
  action: CheckinAction,
): CheckinPlan {
  const decision = decideCheckin(event, participant, action)

  if (!decision.allowed) {
    return {
      decision,
      checkin: {
        action,
        success: false,
        errorReason: decision.errorReason ?? null,
      },
      nextEvent: {
        checkinCount: event.checkinCount,
        errorCount: event.errorCount + 1,
        entryRate: event.entryRate,
      },
    }
  }

  if (action === 'entry') {
    const firstTime = participant.checkinCount === 0
    const checkinCount = firstTime ? event.checkinCount + 1 : event.checkinCount
    return {
      decision,
      checkin: { action, success: true, errorReason: null },
      nextParticipant: {
        status: 'inside',
        checkinCount: participant.checkinCount + 1,
      },
      nextEvent: firstTime
        ? {
            checkinCount,
            errorCount: event.errorCount,
            entryRate:
              event.expectedCount > 0
                ? round2(checkinCount / event.expectedCount)
                : 0,
          }
        : undefined,
    }
  }

  // exit
  return {
    decision,
    checkin: { action, success: true, errorReason: null },
    nextParticipant: {
      status: 'outside',
      checkinCount: participant.checkinCount + 1,
    },
  }
}
