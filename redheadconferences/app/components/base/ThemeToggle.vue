<script setup lang="ts">
  const { theme } = useTheme();
</script>

<template>
  <ClientOnly>
    <select name="theme" id="themes" aria-label="Theme Toggle" v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </ClientOnly>
</template>