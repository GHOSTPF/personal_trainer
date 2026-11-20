import type { LucideIcon } from 'lucide-react'
import { ClipboardList, Dumbbell, Activity, Target } from 'lucide-react'

export const methodIntro = { eyebrow: 'Método', title: 'COMO FUNCIONA' }

export type MethodStep = { title: string; text: string; icon: LucideIcon }

export const methodSteps: MethodStep[] = [
  {
    title: 'Avaliação física e anamnese',
    text: 'Medidas, composição corporal, histórico de saúde, rotina e objetivo. É daqui que sai cada decisão do seu treino.',
    icon: ClipboardList,
  },
  {
    title: 'Plano de treino individual',
    text: 'Um programa montado para o seu corpo, sua agenda e seu nível — nada de ficha pronta.',
    icon: Dumbbell,
  },
  {
    title: 'Acompanhamento e ajustes',
    text: 'Correção de execução, progressão de cargas e ajustes conforme a sua evolução.',
    icon: Activity,
  },
  {
    title: 'Reavaliação e resultados',
    text: 'Novas medidas a cada ciclo para comparar, comemorar e definir o próximo passo.',
    icon: Target,
  },
]
