import { cn } from '@/lib/utils'

interface BarcodeProps {
  value: string
  className?: string
}

/**
 * Código de barras decorativo, determinístico a partir de `value`.
 * Barras de peso variável distribuídas com `flex-grow` para preencher 100% da largura.
 */
export function Barcode({ value, className }: BarcodeProps) {
  const seed = value.replace(/[^a-zA-Z0-9]/g, '') || 'CODE'
  const bars = Array.from({ length: 60 }, (_, i) => {
    const code = seed.charCodeAt(i % seed.length) + i * 7
    return (code % 4) + 1 // peso relativo 1..4
  })

  return (
    <div
      aria-hidden
      className={cn('flex h-8 w-full items-stretch overflow-hidden', className)}
    >
      {bars.map((weight, i) => (
        <span
          key={i}
          className={i % 2 === 0 ? 'bg-foreground' : 'bg-transparent'}
          style={{ flexBasis: 0, flexGrow: weight }}
        />
      ))}
    </div>
  )
}
