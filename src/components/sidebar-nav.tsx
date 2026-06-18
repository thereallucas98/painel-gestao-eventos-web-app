'use client'

import { CalendarCheck, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn, focusRing } from '@/lib/utils'

const ITEMS = [
  { href: '/eventos', label: 'Eventos', icon: CalendarCheck },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

/** Sidebar navigation: icon links with active highlight (lime icon on subtle bg). */
export function SidebarNav() {
  const pathname = usePathname()

  return (
    <>
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={cn(
              focusRing,
              'flex size-12 items-center justify-center rounded-2xl transition-colors',
              active
                ? 'bg-brand/15 text-brand-strong dark:text-brand'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            <Icon className="size-5" />
          </Link>
        )
      })}
    </>
  )
}
