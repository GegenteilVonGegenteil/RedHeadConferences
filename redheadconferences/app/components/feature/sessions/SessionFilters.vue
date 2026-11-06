<script setup lang="ts">
import type { Track } from '~/types/conference';

defineProps<{
    tracks: Track[];
    days: string[];
    levels: string[];
}>();

const selectedTrack = defineModel<string>('track', { required: true });
const selectedDay = defineModel<string>('day', { required: true });
const selectedLevel = defineModel<string>('level', { required: true });

const emit = defineEmits<{ reset: [] }>();
</script>

<template>
    <div class="session-filters">
        <div class="filter-field">
            <label for="track-filter">Track</label>

            <select id="track-filter" v-model="selectedTrack">
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

            <select id="day-filter" v-model="selectedDay">
                <option value="">Alle Tage</option>

                <option
                    v-for="day in days"
                    :key="day"
                    :value="day"
                >
                    {{ day }}
                </option>
            </select>
        </div>

        <div class="filter-field">
            <label for="level-filter">Level</label>

            <select id="level-filter" v-model="selectedLevel">
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
            @click="emit('reset')"
        >
            Filter zurücksetzen
        </button>
    </div>
</template>