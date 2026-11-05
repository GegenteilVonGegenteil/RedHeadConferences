<script setup lang="ts">
  import {useConferenceData} from "~/composables/useConferenceData.ts";
  import Separator from "~/components/base/Separator.vue";
  const { getConference } = useConferenceData();
  const conference = getConference();
</script>
<template>
  <footer class="site-footer">
    <span id="name">Redhead Conferences</span>
    <p class="footer-slogan">{{conference.tagline}}</p>
    <Separator/>
    <div class="place-and-time">
      <p v-for="(date, index) in conference.dates">
        {{formatDate(date)}}
        <span v-if="index < conference.dates.length - 1"> / </span>
      </p>
      <p>/ {{conference.location}}</p>
    </div>
  </footer>
</template>