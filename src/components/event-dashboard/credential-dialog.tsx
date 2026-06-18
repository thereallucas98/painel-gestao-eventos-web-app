'use client'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import { formatEventDate } from '@/lib/date'
import { decideCheckin } from '@/lib/domain/checkin'
import { checkinErrorLabel, participantTypeLabel } from '@/lib/i18n-enums'
import type { CheckinAction } from '@/types/checkin'
import type { Event } from '@/types/event'
import type { Participant } from '@/types/participant'

import { ParticipantStatus } from './parts'

interface Props {
  event: Event
  participant: Participant | null
  onOpenChange: (open: boolean) => void
  onConfirm: (action: CheckinAction) => void
  pending?: boolean
}

function primaryAction(participant: Participant): CheckinAction | null {
  if (participant.status === 'outside') return 'entry'
  if (participant.type === 'vip') return 'exit'
  return null // normal já dentro: nada a fazer
}

/** Decorative barcode: deterministic alternating bars derived from the id. */
function Barcode({ value }: { value: string }) {
  const seed = value.replace(/[^a-zA-Z0-9]/g, '') || 'CODE'
  const bars = Array.from({ length: 56 }, (_, i) => {
    const code = seed.charCodeAt(i % seed.length) + i * 7
    return (code % 4) + 1 // largura 1..4px
  })
  return (
    <div className="flex h-10 items-stretch gap-px overflow-hidden" aria-hidden>
      {bars.map((width, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? 'bg-foreground' : 'bg-transparent'}
          style={{ width }}
        />
      ))}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

export function ParticipantCredentialDialog({
  event,
  participant,
  onOpenChange,
  onConfirm,
  pending,
}: Props) {
  const action = participant ? primaryAction(participant) : null
  const decision =
    participant && action ? decideCheckin(event, participant, action) : null

  return (
    <ResponsiveDialog
      open={Boolean(participant)}
      onOpenChange={onOpenChange}
      title="Credencial"
      footer={
        <>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          {action && (
            <Button
              disabled={!decision?.allowed || pending}
              onClick={() => onConfirm(action)}
            >
              {action === 'entry' ? 'Confirmar check-in' : 'Confirmar saída'}
            </Button>
          )}
        </>
      }
    >
      {participant && (
        <div className="flex flex-col gap-4">
          <div className="border-border overflow-hidden rounded-2xl border">
            <div className="bg-primary text-primary-foreground flex items-center justify-between px-5 py-3">
              <span className="font-display font-bold">{event.name}</span>
              <span className="text-xs opacity-90">
                {participantTypeLabel[participant.type]}
              </span>
            </div>
            <div className="bg-secondary flex flex-col gap-4 p-5">
              <Field label="Participante" value={participant.name} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Data" value={formatEventDate(event.date)} />
                <Field label="Local" value={event.location} />
              </div>
              <div className="border-border flex items-end justify-between border-t border-dashed pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
                    Status
                  </span>
                  <ParticipantStatus status={participant.status} />
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
                    Código
                  </span>
                  <span className="font-mono text-sm">{participant.id}</span>
                </div>
              </div>
              <Barcode value={participant.id} />
            </div>
          </div>

          {action && decision && !decision.allowed && decision.errorReason && (
            <p className="text-destructive text-sm">
              {checkinErrorLabel[decision.errorReason]}
            </p>
          )}
          {!action && (
            <p className="text-muted-foreground text-sm">
              Participante já está dentro do evento.
            </p>
          )}
        </div>
      )}
    </ResponsiveDialog>
  )
}
