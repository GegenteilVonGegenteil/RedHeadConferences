<script setup lang="ts">
import MyProgrammList from "~/components/feature/program/MyProgrammList.vue";
import {useMyProgram} from "~/composables/useMyProgram.ts";

const { savedSessions, isHydrated } = useMyProgram();
</script>

<template>
    <div>
      <h1>Mein Programm</h1>
      <div v-if="!isHydrated" class="skeleton"> Dein Programm wird geladen... </div>
      <p v-else-if="!savedSessions.length"> Noch keine Sessions in deinem Programm</p>
      <div v-else>
        <MyProgrammList :savedSessions="savedSessions" />
      </div>
    </div>
</template>