
<script setup lang="ts">
const { lastUpdated } = useConferenceData();

const formattedLastUpdated = computed(() => {
    if (!lastUpdated.value) {
        return 'Noch nicht verfügbar';
    }

    return new Date(lastUpdated.value).toLocaleString('de-AT', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Europe/Vienna'
    });
});
</script>

<template>
    <p class="data-update-status" aria-live="polite">
        Datenstand: {{ formattedLastUpdated }}
    </p>
</template>

<style scoped>
.data-update-status {
    font-size: 0.875rem;
    opacity: 0.8;
    margin-block: 0.5rem 1rem;
}
</style>
