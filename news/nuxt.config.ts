// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-news/'
  },
  components: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global.scss" as *;',
        }
      }
    }
  },
  typescript: {
    strict: true,
    shim: false,
  },
  build: {
    transpile: ['nuxt']
  },
  nitro: {
    // preset: 'static',
    output: {
      dir: 'dist',
      publicDir: 'dist'
    }
  }
})
