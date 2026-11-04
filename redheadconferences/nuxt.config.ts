import conferenceData from './app/data/conference-data.json';

export default defineNuxtConfig({
  modules: ['@nuxt/fonts', '@nuxt/icon/module'],

  css: [
    '~/assets/css/design-tokens.css',
    '~/assets/css/main.css',
  ],

  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  routeRules: {
    // Speaker-Profile werden beim Build erzeugt.
    '/speakers/**': {
      prerender: true,
    },

    // Die Sessionübersicht wird alle 5 minuten revalidiert.
    '/sessions': {
      isr: 300
    },

    // Sessiondetailseiten werden alle 5 minuten revalidiert.
    '/sessions/**': {
      isr: 300
    },

    // Das persönliche Programm wird im Browser gerendert.
    '/mein-programm': {
      ssr: false,
      prerender: false,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: false,

      // Die 18 Profiladressen werden aus den Daten abgeleitet.
      routes: conferenceData.speakers.map(
        speaker => `/speakers/${speaker.id}`
      ),
    },
  },
});