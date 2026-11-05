<script setup lang="ts">
 defineProps<{tag: Session['trackId'] | Session['level'] | Session['format']}>()
</script>

<template>
  <p class="tag">{{tag}}</p>
</template>