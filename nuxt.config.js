export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,
  mode: 'spa',

  typescript: {
    typeCheck: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RP Character generator',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: 'A RP Character creator' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#111217' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pwa: {
    icon: {
      fileName: 'favicon.png',
    },
    wokbox: {
      enabled: true,
    },
    manifest: {
      name: 'RP Character generator',
      mobileAppIOS: true,
      lang: 'es',
      useWebmanifestExtension: false,
      background_color: '#2d2321',
      theme_color: '#19212d',
    },
  },
};
