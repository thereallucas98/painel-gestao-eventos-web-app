'use client'

import { useReducedMotion } from 'motion/react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

import { Clouds, type Mode, Stars, ToggleThumb } from './parts'

/** Animated day/night switch wired to the app theme. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const reduce = useReducedMotion() ?? false
  const mode: Mode = resolvedTheme === 'light' ? 'light' : 'dark'

  // Placeholder until next-themes resolves (no hydration flash).
  if (!resolvedTheme) {
    return (
      <div
        aria-hidden
        className={cn(
          'h-11 w-24 rounded-full bg-gradient-to-b from-zinc-900 to-zinc-700 shadow-lg',
          className,
        )}
      />
    )
  }

  return (
    <button
      type="button"
      aria-label={mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      onClick={() => setTheme(mode === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative flex w-24 rounded-full bg-gradient-to-b p-1.5 shadow-lg',
        mode === 'light'
          ? 'justify-end from-[#a3cc00] to-[#c4f120]'
          : 'justify-start from-zinc-900 to-zinc-700',
        className,
      )}
    >
      <ToggleThumb mode={mode} reduce={reduce} />
      {mode === 'light' ? (
        <Clouds reduce={reduce} />
      ) : (
        <Stars reduce={reduce} />
      )}
    </button>
  )
}
