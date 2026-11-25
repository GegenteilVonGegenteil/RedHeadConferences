import conferenceData from './app/data/conference-data.json';

export default defineNuxtConfig({
  modules: ['@nuxt/fonts', '@vite-pwa/nuxt'],

  css: [
    '~/assets/css/design-tokens.css',
    '~/assets/css/main.css',
  ],

  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  routeRules: {
    // Startseite benutzt SSG
    '/': {
      prerender: true,
    },

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
  pwa: {
    registerType: 'autoUpdate',

    workbox: {
      globPatterns: ['**/*.{html,js,css,png,svg,ico,webmanifest,woff2}'
      ],
      navigateFallback: '/',
      navigateFallbackAllowlist: [
        /^\/$/,
        /^\/mein-programm\/?$/,
      ],
      runtimeCaching: [
        {
          // Session- und Speaker-Daten gemäß Offline-Konzept
          urlPattern: /\/api\/conference$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'redhead-conference-data',
            cacheableResponse: {
              statuses: [200]
            }
          }
        }
      ]
    },

    strategies: 'generateSW',
    manifest: {
      id: '/',
      name: 'Redhead Conferences',
      short_name: 'Redhead Conferences',
      description: 'Redhead Conferences ist die Konferenzplattform für Frontend-Entwickler:innen am Beginn ihrer Karriere.',
      start_url: '/',
      display: 'standalone',
      background_color: '#F5F5F5',
      theme_color: '#000F2B',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ]
    }
  },
});