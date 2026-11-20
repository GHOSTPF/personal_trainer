import { site, whatsappMessages } from '@/data/site'

export function buildWhatsAppLink(msg: string = whatsappMessages.default) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}
