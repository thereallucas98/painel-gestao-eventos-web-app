'use client'

import { Maximize2 } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from 'recharts'

import { InfoPopover } from '@/components/info-popover'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { TimePoint } from '@/lib/event-metrics'
import { cn, focusRing } from '@/lib/utils'

function ChartPanel({
  title,
  info,
  details,
  children,
}: {
  title: string
  info: ReactNode
  details: ReactNode
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <section className="bg-secondary border-border flex min-w-0 flex-col gap-3 overflow-hidden rounded-2xl border p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="text-muted-foreground flex items-center gap-2">
          {info}
          <button
            type="button"
            aria-label={`Ver detalhes: ${title}`}
            onClick={() => setOpen(true)}
            className={cn(
              'hover:text-foreground hover:bg-background rounded-full p-1 transition-colors',
              focusRing,
            )}
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>
      {children}
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        className="md:max-w-3xl"
      >
        {details}
      </ResponsiveDialog>
    </section>
  )
}

function EmptyChart() {
  return (
    <div className="text-muted-foreground flex h-[220px] items-center justify-center text-sm">
      Sem dados para exibir
    </div>
  )
}

function TimeSeriesTable({
  data,
  valueLabel,
}: {
  data: TimePoint[]
  valueLabel: string
}) {
  if (!data.length) {
    return <p className="text-muted-foreground text-sm">Sem dados.</p>
  }
  return (
    <div className="border-border max-h-[300px] overflow-y-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Horário</TableHead>
            <TableHead className="text-right">{valueLabel}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((point, i) => (
            <TableRow key={i}>
              <TableCell className="tabular-nums">{point.time}</TableCell>
              <TableCell className="text-right tabular-nums">
                {point.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="bg-secondary border-border flex items-center justify-between rounded-lg border px-4 py-2.5">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  )
}

/** Details layout: chart on the left, scrollable aside on the right (stacked on mobile). */
function ChartDetails({
  chart,
  aside,
}: {
  chart: ReactNode
  aside: ReactNode
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-center">
      <div className="flex items-center justify-center">{chart}</div>
      <div className="min-w-0">{aside}</div>
    </div>
  )
}

const entriesConfig = {
  value: { label: 'Entradas', color: 'var(--brand)' },
} satisfies ChartConfig

function EntriesGraph({
  data,
  className,
}: {
  data: TimePoint[]
  className: string
}) {
  if (!data.length) return <EmptyChart />
  return (
    <ChartContainer config={entriesConfig} className={className}>
      <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          fill="var(--color-value)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function EntriesAreaChart({ data }: { data: TimePoint[] }) {
  return (
    <ChartPanel
      title="Entradas acumuladas"
      info={
        <InfoPopover title="Entradas acumuladas">
          Soma das entradas confirmadas ao longo do tempo — cada check-in de
          entrada adiciona 1, por isso a linha só cresce.
        </InfoPopover>
      }
      details={
        <ChartDetails
          chart={<EntriesGraph data={data} className="h-[300px] w-full" />}
          aside={<TimeSeriesTable data={data} valueLabel="Acumulado" />}
        />
      }
    >
      <EntriesGraph data={data} className="h-[220px] w-full" />
    </ChartPanel>
  )
}

const occupancyConfig = {
  value: { label: 'Dentro', color: 'var(--brand-strong)' },
} satisfies ChartConfig

function OccupancyGraph({
  data,
  className,
}: {
  data: TimePoint[]
  className: string
}) {
  if (!data.length) return <EmptyChart />
  return (
    <ChartContainer config={occupancyConfig} className={className}>
      <LineChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export function OccupancyLineChart({ data }: { data: TimePoint[] }) {
  return (
    <ChartPanel
      title="Ocupação ao longo do tempo"
      info={
        <InfoPopover title="Ocupação ao longo do tempo">
          Quantas pessoas estavam dentro a cada momento: cada entrada soma 1 e
          cada saída tira 1 (nunca abaixo de zero).
        </InfoPopover>
      }
      details={
        <ChartDetails
          chart={<OccupancyGraph data={data} className="h-[300px] w-full" />}
          aside={<TimeSeriesTable data={data} valueLabel="Dentro" />}
        />
      }
    >
      <OccupancyGraph data={data} className="h-[220px] w-full" />
    </ChartPanel>
  )
}

const attendanceConfig = {
  value: { label: 'Comparecimento', color: 'var(--brand)' },
} satisfies ChartConfig

function AttendanceGraph({
  ratePct,
  className,
}: {
  ratePct: number
  className: string
}) {
  return (
    <div className={cn('relative mx-auto aspect-square', className)}>
      <ChartContainer config={attendanceConfig} className="h-full w-full">
        <RadialBarChart
          data={[{ value: ratePct }]}
          innerRadius="72%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            background
            cornerRadius={12}
            fill="var(--color-value)"
          />
        </RadialBarChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold sm:text-3xl">
          {ratePct}%
        </span>
        <span className="text-muted-foreground text-xs">presença</span>
      </div>
    </div>
  )
}

export function AttendanceRadial({
  checkin,
  expected,
  ratePct,
}: {
  checkin: number
  expected: number
  ratePct: number
}) {
  return (
    <ChartPanel
      title="Comparecimento"
      info={
        <InfoPopover title="Comparecimento">
          Percentual de presença: participantes que fizeram check-in em relação
          ao total esperado para o evento.
        </InfoPopover>
      }
      details={
        <ChartDetails
          chart={
            <AttendanceGraph
              ratePct={ratePct}
              className="w-full max-w-[260px]"
            />
          }
          aside={
            <div className="flex flex-col gap-2">
              <Stat label="Check-ins realizados" value={checkin} />
              <Stat label="Participantes esperados" value={expected} />
              <Stat label="Taxa de presença" value={`${ratePct}%`} />
            </div>
          }
        />
      }
    >
      <AttendanceGraph ratePct={ratePct} className="w-full max-w-[220px]" />
    </ChartPanel>
  )
}

const ioConfig = {
  sucesso: { label: 'Sucesso', color: '#16a34a' },
  erro: { label: 'Erro', color: '#e61e32' },
} satisfies ChartConfig

function DonutGraph({
  data,
  className,
}: {
  data: { name: string; value: number; fill: string }[]
  className: string
}) {
  return (
    <ChartContainer
      config={ioConfig}
      className={cn('mx-auto aspect-square', className)}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} />
        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
      </PieChart>
    </ChartContainer>
  )
}

export function SuccessErrorDonut({
  success,
  error,
}: {
  success: number
  error: number
}) {
  const total = success + error
  const data = [
    { name: 'sucesso', value: success, fill: 'var(--color-sucesso)' },
    { name: 'erro', value: error, fill: 'var(--color-erro)' },
  ]
  const successPct = total ? `${Math.round((success / total) * 100)}%` : '—'
  return (
    <ChartPanel
      title="Sucesso × erro"
      info={
        <InfoPopover title="Sucesso × erro">
          Proporção entre check-ins confirmados e tentativas que falharam (por
          exemplo, participante repetido ou evento encerrado).
        </InfoPopover>
      }
      details={
        <ChartDetails
          chart={
            total > 0 ? (
              <DonutGraph data={data} className="h-[280px]" />
            ) : (
              <EmptyChart />
            )
          }
          aside={
            <div className="flex flex-col gap-2">
              <Stat label="Sucesso" value={success} />
              <Stat label="Erro" value={error} />
              <Stat label="Total" value={total} />
              <Stat label="Taxa de sucesso" value={successPct} />
            </div>
          }
        />
      }
    >
      {total > 0 ? (
        <DonutGraph data={data} className="h-[220px]" />
      ) : (
        <EmptyChart />
      )}
    </ChartPanel>
  )
}
