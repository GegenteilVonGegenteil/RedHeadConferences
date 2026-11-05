<script setup lang="ts">
 import Separator from "~/components/base/Separator.vue";

 const props = defineProps<{ day: string }>()
</script>

<template>
  <h2>{{day}}</h2>
  <Separator />
</template>

<style scoped>

</style>