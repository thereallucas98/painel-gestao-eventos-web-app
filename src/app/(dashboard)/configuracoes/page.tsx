import { User } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function ConfiguracoesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Configurações" />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="bg-secondary border-border flex flex-col gap-4 rounded-2xl border p-6">
          <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Perfil
          </h2>
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="bg-background">
                <User className="size-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">Convidado</span>
              <span className="text-muted-foreground text-sm">
                convidado@exemplo.com
              </span>
            </div>
          </div>
        </section>

        <section className="bg-secondary border-border flex flex-col gap-4 rounded-2xl border p-6">
          <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
            Aparência
          </h2>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Tema</span>
              <span className="text-muted-foreground text-sm">
                Alterne entre claro e escuro
              </span>
            </div>
            <ThemeToggle />
          </div>
        </section>
      </div>
    </div>
  )
}
