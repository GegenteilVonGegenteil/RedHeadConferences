<script setup lang="ts">
  import {useConferenceData} from "~/composables/useConferenceData.ts";
  import SessionFilters from '~/components/feature/sessions/SessionFilters.vue';

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
                <article class="session-card">
                    <h2>{{ session.title }}</h2>

                    <p>
                        {{ formatDate(session.day) }},
                        {{ session.startTime }} bis
                        {{ session.endTime }}
                    </p>

                    <p>{{ session.level }}</p>

                    <NuxtLink :to="`/sessions/${session.id}`">
                        Details ansehen
                    </NuxtLink>
                </article>
            </li>
        </ul>
    </div>
</template>