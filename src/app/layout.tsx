import './globals.css'

import type { Metadata } from 'next'
import { Schibsted_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'

import { QueryProvider } from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
})

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
      className={`${schibsted.variable} h-full`}
    >
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
