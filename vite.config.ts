import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { site } from './src/data/site.ts'

/** Injeta title, metas e JSON-LD a partir de src/data/site.ts */
function siteMeta(): Plugin {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: site.name,
    description: site.seo.description,
    url: site.url,
    image: `${site.url}/og-image.jpg`,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'BR',
    },
    areaServed: [site.city, 'Online'],
    sameAs: [`https://instagram.com/${site.instagram}`],
  }
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_TITLE%', esc(site.seo.title))
        .replaceAll('%SITE_DESCRIPTION%', esc(site.seo.description))
        .replaceAll('%SITE_URL%', esc(site.url))
        .replace('%SITE_JSONLD%', JSON.stringify(jsonLd).replace(/</g, '\u003c'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    rolldownOptions: {
      output: {
        // separa as libs grandes em chunks próprios (melhor cache)
        codeSplitting: {
          groups: [
            { name: 'gsap', test: /node_modules[\\/](gsap|@gsap)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
