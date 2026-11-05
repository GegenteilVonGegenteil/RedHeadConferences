<script setup lang="ts">
import DaySeperator from "~/components/feature/program/DaySeperator.vue";
import SessionCard from "~/components/feature/sessions/SessionCard.vue";

const props = defineProps<{ savedSessions: Session[] }>();

const sessionsByDay = computed(() => {
  const dayGroups = new Map<string, Session[]>();
  for (const session of props.savedSessions) {
    const list = dayGroups.get(session.day) ?? [];
    list.push(session);
    dayGroups.set(session.day, list);
  }

  return [...dayGroups.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, sessions]) => ({
        day,
        sessions: sessions.sort((a, b) => a.startTime.localeCompare(b.startTime)),
      }))
})
</script>

<template>
  <div v-for="group in sessionsByDay" :key="group.day">
    <DaySeperator :day="group.day" />
    <ul class="program-list">
      <li v-for="session in group.sessions" :key="session.id">
        <SessionCard :session="session" />
      </li>
    </ul>
  </div>
</template>