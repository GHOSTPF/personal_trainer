/**
 * Planos e preços (atualizados em setembro). Valores mensais.
 */
export type PeriodId = 'mensal'

export const plansIntro = { eyebrow: 'Planos · Preços atualizados', title: 'DESCUBRA O PLANO QUE SE ADEQUA A VOCÊ' }

/** Só um período. O seletor de período só aparece se houver mais de um. */
export const periods: { id: PeriodId; label: string; note?: string }[] = [{ id: 'mensal', label: 'Mensal' }]

export type Plan = {
  id: string
  name: string
  description: string
  /** Valor por mês em cada período */
  prices: Record<PeriodId, number>
  /** Texto ao lado do "/mês" (ex.: "a dupla") */
  priceSuffix?: string
  /** Linha extra abaixo do preço */
  priceNote?: string
  features: string[]
  featured?: boolean
  badge?: string
}

export const plans: Plan[] = [
  {
    id: 'online',
    name: 'Consultoria Online',
    description: 'Acompanhamento à distância, com a mesma metodologia do presencial.',
    prices: { mensal: 200 },
    features: [
      'Treinos em vídeo personalizados',
      'Avaliação postural completa',
      'Acompanhamento progressivo',
      'Atendimento para todo o mundo',
    ],
  },
  {
    id: 'presencial-3x',
    name: 'Personal 3x / semana',
    description: 'Treino presencial individual, 3 vezes por semana em João Pessoa.',
    prices: { mensal: 650 },
    features: [
      'Treino presencial individual',
      '3x por semana',
      'Plano ajustado à sua necessidade',
      'Execução técnica supervisionada',
    ],
  },
  {
    id: 'amigo-3x',
    name: 'Plano Amigo 3x / semana',
    description: 'Treine em dupla com amigo(a), amiga ou casal. R$400 por aluno.',
    prices: { mensal: 800 },
    priceSuffix: 'a dupla',
    priceNote: 'R$400 por aluno',
    features: [
      '3x por semana presencial',
      'Treino em dupla — R$400 por aluno',
      'Ideal para motivação em dupla',
      'Amigo(a), amiga ou casal',
    ],
    featured: true,
    badge: 'Novo',
  },
  {
    id: 'ouro',
    name: 'Plano Ouro',
    description: 'O plano premium completo do Método L|F.',
    prices: { mensal: 1000 },
    features: [
      'Plano premium completo',
      'Treino presencial individual',
      'Acompanhamento prioritário',
      'Estratégia personalizada de evolução',
    ],
  },
]
