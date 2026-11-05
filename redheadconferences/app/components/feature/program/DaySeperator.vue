<script setup lang="ts">
 import Seperator from "~/components/base/Seperator.vue";

 const props = defineProps<{ day: string }>()
</script>

<template>
  <h2>{{day}}</h2>
  <Seperator />
</template>

<style scoped>

</style>