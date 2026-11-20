/**
 * Marquee — adaptado de Magic UI (magicui.design/docs/components/marquee).
 * Repete o conteúdo e anima com CSS transform (sem JS por frame).
 */
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = ComponentPropsWithoutRef<'div'> & {
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
  /** duração de um ciclo, ex.: "40s" */
  duration?: string
  gap?: string
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  duration = '40s',
  gap = '2rem',
  children,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{ ['--duration' as string]: duration, ['--gap' as string]: gap, ...style }}
      className={cn('group flex overflow-hidden [gap:var(--gap)]', className)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            'flex shrink-0 items-center justify-around [gap:var(--gap)] motion-reduce:animate-none',
            reverse ? 'animate-marquee-reverse' : 'animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
