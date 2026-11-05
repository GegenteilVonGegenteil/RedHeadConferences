<script setup lang="ts">
  defineProps(["speaker"] )
</script>

<template>
  <div class="speakerCard">
    <p>{{speaker.name}}</p>
    <p>{{speaker.title}}  · {{speaker.company}}</p>
    <NuxtLink class="button" :to="`/speakers/${speaker.id}`">{{ speaker.name }} kennenlernen</NuxtLink>
  </div>
</template>

<style scoped>

</style>