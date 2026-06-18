import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default async function EventoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex flex-col items-start gap-4">
      <Button asChild variant="secondary" size="sm">
        <Link href="/eventos">
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
      </Button>
      <div className="border-border text-muted-foreground rounded-xl border border-dashed p-12">
        <p className="text-foreground font-semibold">Detalhe do evento {id}</p>
        <p className="text-sm">Dashboard em construção (Fase 4).</p>
      </div>
    </div>
  )
}
