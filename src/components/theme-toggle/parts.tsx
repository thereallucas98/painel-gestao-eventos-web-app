import { Cloud, Star } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

export type Mode = 'light' | 'dark'

// --- Thumb: glowing sun (light) / spotted moon (dark) ----------------------

const MOON_SPOTS = [
  'bottom-1 right-2 size-2.5',
  'bottom-3 left-1 size-2.5',
  'right-1.5 top-1.5 size-2',
]

export function ToggleThumb({ mode, reduce }: { mode: Mode; reduce: boolean }) {
  return (
    <motion.div
      layout
      transition={reduce ? { duration: 0 } : { type: 'spring', duration: 0.75 }}
      className="relative size-8 overflow-hidden rounded-full shadow-lg"
    >
      <div
        className={cn(
          'absolute inset-0 rounded-full',
          mode === 'dark'
            ? 'bg-slate-100'
            : cn(
                'bg-gradient-to-tr from-[#dcff5b] to-[#c4f120]',
                !reduce && 'animate-pulse',
              ),
        )}
      />
      {mode === 'light' ? (
        <div className="absolute inset-1.5 rounded-full bg-[#eaffa0]" />
      ) : (
        MOON_SPOTS.map((pos, i) => (
          <motion.div
            key={pos}
            initial={reduce ? false : { x: -4, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.35 }}
            className={cn('absolute rounded-full bg-slate-300', pos)}
          />
        ))
      )}
    </motion.div>
  )
}

// --- Sky decorations -------------------------------------------------------

const STARS = [
  {
    pos: 'right-8 top-2',
    size: 'size-2.5',
    scale: [0.75, 1, 0.75],
    opacity: [0.75, 1, 0.75],
    duration: 5,
    rotate: 0,
  },
  {
    pos: 'right-3 top-2.5',
    size: 'size-4',
    scale: [1, 0.75, 1],
    opacity: [0.5, 0.25, 0.5],
    duration: 3.5,
    rotate: -45,
  },
  {
    pos: 'right-7 top-7',
    size: 'size-3',
    scale: [1, 0.5, 1],
    opacity: [1, 0.5, 1],
    duration: 2.5,
    rotate: 45,
  },
]

export function Stars({ reduce }: { reduce: boolean }) {
  return STARS.map((star) => (
    <motion.span
      key={star.pos}
      style={{ rotate: star.rotate }}
      animate={
        reduce
          ? { opacity: 0.85 }
          : { scale: star.scale, opacity: star.opacity }
      }
      transition={
        reduce
          ? undefined
          : { repeat: Infinity, duration: star.duration, ease: 'easeIn' }
      }
      className={cn('absolute text-[#c4f120]', star.pos)}
    >
      <Star className={cn(star.size, 'fill-current')} />
    </motion.span>
  ))
}

const CLOUDS = [
  {
    pos: 'left-8 top-1',
    size: 'size-2.5',
    x: [-20, -15, -10, -5, 0],
    duration: 10,
    delay: 0.25,
  },
  {
    pos: 'left-3 top-3.5',
    size: 'size-4',
    x: [-10, 0, 10, 20, 30],
    duration: 20,
    delay: 0.5,
  },
  {
    pos: 'left-8 top-7',
    size: 'size-3',
    x: [-7, 0, 7, 14, 21],
    duration: 12.5,
    delay: 0,
  },
  {
    pos: 'left-12 top-3.5',
    size: 'size-2.5',
    x: [-15, 0, 15, 30, 45],
    duration: 25,
    delay: 0.75,
  },
]

export function Clouds({ reduce }: { reduce: boolean }) {
  return CLOUDS.map((cloud) => (
    <motion.span
      key={cloud.pos}
      animate={
        reduce
          ? { opacity: 0.9, x: 0 }
          : { x: cloud.x, opacity: [0, 1, 0.75, 1, 0] }
      }
      transition={
        reduce
          ? undefined
          : { duration: cloud.duration, repeat: Infinity, delay: cloud.delay }
      }
      className={cn('absolute text-white', cloud.pos)}
    >
      <Cloud className={cn(cloud.size, 'fill-current')} />
    </motion.span>
  ))
}
