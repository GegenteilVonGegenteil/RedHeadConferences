<script setup lang="ts">
  import {useConferenceData} from "~/composables/useConferenceData.ts";
  import SessionFilters from '~/components/feature/sessions/SessionFilters.vue';
  import SessionCard from "~/components/feature/sessions/SessionCard.vue";

const {
    getAllSessions,
    getAllTracks,
    getConference
} = useConferenceData();

const sessions = getAllSessions();
const tracks = getAllTracks();
const conference = getConference();

const {
    selectedTrack,
    selectedDay,
    selectedLevel,
    levels,
    filteredSessions,
    resetFilters
} = useSessionFilters(sessions);
</script>

<template>
    <div class="sessions-page">
        <h1>Programm der {{ conference.name }}</h1>

        <SessionFilters
            v-model:track="selectedTrack"
            v-model:day="selectedDay"
            v-model:level="selectedLevel"
            :tracks="tracks"
            :days="conference.dates"
            :levels="levels"
            @reset="resetFilters"
        />

        <p aria-live="polite">
            {{ filteredSessions.length }} von
            {{ sessions.length }} Sessions
        </p>

        <p v-if="filteredSessions.length === 0">
            Keine Sessions mit dieser Auswahl gefunden.
        </p>

        <ul class="session-list">
            <li
                v-for="session in filteredSessions"
                :key="session.id"
            >
                <SessionCard :session="session" :minimal="false"/>
            </li>
        </ul>
    </div>
</template>