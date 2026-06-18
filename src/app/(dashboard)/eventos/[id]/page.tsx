import { EventDashboard } from '@/components/event-dashboard'

export default async function EventoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <EventDashboard eventId={id} />
}
