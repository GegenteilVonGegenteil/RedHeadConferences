<script setup lang="ts">
  import Header from "~/components/layout/Header.vue";
  import Footer from "~/components/layout/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<style scoped>

</style>