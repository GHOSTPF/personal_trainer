import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { goals, results, resultsDisclaimer, resultsIntro, type Goal } from '@/data/results'
import { cn } from '@/lib/utils'
import { Compare } from '@/components/ui/Compare'
import { SectionHeading } from '@/components/ui/SectionHeading'

type Filter = Goal | 'Todos'
const filters: Filter[] = ['Todos', ...goals]

export default function Results() {
  const [filter, setFilter] = useState<Filter>('Todos')
  const visible = filter === 'Todos' ? results : results.filter((r) => r.goal === filter)

  return (
    <section id="resultados" aria-labelledby="resultados-title" className="container-x py-24 md:py-40">
      <SectionHeading id="resultados-title" eyebrow={resultsIntro.eyebrow} title={resultsIntro.title} />

      <div role="group" aria-label="Filtrar por objetivo" className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                'relative rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors',
                active ? 'border-accent text-bg' : 'border-line text-muted hover:text-text',
              )}
            >
              {active && (
                <motion.span
                  layoutId="results-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          )
        })}
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((r) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <figure>
                <Compare
                  before={r.before}
                  after={r.after}
                  beforeAlt={`${r.name} antes do acompanhamento`}
                  afterAlt={`${r.name} depois de ${r.duration} de acompanhamento`}
                  label={r.name}
                />
                <figcaption className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-muted">
                      {r.goal} · {r.duration}
                    </p>
                  </div>
                  <p className="h-display text-right text-2xl text-accent">{r.result}</p>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <p className="mt-10 text-xs text-muted">{resultsDisclaimer}</p>
    </section>
  )
}
