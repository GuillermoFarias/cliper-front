// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  css: ["@/assets/main.scss"],
  modules: [
    '@primevue/nuxt-module',
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  primevue: {
    usePrimeVue: true,
    autoImport: true,
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'dark',
          cssLayer: true
        },
        borderRadius: 'cyan'
      },
    },
    components: {
      include: '*',
    },
    directives: {
      include: '*',
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_API_URL || 'http://localhost:8099',
    },
  },
})
