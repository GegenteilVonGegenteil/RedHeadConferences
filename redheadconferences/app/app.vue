<script setup>
import './assets/css/design-tokens.css'
import './assets/css/main.css'

useHead({
  titel: 'Redhead Conferences | FrontendNow',
  htmlAttrs: {
    lang: 'de',
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap',
    },
  ],
})
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-content">
        <NuxtLink to="/" class="brand">
        Redhead Conferences
        </NuxtLink>

        <span class="team-name">
        Von Team Redheads
        </span>
      </div>
    </header>

    <main class="page-content">
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <p>
      Redhead Conferences · FrontendNow · Team Redheads
      </p>
    </footer>
  </div>
</template>
