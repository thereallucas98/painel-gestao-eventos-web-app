'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCheckin } from '@/lib/api/checkins'
import { updateEvent } from '@/lib/api/events'
import { updateParticipant } from '@/lib/api/participants'
import { planCheckin } from '@/lib/domain/checkin'
import { checkinErrorLabel } from '@/lib/i18n-enums'
import type { CheckinAction } from '@/types/checkin'
import type { Event } from '@/types/event'
import type { Participant } from '@/types/participant'

interface CheckinVars {
  event: Event
  participant: Participant
  action: CheckinAction
}

/** Check-in/exit mutation: domain decides, api persists, cache updates optimistically. */
export function useCheckin(eventId: string) {
  const queryClient = useQueryClient()
  const participantsKey = ['participants', eventId]
  const eventKey = ['event', eventId]

  const mutation = useMutation({
    mutationFn: async ({ event, participant, action }: CheckinVars) => {
      const plan = planCheckin(event, participant, action)

      await createCheckin({
        event_id: eventId,
        participant_id: participant.id,
        timestamp: new Date().toISOString(),
        success: plan.checkin.success,
        action: plan.checkin.action,
        error_reason: plan.checkin.errorReason,
      })
      if (plan.nextParticipant) {
        await updateParticipant(participant.id, {
          status: plan.nextParticipant.status,
          checkin_count: plan.nextParticipant.checkinCount,
        })
      }
      if (plan.nextEvent) {
        await updateEvent(eventId, {
          checkin_count: plan.nextEvent.checkinCount,
          error_count: plan.nextEvent.errorCount,
          entry_rate: plan.nextEvent.entryRate,
        })
      }
      return plan
    },

    onMutate: async ({ event, participant, action }) => {
      await queryClient.cancelQueries({ queryKey: participantsKey })
      await queryClient.cancelQueries({ queryKey: eventKey })

      const prevParticipants =
        queryClient.getQueryData<Participant[]>(participantsKey)
      const prevEvent = queryClient.getQueryData<Event>(eventKey)
      const plan = planCheckin(event, participant, action)

      if (plan.nextParticipant) {
        queryClient.setQueryData<Participant[]>(participantsKey, (old) =>
          old?.map((p) =>
            p.id === participant.id ? { ...p, ...plan.nextParticipant } : p,
          ),
        )
      }
      if (plan.nextEvent) {
        queryClient.setQueryData<Event>(eventKey, (old) =>
          old ? { ...old, ...plan.nextEvent } : old,
        )
      }
      return { prevParticipants, prevEvent }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevParticipants) {
        queryClient.setQueryData(participantsKey, ctx.prevParticipants)
      }
      if (ctx?.prevEvent) {
        queryClient.setQueryData(eventKey, ctx.prevEvent)
      }
      toast.error('Não foi possível registrar a ação. Tente novamente.')
    },

    onSuccess: (plan) => {
      // Sucesso é confirmado por um modal de feedback (ver EventDashboard);
      // aqui só sinalizamos a falha de regra (caminho de segurança).
      if (!plan.decision.allowed) {
        toast.error(
          plan.checkin.errorReason
            ? checkinErrorLabel[plan.checkin.errorReason]
            : 'Ação não permitida.',
        )
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: participantsKey })
      queryClient.invalidateQueries({ queryKey: eventKey })
      queryClient.invalidateQueries({ queryKey: ['checkins', eventId] })
    },
  })

  return {
    checkin: (event: Event, participant: Participant, action: CheckinAction) =>
      mutation.mutate({ event, participant, action }),
    pendingId: mutation.isPending
      ? mutation.variables?.participant.id
      : undefined,
  }
}
