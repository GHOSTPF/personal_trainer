/** Faixa de números (dados da bio do Instagram e do site de referência). */
export type Stat = { prefix?: string; value: number; suffix?: string; label: string }

export const stats: Stat[] = [
  { prefix: '+', value: 200, label: 'alunos atendidos' },
  { value: 4, label: 'planos para sua rotina' },
  { value: 100, suffix: '%', label: 'treino individualizado' },
  { prefix: '+', value: 1500, label: 'seguidores no Instagram' },
]
