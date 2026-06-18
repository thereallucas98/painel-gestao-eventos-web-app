import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import Link from 'next/link'

import { StatusBadge } from '@/components/status-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatEventDate } from '@/lib/date'
import { participantStatusLabel, participantTypeLabel } from '@/lib/i18n-enums'
import { cn } from '@/lib/utils'
import type { Event } from '@/types/event'
import type { Participant } from '@/types/participant'

export function EventHeader({ event }: { event: Event }) {
  return (
    <header className="flex flex-col gap-3">
      <Button asChild variant="secondary" size="sm" className="self-start">
        <Link href="/eventos">
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
      </Button>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          {event.name}
        </h1>
        <StatusBadge status={event.status} />
      </div>
      <div className="text-muted-foreground flex flex-col gap-1 text-sm sm:flex-row sm:gap-4">
        <span className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          {formatEventDate(event.date)}
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="size-4" />
          {event.location}
        </span>
      </div>
    </header>
  )
}

function TypeBadge({ type }: { type: Participant['type'] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        type === 'vip'
          ? 'border-brand/40 text-brand-strong dark:text-brand'
          : 'text-muted-foreground',
      )}
    >
      {participantTypeLabel[type]}
    </Badge>
  )
}

function ParticipantStatus({ status }: { status: Participant['status'] }) {
  return (
    <span className="flex items-center gap-1.5 text-sm">
      <span
        className={cn(
          'size-2 rounded-full',
          status === 'inside' ? 'bg-green-500' : 'bg-muted-foreground',
        )}
      />
      {participantStatusLabel[status]}
    </span>
  )
}

function ParticipantTable({ participants }: { participants: Participant[] }) {
  return (
    <Table>
      <TableHeader className="bg-card sticky top-0 z-10">
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Check-ins</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>
              <TypeBadge type={p.type} />
            </TableCell>
            <TableCell>
              <ParticipantStatus status={p.status} />
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {p.checkinCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function ParticipantCards({ participants }: { participants: Participant[] }) {
  return (
    <div className="flex flex-col gap-3">
      {participants.map((p) => (
        <div
          key={p.id}
          className="bg-secondary border-border flex items-center justify-between gap-3 rounded-xl border p-4"
        >
          <div className="flex flex-col gap-1">
            <span className="font-medium">{p.name}</span>
            <ParticipantStatus status={p.status} />
          </div>
          <TypeBadge type={p.type} />
        </div>
      ))}
    </div>
  )
}

const PARTICIPANTS_SCROLL_THRESHOLD = 10

export function ParticipantsPanel({
  participants,
}: {
  participants: Participant[]
}) {
  if (!participants.length) {
    return (
      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold">Participantes (0)</h2>
        <p className="text-muted-foreground border-border rounded-xl border border-dashed p-8 text-center text-sm">
          Nenhum participante neste evento.
        </p>
      </section>
    )
  }

  // Past the threshold, cap the height and scroll (custom scrollbar).
  const scrolls = participants.length > PARTICIPANTS_SCROLL_THRESHOLD

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-lg font-bold">
        Participantes ({participants.length})
      </h2>

      <div className="hidden md:block">
        {scrolls ? (
          <ScrollArea type="always" className="h-[32rem]">
            <ParticipantTable participants={participants} />
          </ScrollArea>
        ) : (
          <ParticipantTable participants={participants} />
        )}
      </div>

      <div className="md:hidden">
        {scrolls ? (
          <ScrollArea type="always" className="h-[28rem] pr-2">
            <ParticipantCards participants={participants} />
          </ScrollArea>
        ) : (
          <ParticipantCards participants={participants} />
        )}
      </div>
    </section>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-9 w-40" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-48 rounded-2xl" />
    </div>
  )
}

export function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center gap-3 rounded-xl border p-12 text-center">
      <p className="text-foreground font-semibold">
        Não foi possível carregar o evento.
      </p>
      <Button variant="secondary" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}

export function EventNotFound() {
  return (
    <div className="border-border flex flex-col items-center gap-3 rounded-xl border border-dashed p-12 text-center">
      <p className="text-foreground font-semibold">Evento não encontrado</p>
      <p className="text-muted-foreground text-sm">
        O evento que você procura não existe ou foi removido.
      </p>
      <Button asChild variant="secondary">
        <Link href="/eventos">Voltar para eventos</Link>
      </Button>
    </div>
  )
}
