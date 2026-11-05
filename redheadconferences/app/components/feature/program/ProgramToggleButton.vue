<script setup lang="ts">
  const props = defineProps<{ sessionId: string }>()
  const { inProgram, toggle, isHydrated } = useMyProgram()

  const saved = computed(() =>isHydrated && inProgram(props.sessionId))
</script>

<template>
  <button class="button" :class="{'button-saved': saved}" :disabled="!isHydrated" @click="toggle(props.sessionId)">
    {{ saved ? 'Gespeichert' : 'Speichern' }}
  </button>
</template>

<style scoped>

</style>