'use client'

import { ChevronsRight } from 'lucide-react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const KNOB = 48
const PAD = 4

interface SlideToConfirmProps {
  label: string
  onConfirm: () => void
  className?: string
}

/**
 * Deslizar-para-confirmar: arraste o knob até o fim (ou tecle Enter/Espaço) para
 * confirmar — o tick se desenha conforme o progresso. Respeita reduced-motion.
 */
export function SlideToConfirm({
  label,
  onConfirm,
  className,
}: SlideToConfirmProps) {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [maxX, setMaxX] = useState(0)
  const [done, setDone] = useState(false)

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => setMaxX(Math.max(0, el.offsetWidth - KNOB - PAD * 2))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const progress = useTransform(x, [0, maxX || 1], [0, 1], { clamp: true })
  const hintOpacity = useTransform(progress, [0, 0.4], [1, 0])
  const chevronOpacity = useTransform(progress, [0, 0.4], [1, 0])
  const tickLength = useTransform(progress, [0.5, 1], [0, 1])

  function finish() {
    if (done || maxX === 0) return
    setDone(true)
    animate(x, maxX, reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }) // prettier-ignore
    window.setTimeout(onConfirm, reduce ? 0 : 250)
  }

  function settle() {
    if (x.get() >= maxX * 0.9) finish()
    else animate(x, 0, reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 45 }) // prettier-ignore
  }

  return (
    <div
      ref={trackRef}
      className={cn(
        'bg-secondary border-border relative flex h-14 w-full items-center overflow-hidden rounded-full border p-1',
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="bg-primary absolute inset-0 origin-left"
      />
      <motion.span
        aria-hidden
        style={{ opacity: hintOpacity }}
        className="text-muted-foreground pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium"
      >
        {label}
      </motion.span>
      <motion.button
        type="button"
        aria-label={label}
        drag={done ? false : 'x'}
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={settle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            finish()
          }
        }}
        style={{ x }}
        className="bg-card focus-visible:ring-ring relative z-10 flex size-12 shrink-0 cursor-grab items-center justify-center rounded-full shadow focus-visible:ring-2 focus-visible:outline-none active:cursor-grabbing"
      >
        <motion.span style={{ opacity: chevronOpacity }} className="absolute">
          <ChevronsRight className="text-primary size-5" />
        </motion.span>
        <svg viewBox="0 0 24 24" className="size-6">
          <motion.path
            d="M4 12.5 L9.5 18 L20 6.5"
            fill="none"
            stroke="#16a34a"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: tickLength }}
          />
        </svg>
      </motion.button>
    </div>
  )
}
