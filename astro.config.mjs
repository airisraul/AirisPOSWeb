// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// PENDIENTE: sustituir por el dominio definitivo (se usa en canonical, Open Graph y sitemap).
export default defineConfig({
  site: 'https://www.airispos.es',
  integrations: [sitemap()],
  build: {
    // CSS crítico en línea: evita una petición bloqueante y mejora el LCP.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
