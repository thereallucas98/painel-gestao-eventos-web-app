import './globals.css'

import type { Metadata } from 'next'
import { Exo, Saira } from 'next/font/google'
import { Toaster } from 'sonner'

import { QueryProvider } from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const saira = Saira({ subsets: ['latin'], variable: '--font-saira' })
const exo = Exo({ subsets: ['latin'], variable: '--font-exo' })

export const metadata: Metadata = {
  title: 'Painel de Gestão de Eventos',
  description: 'Acompanhe eventos, participantes e check-ins em tempo real.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${saira.variable} ${exo.variable} h-full`}
    >
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
