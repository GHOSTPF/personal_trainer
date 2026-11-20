/**
 * RollingNumber — adaptado do "Counter" de React Bits (reactbits.dev/components/counter).
 * Cada dígito é uma coluna 0–9 que rola (transform) até o valor novo.
 */
import { motion } from 'motion/react'

const DIGITS = Array.from({ length: 10 }, (_, i) => i)

function Digit({ value }: { value: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none" style={{ width: '0.62em' }}>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col"
        initial={false}
        animate={{ y: `${-value * 10}%` }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
      >
        {DIGITS.map((d) => (
          <span key={d} className="block h-[1em] text-center leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

export function RollingNumber({ value, className }: { value: number; className?: string }) {
  const chars = value.toLocaleString('pt-BR').split('')
  return (
    <span className={className} aria-label={value.toLocaleString('pt-BR')} role="text">
      <span aria-hidden className="inline-flex tabular-nums">
        {chars.map((c, i) => {
          // key pela posição a partir da direita, para os dígitos "rolarem" no lugar
          const key = chars.length - i
          return /\d/.test(c) ? (
            <Digit key={key} value={Number(c)} />
          ) : (
            <span key={`s${key}`} className="leading-none">
              {c}
            </span>
          )
        })}
      </span>
    </span>
  )
}
