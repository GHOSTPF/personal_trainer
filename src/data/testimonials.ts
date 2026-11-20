/** Depoimentos. Avatares em public/images/depoimento-N.webp. TODO preencher com depoimentos reais. */
export type Testimonial = { name: string; time: string; text: string; avatar: string }

export const testimonialsIntro = { eyebrow: 'Depoimentos', title: 'QUEM TREINA, FALA' }

export const testimonials: Testimonial[] = [
  { name: 'Beatriz', time: 'Aluna da consultoria online', text: 'Enquanto eu treino, recebo ajustes, orientações e feedback em cada etapa. Não é só receber uma ficha e treinar sozinho. É ter um profissional acompanhando sua evolução, mesmo à distância.', avatar: '/images/depoimento-1.webp' },
  { name: '[Nome 2]', time: '[Aluno há 6 meses]', text: '[Depoimento curto e real do aluno.]', avatar: '/images/depoimento-2.webp' },
  { name: '[Nome 3]', time: '[Aluna há 2 anos]', text: '[Depoimento curto e real do aluno.]', avatar: '/images/depoimento-3.webp' },
  { name: '[Nome 4]', time: '[Aluno há 8 meses]', text: '[Depoimento curto e real do aluno.]', avatar: '/images/depoimento-4.webp' },
  { name: '[Nome 5]', time: '[Aluna há 3 meses]', text: '[Depoimento curto e real do aluno.]', avatar: '/images/depoimento-5.webp' },
  { name: '[Nome 6]', time: '[Aluno há 1 ano]', text: '[Depoimento curto e real do aluno.]', avatar: '/images/depoimento-6.webp' },
]

/** Grid do Instagram: public/images/insta-1.webp ... insta-6.webp (fotos provisórias do Unsplash, ver public/images/CREDITOS.md) */
const instagramAlts = [
  'Levantamento terra com barra no piso de borracha',
  'Mulher fazendo agachamento com barra no rack',
  'Fileira de halteres na academia',
  'Aluno pegando halteres no suporte',
  'Homem de fone de ouvido entre séries na academia',
  'Halteres e elástico de treino sobre piso de madeira',
]

export const instagramPhotos = instagramAlts.map((alt, i) => ({
  src: `/images/insta-${i + 1}.webp`,
  alt,
}))
