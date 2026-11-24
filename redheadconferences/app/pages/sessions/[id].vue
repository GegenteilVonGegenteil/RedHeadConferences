
<script setup lang="ts">
  import Tag from "~/components/feature/sessions/Tag.vue";
  import SpeakerCard from "~/components/feature/sessions/SpeakerCard.vue";
  import ProgramToggleButton from "~/components/feature/program/ProgramToggleButton.vue";

  definePageMeta({
    key: route => route.path
  });

  const route = useRoute();

  const {
    getSessionById,
    getSpeakersByIds,
    getRoomById
  } = useConferenceData();

  const sessionId = String(route.params.id);

  const session = computed(() => getSessionById(sessionId));

  if (!session.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Session nicht gefunden'
    });
  }

  const speakers = computed(() =>
    session.value
      ? getSpeakersByIds(session.value.speakerIds)
      : []
  );

  const room = computed(() =>
    session.value
      ? getRoomById(session.value.roomId)
      : undefined
  );

  useHead(() => ({
    title: `${session.value?.title ?? 'Session'} | Redhead Conferences`
  }));
</script>

<template>
  <div class="session-page" v-if="session">
    <NuxtLink to="/sessions" class="back">Zurück zu Sessions</NuxtLink>
    <section class="tags">
      <Tag :tag="session.trackId" />
      <Tag :tag="session.level" />
      <Tag :tag="session.format" />
    </section>

    <section class="main-session-content">
      <h1>{{session.title}}</h1>
      <p>{{session.abstract}}</p>
    </section>

    <section class="session-details">
        <div class="session-details-box">
          <h2>Wann und Wo?</h2>
          <div class="location-and-time">
            <p>{{formatDate(session.day)}}</p>
            <p>{{session.startTime}} - {{session.endTime}}</p>
            <p>{{room?.name}}</p>

            <ClientOnly>
              <ProgramToggleButton :session-id="session.id"/>
            </ClientOnly>
          </div>
        </div>

      <div class="speakers-box">
        <h2>Mit wem?</h2>
        <ul class="speakers-list">
          <SpeakerCard v-for="speaker in speakers" :key="speaker?.id" :speaker="speaker" />
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>