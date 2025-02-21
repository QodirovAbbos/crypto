// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', '@nuxtjs/i18n'],
  imports: {
    autoImport: true
  },
  i18n:{
    vueI18n: './i18.config.js'
  },
  ssr:false
})        