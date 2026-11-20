import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: string
  className?: string
  /** Sobrescreve o tamanho do título (ex.: colunas estreitas) */
  titleClassName?: string
  id?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, className, titleClassName, id, align = 'left' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn('mb-12 md:mb-16', align === 'center' && 'text-center', className)}
    >
      <p className="eyebrow mb-4 flex items-center gap-3" style={align === 'center' ? { justifyContent: 'center' } : undefined}>
        <span className="inline-block size-1.5 rounded-full bg-accent" />
        {eyebrow}
      </p>
      {/* leading um pouco maior que o h-display base: acentos (Ê, Ú) não encostam na linha de cima */}
      <h2 id={id} className={cn('h-display text-[clamp(3rem,9vw,8.5rem)] leading-[1.02]', titleClassName)}>
        {title}
      </h2>
    </motion.div>
  )
}
