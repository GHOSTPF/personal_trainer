/** Bento grid de modalidades. `size` controla o tamanho do card no desktop. TODO ajustar. */
export type Service = {
  title: string
  text: string
  image: string
  size: 'large' | 'wide' | 'tall' | 'small'
}

export const servicesIntro = { eyebrow: 'Modalidades', title: 'DO SEU JEITO' }

export const services: Service[] = [
  {
    title: 'Personal presencial',
    text: 'Treino individual com acompanhamento em cada série, em João Pessoa.',
    image: '/images/servico-presencial.webp',
    size: 'large',
  },
  {
    title: 'Consultoria online',
    text: 'Plano individual + acompanhamento pelo app e WhatsApp, de qualquer lugar.',
    image: '/images/servico-online.webp',
    size: 'tall',
  },
  {
    title: 'Treino em dupla',
    text: 'Mais motivação e um valor melhor para treinar com alguém.',
    image: '/images/servico-dupla.webp',
    size: 'small',
  },
  {
    title: 'Emagrecimento',
    text: 'Força, condicionamento e hábitos para perder gordura de forma sustentável.',
    image: '/images/servico-emagrecimento.webp',
    size: 'small',
  },
  {
    title: 'Hipertrofia',
    text: 'Progressão de carga planejada para ganhar massa muscular com segurança.',
    image: '/images/servico-hipertrofia.webp',
    size: 'wide',
  },
  {
    title: 'Grupo da terceira idade',
    text: 'Força, equilíbrio e autonomia para o dia a dia.',
    image: '/images/servico-terceira-idade.webp',
    size: 'small',
  },
]
