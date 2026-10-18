<script setup lang="ts">
  import {useConferenceData} from "~/composables/useConferenceData.ts";

  const {getAllSessions} = useConferenceData();

  const sessions = getAllSessions();
</script>

<template>
  <div class="home">
    <section
      class="hero"
      aria-labelledby="welcome-heading"
    >
      <p class="eyebrow">
        FrontendNow · Deine Konferenz für neue Ideen
      </p>

      <h1 id="welcome-heading">
        Deine nächste Idee beginnt hier.
      </h1>

      <p class="intro">
        Willkommen bei Redhead Conferences.
        Entdecke das Programm von FrontendNow und finde
        Inspiration für deine nächsten Projekte.
      </p>

      <a href="#programm" class="button">
        Zum Programm
      </a>

      <p>Aktuell gibt es {{sessions.length}} Sessions</p>
    </section>

    <section
      id="programm"
      class="program-section"
      aria-labelledby="program-heading"
    >
      <h2 id="program-heading">
        Das erwartet dich
      </h2>

      <p>
        Hier entsteht deine Übersicht über die Sessions
        von FrontendNow.
      </p>

      <article class="placeholder-card">
        <h3>
          Dein Konferenzprogramm
        </h3>

        <p>
          Entdecke spannende Themen und stelle dir
          später dein persönliches Programm zusammen.
        </p>
      </article>
    </section>
  </div>
</template>