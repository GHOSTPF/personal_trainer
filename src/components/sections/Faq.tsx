import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { faq, faqIntro } from '@/data/faq'
import { SectionHeading } from '@/components/ui/SectionHeading'

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold md:py-8 md:text-2xl"
        >
          {q}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors ${open ? 'border-accent bg-accent text-bg' : 'border-line'}`}
          >
            <Plus className="size-5" aria-hidden />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-8 text-muted md:text-lg">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x py-24 md:py-40">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="faq-title"
            eyebrow={faqIntro.eyebrow}
            title={faqIntro.title}
            titleClassName="text-[clamp(3rem,7vw,5.75rem)] break-words"
            className="lg:sticky lg:top-32"
          />
        </div>
        <ul className="self-start border-t border-line lg:col-span-7">
          {faq.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
