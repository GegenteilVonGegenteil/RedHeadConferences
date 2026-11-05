<script setup lang="ts">
const {getConference}= useConferenceData();
const conference = getConference();

</script>

<template>
    <div class="home">
        <section class="hero">
            <p class="eyebrow">
                {{conference.tagline}}
            </p>

            <h1>{{conference.name}}</h1>

            <p class="intro">
              <span v-for="(day, index) in conference.dates" class="intro-text">
                <time>{{formatDate(day)}}</time>
                <span v-if="index < conference.dates.length -1"> / </span>
                <span v-else>, </span>
              </span>
              <span>{{conference.location}}</span>
            </p>

            <NuxtLink to="/sessions" class="button">
                Zum Programm
            </NuxtLink>
        </section>
        <img class="hero-image" alt="" src="@/assets/images/HeroImageLight.svg">
    </div>
</template>