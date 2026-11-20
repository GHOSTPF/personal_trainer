import { plans } from './plans'

export const quizIntro = { eyebrow: 'Quiz', title: 'QUAL PLANO É IDEAL PARA VOCÊ?' }

export type QuizKey = 'goal' | 'freq' | 'mode'
export type QuizAnswers = Partial<Record<QuizKey, string>>

export const quizQuestions: { key: QuizKey; question: string; options: string[] }[] = [
  {
    key: 'goal',
    question: 'Qual é o seu objetivo principal?',
    options: ['Emagrecimento', 'Hipertrofia', 'Condicionamento', 'Saúde e qualidade de vida'],
  },
  {
    key: 'freq',
    question: 'Quantas vezes por semana você consegue treinar?',
    options: ['2x', '3x', '4x', '5x ou mais'],
  },
  {
    key: 'mode',
    question: 'Prefere treinar presencial ou online?',
    options: ['presencial', 'online'],
  },
]

/** Regra de recomendação: online → Consultoria; 4x+ → Plano Ouro; senão → Personal 3x. */
export function recommendPlan(a: QuizAnswers) {
  const byId = (id: string) => plans.find((p) => p.id === id) ?? plans[0]
  if (a.mode === 'online') return byId('online')
  if (a.freq === '4x' || a.freq === '5x ou mais') return byId('ouro')
  return byId('presencial-3x')
}
