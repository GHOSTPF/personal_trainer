/**
 * Dados gerais do site. Tudo que está entre [COLCHETES] ou marcado com
 * TODO precisa ser preenchido com a informação real do personal.
 */
export const site = {
  name: 'Lucas Felipe',
  /** Primeiro nome, usado nas mensagens do WhatsApp */
  firstName: 'Lucas',
  cref: '012587-G/PB',
  city: 'João Pessoa',
  state: 'PB',
  /** Só números, com DDI + DDD. TODO */
  whatsapp: '5583986692430',
  /** Sem o @. TODO */
  instagram: 'lucasfelipe.personal',
  email: '' as string,
  /** Horário de atendimento */
  hours: 'Seg a Sex · 5h às 22h',
  /** Domínio final do site, sem barra no fim. TODO */
  url: 'https://www.seudominio.com.br',
  /** Número de alunos atendidos (bio do Instagram) */
  students: 200,

  seo: {
    title: 'Lucas Felipe · Personal Trainer em João Pessoa | Método L|F',
    description:
      'Lucas Felipe, personal trainer em João Pessoa – PB (CREF 012587-G/PB). Método L|F: performance & estética com treino presencial e consultoria online. +200 alunos atendidos.',
  },

  hero: {
    lines: ['TREINOS', 'QUE RESPEITAM', 'SUA ROTINA'],
    /** Promessa + público. TODO ajustar ao público principal */
    subtitle:
      'Performance & estética com o Método L|F — treinos que respeitam sua rotina, presencial em João Pessoa ou online para todo o mundo.',
    primaryCta: 'Agendar pelo WhatsApp',
    secondaryCta: 'Ver resultados',
    image: '/images/lucas-perfil.jpg',
    imageAlt: 'Lucas Felipe, personal trainer, de braços cruzados com a camiseta L|F',
    /** Se houver vídeo curto em loop, coloque o caminho aqui (ex.: '/videos/hero.mp4'). */
    video: null as string | null,
    videoPoster: '/images/lucas-perfil.jpg',
  },

  about: {
    eyebrow: 'Sobre',
    title: 'PERFORMANCE & ESTÉTICA, SEM FIRULA',
    image: '/images/lucas-perfil.jpg',
    imageAlt: 'Lucas Felipe, criador do Método L|F',
    story:
      'O Método L|F parte de um princípio simples: o treino básico, bem executado, conforme a necessidade de cada cliente. Sem firula, sem complicação — apenas o que funciona, aplicado com técnica e constância. Transformar corpos, mentes e vidas: essa é a nossa missão.',
    certifications: [
      'CREF 012587-G/PB',
      'Criador do Método L|F',
      'Avaliação postural',
      '+200 alunos atendidos',
    ],
    quote: 'Performance & estética, sem firula.',
  },

  finalCta: {
    title: 'BORA COMEÇAR?',
    text: 'Agende sua conversa inicial pelo WhatsApp ou acompanhe o dia a dia do Método L|F no Instagram. Atendimento de segunda a sexta, das 5h às 22h.',
    button: 'Agendar pelo WhatsApp',
  },

  credit: { label: 'Desenvolvido por Pablo Tavares', url: 'https://pablotavaresdev.com.br' },
}

export const whatsappMessages = {
  default: `Olá, ${site.firstName}! Vi seu site e quero agendar uma avaliação.`,
  plan: (plan: string, period: string) => `Olá! Tenho interesse no plano ${plan} (${period}).`,
  quiz: (goal: string, freq: string, mode: string, plan: string) =>
    `Olá! Fiz o quiz no site: objetivo ${goal}, ${freq} por semana, ${mode}. O plano indicado foi ${plan}.`,
}
