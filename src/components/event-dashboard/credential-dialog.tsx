'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import { Barcode } from '@/components/barcode'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { SlideToConfirm } from '@/components/slide-to-confirm'
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
}

interface Success {
  id: string
  action: CheckinAction
  name: string
}

function primaryAction(participant: Participant): CheckinAction | null {
  if (participant.status === 'outside') return 'entry'
  if (participant.type === 'vip') return 'exit'
  return null // normal já dentro: nada a fazer
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
}: Props) {
  const reduce = useReducedMotion()
  const [success, setSuccess] = useState<Success | null>(null)
  const [seenId, setSeenId] = useState<string | null>(null)

  // Ajuste de estado em render (padrão React): ao (re)abrir com um participante,
  // descarta o sucesso anterior; durante o fechar (sem participante) preserva-o.
  const currentId = participant?.id ?? null
  if (currentId !== seenId) {
    setSeenId(currentId)
    if (participant) setSuccess(null)
  }

  const action = participant ? primaryAction(participant) : null
  const decision =
    participant && action ? decideCheckin(event, participant, action) : null
  const successView =
    success && (!participant || success.id === participant.id) ? success : null

  const phase = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.2, ease: 'easeOut' as const },
      }

  return (
    <ResponsiveDialog
      open={Boolean(participant)}
      onOpenChange={onOpenChange}
      title={
        successView
          ? successView.action === 'exit'
            ? 'Saída registrada!'
            : 'Check-in confirmado!'
          : 'Credencial'
      }
      footer={
        successView ? (
          <Button className="h-14 w-full" onClick={() => onOpenChange(false)}>
            Concluir
          </Button>
        ) : action && decision?.allowed ? (
          <SlideToConfirm
            className="w-full"
            label={
              action === 'entry'
                ? 'Deslize para confirmar check-in'
                : 'Deslize para confirmar saída'
            }
            onConfirm={() => {
              if (!participant) return
              onConfirm(action)
              setSuccess({ id: participant.id, action, name: participant.name })
            }}
          />
        ) : null
      }
    >
      <div className="grid h-80 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {successView ? (
            <motion.div
              key="success"
              {...phase}
              className="flex flex-col items-center justify-center gap-4 text-center"
            >
              <SuccessCheck reduce={!!reduce} />
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-semibold">
                  {successView.name}
                </span>{' '}
                {successView.action === 'exit'
                  ? 'saiu do evento.'
                  : 'entrou no evento.'}
              </p>
            </motion.div>
          ) : participant ? (
            <motion.div
              key="credential"
              {...phase}
              className="flex flex-col justify-center gap-3"
            >
              <div className="border-border overflow-hidden rounded-2xl border">
                <div className="bg-primary text-primary-foreground flex items-center justify-between px-4 py-2.5">
                  <span className="font-display font-bold">{event.name}</span>
                  <span className="text-xs opacity-90">
                    {participantTypeLabel[participant.type]}
                  </span>
                </div>
                <div className="bg-secondary flex flex-col gap-3 p-4">
                  <Field label="Participante" value={participant.name} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Data" value={formatEventDate(event.date)} />
                    <Field label="Local" value={event.location} />
                  </div>
                  <div className="border-border flex items-end justify-between border-t border-dashed pt-3">
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
                      <span className="font-mono text-sm">
                        {participant.id}
                      </span>
                    </div>
                  </div>
                  <Barcode value={participant.id} />
                </div>
              </div>

              {action &&
                decision &&
                !decision.allowed &&
                decision.errorReason && (
                  <p className="text-destructive text-sm">
                    {checkinErrorLabel[decision.errorReason]}
                  </p>
                )}
              {!action && (
                <p className="text-muted-foreground text-sm">
                  Participante já está dentro do evento.
                </p>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ResponsiveDialog>
  )
}

function SuccessCheck({ reduce }: { reduce: boolean }) {
  const draw = (delay: number) =>
    reduce
      ? undefined
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.4, delay, ease: 'easeOut' as const },
        }

  return (
    <motion.div
      initial={reduce ? false : { scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="flex size-20 items-center justify-center rounded-full bg-[#16a34a]/10"
    >
      <svg viewBox="0 0 52 52" className="size-12">
        <motion.circle
          cx="26"
          cy="26"
          r="23"
          fill="none"
          stroke="#16a34a"
          strokeWidth="3"
          {...draw(0)}
        />
        <motion.path
          d="M16 27 L23 34 L37 18"
          fill="none"
          stroke="#16a34a"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...draw(0.4)}
        />
      </svg>
    </motion.div>
  )
}
