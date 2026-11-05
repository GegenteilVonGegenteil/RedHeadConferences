<script setup lang="ts">
  defineProps<{speaker: Speaker}>()
</script>

<template>
  <li class="speaker-card" :key="speaker.id">
    <p>{{speaker.name}}</p>
    <p>{{speaker.title}}  · {{speaker.company}}</p>
    <NuxtLink class="button" :to="`/speakers/${speaker.id}`">{{ speaker.name }} kennenlernen</NuxtLink>
  </li>
</template>

<style scoped>

</style>