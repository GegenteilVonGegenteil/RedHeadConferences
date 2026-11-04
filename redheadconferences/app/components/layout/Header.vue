<script setup lang="ts">
</script>
<template>
  <header class="site-header">
    <div class="branding">
      <img alt="" src='@/assets/images/RedheadLogo.svg'>
      <span id="name">Redhead Conferences</span>
      <span id="secondary">/ 2026</span>
    </div>
    <nav class="site-nav">
      <NuxtLink class="navlinks" to="/">Home</NuxtLink>
      <NuxtLink class="navlinks" to="/sessions">Sessions</NuxtLink>
      <NuxtLink class="navlinks" to="/speakers">Sprecher</NuxtLink>
      <NuxtLink class="navlinks" to="/myprogram">Mein Programm</NuxtLink>
    </nav>
    <select name="theme" id="themes">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </header>
</template>