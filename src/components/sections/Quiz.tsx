import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { quizIntro, quizQuestions, recommendPlan, type QuizAnswers } from '@/data/quiz'
import { whatsappMessages } from '@/data/site'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CtaLink } from '@/components/ui/CtaLink'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'

const variants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const total = quizQuestions.length
  const done = step >= total

  const choose = (key: keyof QuizAnswers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    setDir(1)
    setStep((s) => s + 1)
  }
  const back = () => {
    setDir(-1)
    setStep((s) => Math.max(0, s - 1))
  }
  const restart = () => {
    setDir(-1)
    setAnswers({})
    setStep(0)
  }

  const plan = done ? recommendPlan(answers) : null
  const message = plan
    ? whatsappMessages.quiz(answers.goal ?? '', answers.freq ?? '', answers.mode ?? '', plan.name)
    : ''

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="container-x py-24 md:py-40">
      <SectionHeading id="quiz-title" eyebrow={quizIntro.eyebrow} title={quizIntro.title} />

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-12">
        {/* progresso */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex flex-1 gap-2" aria-hidden>
            {quizQuestions.map((_, i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full origin-left bg-accent"
                  initial={false}
                  animate={{ scaleX: i < step ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            ))}
          </div>
          <span className="font-mono text-xs text-muted" aria-live="polite">
            {done ? 'Resultado' : `${String(step + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`}
          </span>
        </div>

        <div className="min-h-[22rem]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            {!done ? (
              <motion.fieldset
                key={step}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <legend className="h-display mb-8 text-[clamp(2rem,4.5vw,3.5rem)]">{quizQuestions[step].question}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {quizQuestions[step].options.map((opt) => {
                    const selected = answers[quizQuestions[step].key] === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => choose(quizQuestions[step].key, opt)}
                        aria-pressed={selected}
                        className={cn(
                          'group flex items-center justify-between rounded-2xl border px-5 py-5 text-left text-lg font-semibold transition-colors',
                          selected ? 'border-accent bg-accent/10' : 'border-line hover:border-accent hover:bg-white/[0.02]',
                        )}
                      >
                        {capitalize(opt)}
                        <span className="size-3 rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent" />
                      </button>
                    )
                  })}
                </div>
                {step > 0 && (
                  <button type="button" onClick={back} className="mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-text">
                    <ArrowLeft className="size-4" aria-hidden /> Voltar
                  </button>
                )}
              </motion.fieldset>
            ) : (
              <motion.div
                key="result"
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="eyebrow">Seu plano ideal</p>
                <p className="h-display mt-4 text-[clamp(3rem,8vw,6.5rem)] text-accent">{plan!.name}</p>
                <p className="mt-4 max-w-xl text-muted md:text-lg">{plan!.description}</p>
                <dl className="mt-8 flex flex-wrap gap-2 text-sm">
                  {[
                    ['Objetivo', answers.goal],
                    ['Frequência', `${answers.freq} por semana`],
                    ['Formato', answers.mode && capitalize(answers.mode)],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-full border border-line px-4 py-2">
                      <dt className="sr-only">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <CtaLink href={buildWhatsAppLink(message)} external icon={false}>
                    <WhatsAppIcon className="size-5" /> Falar no WhatsApp
                  </CtaLink>
                  <button type="button" onClick={restart} className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
                    <RotateCcw className="size-4" aria-hidden /> Refazer o quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
