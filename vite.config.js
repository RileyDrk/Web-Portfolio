import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/** GitHub project page: /<repo>/ (e.g. /Web-Portfolio/). Root domains (Vercel, etc.): /. */
function productionBase() {
  const fromEnv =
    typeof process.env.VITE_BASE === 'string' &&
    process.env.VITE_BASE.trim() !== ''
      ? process.env.VITE_BASE
      : null

  if (fromEnv) {
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`
  }

  return '/'
}

function spaFallback404() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      const index = resolve(dist, 'index.html')
      writeFileSync(resolve(dist, '404.html'), readFileSync(index, 'utf8'))
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    command === 'build' ? spaFallback404() : null,
  ].filter(Boolean),
  base: command === 'build' ? productionBase() : '/',
}))
