import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Eye,
  MapPin,
  TriangleAlert,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
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
import { type EventStatus, eventStatusLabel } from '@/lib/i18n-enums'
import { cn } from '@/lib/utils'
import type { Event } from '@/types/event'

export type StatusFilterValue = 'all' | EventStatus
export type SortDir = 'asc' | 'desc'

const STATUS_OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: eventStatusLabel.active },
  { value: 'closed', label: eventStatusLabel.closed },
  { value: 'cancelled', label: eventStatusLabel.cancelled },
]

export function StatusFilter({
  value,
  onChange,
}: {
  value: StatusFilterValue
  onChange: (value: StatusFilterValue) => void
}) {
  return (
    <div className="bg-card border-border inline-flex flex-wrap gap-1 rounded-lg border p-1">
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            value === opt.value
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function SortToggle({
  dir,
  onToggle,
}: {
  dir: SortDir
  onToggle: () => void
}) {
  return (
    <Button
      variant="secondary"
      onClick={onToggle}
      className="gap-2"
      aria-label={`Ordenar por data (${dir === 'desc' ? 'mais recentes' : 'mais antigos'})`}
    >
      {dir === 'desc' ? (
        <ArrowDown className="size-4" />
      ) : (
        <ArrowUp className="size-4" />
      )}
      Data
    </Button>
  )
}

function VerButton({ id, className }: { id: string; className?: string }) {
  return (
    <Button asChild variant="secondary" size="sm" className={className}>
      <Link href={`/eventos/${id}`}>
        <Eye className="size-4" />
        Ver
      </Link>
    </Button>
  )
}

export function EventTable({ events }: { events: Event[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Local</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Esperados</TableHead>
          <TableHead className="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-semibold">{event.name}</TableCell>
            <TableCell className="text-muted-foreground whitespace-nowrap">
              {formatEventDate(event.date)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {event.location}
            </TableCell>
            <TableCell>
              <StatusBadge status={event.status} />
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {event.expectedCount}
            </TableCell>
            <TableCell className="text-right">
              <VerButton id={event.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function EventCards({ events }: { events: Event[] }) {
  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-secondary border-border flex flex-col gap-3 rounded-xl border p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold">{event.name}</h3>
            <StatusBadge status={event.status} />
          </div>
          <dl className="text-muted-foreground flex flex-col gap-1.5 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0" />
              {formatEventDate(event.date)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 shrink-0" />
              {event.expectedCount} esperados
            </div>
          </dl>
          <VerButton id={event.id} className="w-full" />
        </div>
      ))}
    </div>
  )
}

export function ListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  )
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="border-border text-muted-foreground flex flex-col items-center gap-3 rounded-xl border border-dashed p-12 text-center">
      <CalendarDays className="size-8 opacity-60" />
      <div>
        <p className="text-foreground font-semibold">{title}</p>
        {description && <p className="text-sm">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border-destructive/30 bg-destructive/5 flex flex-col items-center gap-3 rounded-xl border p-12 text-center">
      <TriangleAlert className="text-destructive size-8" />
      <div>
        <p className="text-foreground font-semibold">
          Não foi possível carregar os eventos.
        </p>
        <p className="text-muted-foreground text-sm">
          Verifique sua conexão e tente novamente.
        </p>
      </div>
      <Button variant="secondary" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
