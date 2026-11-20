import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { periods, plans, plansIntro, type PeriodId } from '@/data/plans'
import { whatsappMessages } from '@/data/site'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ShineBorder } from '@/components/ui/ShineBorder'
import { RollingNumber } from '@/components/ui/RollingNumber'

export default function Plans() {
  const [period, setPeriod] = useState<PeriodId>('mensal')
  const periodLabel = periods.find((p) => p.id === period)!.label

  return (
    <section id="planos" aria-labelledby="planos-title" className="container-x py-24 md:py-40">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading id="planos-title" eyebrow={plansIntro.eyebrow} title={plansIntro.title} className="mb-0 md:mb-0" />

        {periods.length > 1 && <div role="radiogroup" aria-label="Período do plano" className="inline-flex self-start rounded-full border border-line bg-surface p-1 lg:self-auto">
          {periods.map((p) => {
            const active = p.id === period
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setPeriod(p.id)}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold transition-colors sm:px-4 md:px-5',
                  active ? 'text-bg' : 'text-muted hover:text-text',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="period-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {p.label}
                  {p.note && <span className={cn('ml-1.5 text-xs', active ? 'text-bg/70' : 'text-accent-2')}>{p.note}</span>}
                </span>
              </button>
            )
          })}
        </div>}
      </div>

      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 xl:grid-cols-4 lg:items-stretch lg:gap-6">
        {plans.map((plan, i) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative flex flex-col rounded-[var(--radius-card)] border p-7 md:p-9',
              plan.featured ? 'border-transparent bg-[#171a10]' : 'border-line bg-surface',
            )}
          >
            {plan.featured && (
              <>
                <ShineBorder borderWidth={1.5} duration={9} />
                <span className="absolute -top-3 left-7 rounded-full bg-accent-2 px-3 py-1 font-mono text-[11px] font-medium tracking-widest text-bg uppercase">
                  {plan.badge ?? 'Mais escolhido'}
                </span>
              </>
            )}

            <h3 className="h-display text-3xl">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted">{plan.description}</p>

            <div className="mt-8 flex items-end gap-2">
              <span className="mb-2 text-lg text-muted">R$</span>
              <RollingNumber value={plan.prices[period]} className="h-display text-[4rem] leading-none md:text-[4.5rem]" />
              <span className="mb-2 text-sm text-muted">/mês{plan.priceSuffix ? ` ${plan.priceSuffix}` : ''}</span>
            </div>
            <p className="mt-1 font-mono text-xs tracking-wider text-muted uppercase">{plan.priceNote ?? `Plano ${periodLabel.toLowerCase()}`}</p>

            <ul className="mt-8 mb-10 space-y-3 border-t border-line pt-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm md:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppLink(whatsappMessages.plan(plan.name, periodLabel))}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-auto inline-flex h-12 items-center justify-center rounded-full font-semibold transition-colors',
                plan.featured ? 'bg-accent text-bg hover:bg-text' : 'border border-line hover:border-text',
              )}
            >
              Quero este plano
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
