import { fileURLToPath } from 'node:url'
import Request from '@gopowerteam/request-generate/vite-plugin'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  css: [
    '@unocss/reset/normalize.css',
    '@/styles/index.scss',
  ],
  runtimeConfig: {
    SD_API_URL: process.env.SD_API_URL,
  },
  imports: {
    dirs: [
      'config',
      'components',
      'components/*/index.ts',
      'components/**',
      'composables',
      'composables/*/index.ts',
      'composables/**',
      'store',
    ],
  },
  vite: {
    plugins: [
      Request({
        alias: '~',
        dir: 'src/http',
        dts: 'src/types/request.d.ts',
      }),
    ],
  },
  modules: [
    ['nuxt-icons', {}],
    ['@unocss/nuxt', {}],
    ['@vue-macros/nuxt', {}],
    ['@pinia/nuxt', {}],
    ['@pinia-plugin-persistedstate/nuxt', {}],
    ['@element-plus/nuxt', {}],
    ['dayjs-nuxt', {}],
    ['nuxt-viewport', {}],
    ['nuxt-lodash', {}],
  ],
  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => stringToCamelCase
      ['kebabCase', 'stringToKebab'], // => stringToKebab
      ['isDate', 'isLodashDate'], // => _isLodashDate
    ],
  },
  elementPlus: { importStyle: 'scss' },
  macros: {},
  pinia: {
    autoImports: [
      'defineStore',
    ],
  },
})
