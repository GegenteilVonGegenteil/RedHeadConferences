<script setup lang="ts">
definePageMeta({
    key: route => route.path
});

const route = useRoute();

const {
    getSpeakerById,
    getSessionsBySpeakerId
} = useConferenceData();

const speakerId = String(route.params.id);

const speaker = getSpeakerById(speakerId);

if (!speaker) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Speaker nicht gefunden'
    });
}

const speakerSessions = getSessionsBySpeakerId(speakerId);

useHead({
    title: `${speaker.name} | Redhead Conferences`
});
</script>

<template>
    <div class="speaker-profile">
        <NuxtLink to="/sessions">
            Zurück zum Konferenzprogramm
        </NuxtLink>

        <section class="speaker-information">
            <h1>{{ speaker.name }}</h1>

            <p class="speaker-position">
                {{ speaker.title }} · {{ speaker.company }}
            </p>

            <p>{{ speaker.bio }}</p>
        </section>

        <section class="speaker-sessions">
            <h2>Sessions von {{ speaker.name }}</h2>

            <ul class="session-list">
                <li
                    v-for="session in speakerSessions"
                    :key="session.id"
                >
                    <article class="session-card">
                        <h3>{{ session.title }}</h3>

                        <p>
                            {{ session.day }},
                            {{ session.startTime }} bis
                            {{ session.endTime }}
                        </p>

                        <NuxtLink :to="`/sessions/${session.id}`">
                            Zur Session
                        </NuxtLink>
                    </article>
                </li>
            </ul>
        </section>
    </div>
</template>