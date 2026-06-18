'use client'

import { Percent, TicketCheck, TriangleAlert, Users } from 'lucide-react'
import { useState } from 'react'

import { MetricCard } from '@/components/metric-card'
import { useCheckin } from '@/hooks/use-checkin'
import { useCheckins } from '@/hooks/use-checkins'
import { useEvent } from '@/hooks/use-event'
import { useParticipants } from '@/hooks/use-participants'
import { ApiError } from '@/lib/api/client'
import {
  attendance,
  cumulativeEntries,
  occupancyOverTime,
  successErrorCounts,
} from '@/lib/event-metrics'
import type { Participant } from '@/types/participant'

import {
  AttendanceRadial,
  EntriesAreaChart,
  OccupancyLineChart,
  SuccessErrorDonut,
} from './charts'
import { ParticipantCredentialDialog } from './credential-dialog'
import {
  CheckinBanner,
  DashboardError,
  DashboardSkeleton,
  EventHeader,
  EventNotFound,
  ParticipantsPanel,
} from './parts'

export function EventDashboard({ eventId }: { eventId: string }) {
  const eventQuery = useEvent(eventId)
  const participantsQuery = useParticipants(eventId)
  const checkinsQuery = useCheckins(eventId)
  const { checkin, pendingId } = useCheckin(eventId)
  const [selected, setSelected] = useState<Participant | null>(null)

  if (eventQuery.isLoading) return <DashboardSkeleton />

  if (eventQuery.isError) {
    const status =
      eventQuery.error instanceof ApiError ? eventQuery.error.status : undefined
    if (status === 404) return <EventNotFound />
    return <DashboardError onRetry={() => eventQuery.refetch()} />
  }

  const event = eventQuery.data
  if (!event) return <EventNotFound />

  const checkins = checkinsQuery.data ?? []
  const participants = participantsQuery.data ?? []
  const att = attendance(event)
  const io = successErrorCounts(checkins)

  return (
    <div className="flex flex-col gap-6">
      <EventHeader event={event} />

      {event.status !== 'active' && <CheckinBanner status={event.status} />}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Participantes esperados"
          value={event.expectedCount}
          icon={Users}
          accent="muted"
        />
        <MetricCard
          label="Check-ins realizados"
          value={event.checkinCount}
          icon={TicketCheck}
          accent="brand"
        />
        <MetricCard
          label="Tentativas com erro"
          value={event.errorCount}
          icon={TriangleAlert}
          accent="danger"
        />
        <MetricCard
          label="Taxa de entrada"
          value={`${att.ratePct}%`}
          icon={Percent}
          accent="success"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <EntriesAreaChart data={cumulativeEntries(checkins)} />
        <OccupancyLineChart data={occupancyOverTime(checkins)} />
        <AttendanceRadial ratePct={att.ratePct} />
        <SuccessErrorDonut success={io.success} error={io.error} />
      </div>

      <ParticipantsPanel participants={participants} onSelect={setSelected} />

      <ParticipantCredentialDialog
        event={event}
        participant={selected}
        pending={pendingId === selected?.id}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
        onConfirm={(action) => {
          if (selected) checkin(event, selected, action)
          setSelected(null)
        }}
      />
    </div>
  )
}
