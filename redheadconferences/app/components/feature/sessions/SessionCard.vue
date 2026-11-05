<script setup lang="ts">
  import ProgramToggleButton from "~/components/feature/program/ProgramToggleButton.vue";

  defineProps<{session: Session}>()
</script>

<template>
  <article class="session-card">
    <div>
      <h3>{{ session.title }}</h3>

      <p>
        {{ session.day }},
        {{ session.startTime }} bis
        {{ session.endTime }}
      </p>

      <NuxtLink :to="`/sessions/${session.id}`">
        Zur Session
      </NuxtLink>
    </div>
    <ProgramToggleButton :session-id="session.id" />
  </article>
</template>