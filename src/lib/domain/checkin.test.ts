import { describe, expect, it } from 'vitest'

import type { Event } from '@/types/event'
import type { Participant } from '@/types/participant'

import { decideCheckin, planCheckin } from './checkin'

const event: Event = {
  id: 'EVT-001',
  name: 'Tech',
  date: '2025-05-15T09:00:00-03:00',
  location: 'SP',
  status: 'active',
  description: '',
  expectedCount: 10,
  checkinCount: 5,
  errorCount: 0,
  entryRate: 0.5,
}

const normalOutside: Participant = {
  id: 'P1',
  eventId: 'EVT-001',
  name: 'Ana',
  type: 'normal',
  status: 'outside',
  checkinCount: 0,
}
const normalChecked: Participant = {
  ...normalOutside,
  id: 'P2',
  checkinCount: 1,
}
const vipInside: Participant = {
  id: 'V1',
  eventId: 'EVT-001',
  name: 'Bea',
  type: 'vip',
  status: 'inside',
  checkinCount: 2,
}
const vipOutside: Participant = {
  ...vipInside,
  id: 'V2',
  status: 'outside',
  checkinCount: 3,
}

describe('decideCheckin', () => {
  it('permite o 1º check-in de um Normal', () => {
    expect(decideCheckin(event, normalOutside, 'entry')).toEqual({
      allowed: true,
    })
  })

  it('bloqueia o 2º check-in de um Normal', () => {
    expect(decideCheckin(event, normalChecked, 'entry')).toEqual({
      allowed: false,
      errorReason: 'already_checked_in',
    })
  })

  it('permite VIP entrar e sair', () => {
    expect(decideCheckin(event, vipOutside, 'entry').allowed).toBe(true)
    expect(decideCheckin(event, vipInside, 'exit').allowed).toBe(true)
  })

  it('bloqueia entradas em evento encerrado ou cancelado', () => {
    expect(
      decideCheckin({ ...event, status: 'closed' }, normalOutside, 'entry'),
    ).toEqual({ allowed: false, errorReason: 'event_closed' })
    expect(
      decideCheckin({ ...event, status: 'cancelled' }, vipOutside, 'entry')
        .errorReason,
    ).toBe('event_closed')
  })

  it('saída exige estar dentro', () => {
    expect(decideCheckin(event, vipOutside, 'exit').allowed).toBe(false)
  })
})

describe('planCheckin', () => {
  it('1ª entrada conta presença e recalcula a taxa', () => {
    const plan = planCheckin(event, normalOutside, 'entry')
    expect(plan.nextParticipant).toEqual({ status: 'inside', checkinCount: 1 })
    expect(plan.nextEvent).toEqual({
      checkinCount: 6,
      errorCount: 0,
      entryRate: 0.6,
    })
  })

  it('reentrada de VIP não reconta a presença', () => {
    const plan = planCheckin(event, vipOutside, 'entry')
    expect(plan.nextParticipant?.status).toBe('inside')
    expect(plan.nextEvent).toBeUndefined()
  })

  it('saída só altera o participante', () => {
    const plan = planCheckin(event, vipInside, 'exit')
    expect(plan.nextParticipant).toEqual({ status: 'outside', checkinCount: 3 })
    expect(plan.nextEvent).toBeUndefined()
  })

  it('erro de regra incrementa errorCount e grava check-in com falha', () => {
    const plan = planCheckin(event, normalChecked, 'entry')
    expect(plan.checkin).toEqual({
      action: 'entry',
      success: false,
      errorReason: 'already_checked_in',
    })
    expect(plan.nextEvent).toEqual({
      checkinCount: 5,
      errorCount: 1,
      entryRate: 0.5,
    })
    expect(plan.nextParticipant).toBeUndefined()
  })
})
