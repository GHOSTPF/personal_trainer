/**
 * ShineBorder — adaptado de Magic UI (magicui.design/docs/components/shine-border).
 * Borda com gradiente animado via background-position + máscara.
 */
import { cn } from '@/lib/utils'

type Props = { borderWidth?: number; duration?: number; colors?: string[]; className?: string }

export function ShineBorder({
  borderWidth = 1.5,
  duration = 10,
  colors = ['#C6FF3D', '#FF5A1F', '#C6FF3D'],
  className,
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        ['--border-width' as string]: `${borderWidth}px`,
        ['--shine-duration' as string]: `${duration}s`,
        backgroundImage: `radial-gradient(transparent, transparent, ${colors.join(',')}, transparent, transparent)`,
        backgroundSize: '300% 300%',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        padding: 'var(--border-width)',
      }}
      className={cn(
        'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] motion-safe:animate-shine',
        className,
      )}
    />
  )
}
