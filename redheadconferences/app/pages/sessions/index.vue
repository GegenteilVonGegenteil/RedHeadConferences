<script setup lang="ts">
  import {useConferenceData} from "~/composables/useConferenceData.ts";

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

        <div class="session-filters">
            <div class="filter-field">
                <label for="track-filter">Track</label>

                <select
                    id="track-filter"
                    v-model="selectedTrack"
                >
                    <option value="">Alle Tracks</option>

                    <option
                        v-for="track in tracks"
                        :key="track.id"
                        :value="track.id"
                    >
                        {{ track.name }}
                    </option>
                </select>
            </div>

            <div class="filter-field">
                <label for="day-filter">Konferenztag</label>

                <select
                    id="day-filter"
                    v-model="selectedDay"
                >
                    <option value="">Alle Tage</option>

                    <option
                        v-for="day in conference.dates"
                        :key="day"
                        :value="day"
                    >
                        {{ day }}
                    </option>
                </select>
            </div>

            <div class="filter-field">
                <label for="level-filter">Level</label>

                <select
                    id="level-filter"
                    v-model="selectedLevel"
                >
                    <option value="">Alle Level</option>

                    <option
                        v-for="level in levels"
                        :key="level"
                        :value="level"
                    >
                        {{ level }}
                    </option>
                </select>
            </div>

            <button
                type="button"
                class="button"
                @click="resetFilters"
            >
                Filter zurücksetzen
            </button>
        </div>

        <p aria-live="polite">
            {{ filteredSessions.length }} von
            {{ sessions.length }} Sessions
        </p>

        <p v-if="filteredSessions.length === 0">
            Keine Sessions entsprechen deiner Auswahl.
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