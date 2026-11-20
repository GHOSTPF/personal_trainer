import { motion } from 'motion/react'
import { services, servicesIntro } from '@/data/services'
import { BentoGrid, bentoSize } from '@/components/ui/BentoGrid'
import { CardSpotlight } from '@/components/ui/CardSpotlight'
import { Media } from '@/components/ui/Media'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="container-x py-24 md:py-40">
      <SectionHeading id="servicos-title" eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} />

      <BentoGrid>
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={cn(bentoSize[s.size])}
          >
            <CardSpotlight className="h-full">
              <article data-cursor="VER" className="relative flex h-full flex-col justify-end p-6 md:p-8">
                <div className="absolute inset-0 overflow-hidden">
                  <Media
                    src={s.image}
                    alt=""
                    className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
                </div>
                <div className="relative z-20">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="h-display mt-2 text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted md:text-base">{s.text}</p>
                </div>
              </article>
            </CardSpotlight>
          </motion.div>
        ))}
      </BentoGrid>
    </section>
  )
}
