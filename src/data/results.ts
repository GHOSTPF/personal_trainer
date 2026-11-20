/** Antes e depois. Fotos em public/images/antes-N.webp e depois-N.webp. TODO preencher. */
export type Goal = 'Emagrecimento' | 'Hipertrofia' | 'Condicionamento'

export const resultsIntro = { eyebrow: 'Resultados', title: 'RESULTADOS REAIS — ANTES & DEPOIS' }

export const goals: Goal[] = ['Emagrecimento', 'Hipertrofia', 'Condicionamento']

export type Result = {
  id: number
  goal: Goal
  name: string
  duration: string
  result: string
  before: string
  after: string
}

export const results: Result[] = [
  { id: 1, goal: 'Emagrecimento', name: 'Dayana', duration: '[5 meses]', result: '[-12kg em 5 meses]', before: '/images/antes-1.webp', after: '/images/depois-1.webp' },
  { id: 2, goal: 'Hipertrofia', name: 'Marcela', duration: '[8 meses]', result: '[+6kg de massa magra]', before: '/images/antes-2.webp', after: '/images/depois-2.webp' },
  { id: 3, goal: 'Condicionamento', name: 'Beatriz', duration: '[4 meses]', result: '[Correu os primeiros 10km]', before: '/images/antes-3.webp', after: '/images/depois-3.webp' },
  { id: 4, goal: 'Emagrecimento', name: 'Isabel', duration: '[6 meses]', result: '[-9% de gordura]', before: '/images/antes-4.webp', after: '/images/depois-4.webp' },
]

export const resultsDisclaimer = 'Fotos publicadas com autorização dos alunos.'
