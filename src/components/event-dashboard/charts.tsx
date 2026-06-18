'use client'

import type { ReactNode } from 'react'
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

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { TimePoint } from '@/lib/event-metrics'

function ChartPanel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="bg-secondary border-border flex flex-col gap-3 rounded-2xl border p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
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

const entriesConfig = {
  value: { label: 'Entradas', color: 'var(--brand)' },
} satisfies ChartConfig

export function EntriesAreaChart({ data }: { data: TimePoint[] }) {
  return (
    <ChartPanel title="Entradas acumuladas">
      {data.length ? (
        <ChartContainer config={entriesConfig} className="h-[220px] w-full">
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
      ) : (
        <EmptyChart />
      )}
    </ChartPanel>
  )
}

const occupancyConfig = {
  value: { label: 'Dentro', color: 'var(--midnight)' },
} satisfies ChartConfig

export function OccupancyLineChart({ data }: { data: TimePoint[] }) {
  return (
    <ChartPanel title="Ocupação ao longo do tempo">
      {data.length ? (
        <ChartContainer config={occupancyConfig} className="h-[220px] w-full">
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
      ) : (
        <EmptyChart />
      )}
    </ChartPanel>
  )
}

const attendanceConfig = {
  value: { label: 'Comparecimento', color: 'var(--brand)' },
} satisfies ChartConfig

export function AttendanceRadial({ ratePct }: { ratePct: number }) {
  return (
    <ChartPanel title="Comparecimento">
      <div className="relative mx-auto aspect-square h-[220px]">
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
          <span className="font-display text-3xl font-bold">{ratePct}%</span>
          <span className="text-muted-foreground text-xs">presença</span>
        </div>
      </div>
    </ChartPanel>
  )
}

const ioConfig = {
  sucesso: { label: 'Sucesso', color: '#16a34a' },
  erro: { label: 'Erro', color: '#e61e32' },
} satisfies ChartConfig

export function SuccessErrorDonut({
  success,
  error,
}: {
  success: number
  error: number
}) {
  const data = [
    { name: 'sucesso', value: success, fill: 'var(--color-sucesso)' },
    { name: 'erro', value: error, fill: 'var(--color-erro)' },
  ]
  return (
    <ChartPanel title="Sucesso × erro">
      {success + error > 0 ? (
        <ChartContainer
          config={ioConfig}
          className="mx-auto aspect-square h-[220px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} />
            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
      ) : (
        <EmptyChart />
      )}
    </ChartPanel>
  )
}
