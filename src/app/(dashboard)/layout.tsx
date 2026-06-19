import type { ReactNode } from 'react'

import { AppShell } from '@/components/app-shell'
import { Logo } from '@/components/logo'
import { Sidebar } from '@/components/sidebar'
import { SidebarNav } from '@/components/sidebar-nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const sidebar = <Sidebar nav={<SidebarNav />} footer={<span>v0.1.0</span>} />

  return (
    <AppShell sidebar={sidebar}>
      {/* Mobile top bar (sidebar is desktop-only): same nav, horizontal. */}
      <header className="border-border bg-background sticky top-0 z-10 flex w-full items-center justify-between gap-2 border-b px-4 py-2 md:hidden">
        <Logo />
        <nav className="flex items-center gap-2">
          <SidebarNav />
        </nav>
      </header>

      {/* Content card — distinct surface floating on the page background. */}
      <div className="flex flex-col p-2 md:min-h-full md:p-4">
        <div className="bg-card border-border min-w-0 flex-1 rounded-3xl border p-5 md:p-8">
          {children}
        </div>
      </div>
    </AppShell>
  )
}
