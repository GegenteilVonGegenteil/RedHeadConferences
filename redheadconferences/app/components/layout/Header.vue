<script setup lang="ts">
  import ThemeToggle from "~/components/base/ThemeToggle.vue";
</script>
<template>
  <header class="site-header">
    <NuxtLink to="/" class="branding">
      <img alt="" src='@/assets/images/RedheadLogo.svg'>
      <span id="name">Redhead Conferences</span>
      <span id="secondary">/ 2026</span>
    </NuxtLink>
    <nav class="site-nav">
      <NuxtLink class="navlinks" to="/">Home</NuxtLink>
      <NuxtLink class="navlinks" to="/sessions">Sessions</NuxtLink>
      <NuxtLink class="navlinks" to="/mein-programm">Mein Programm</NuxtLink>
    </nav>
    <ThemeToggle/>
  </header>
</template>