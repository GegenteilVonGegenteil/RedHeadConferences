<script setup lang="ts">
import MyProgramList from "~/components/feature/program/MyProgramList.vue";
import {useMyProgram} from "~/composables/useMyProgram.ts";

const { savedSessions, isHydrated } = useMyProgram();
</script>

<template>
    <div>
      <h1>Mein Programm</h1>
      <div v-if="!isHydrated" class="skeleton"> Dein Programm wird geladen... </div>
      <p v-else-if="!savedSessions.length"> Noch keine Sessions in deinem Programm</p>
      <div v-else>
        <MyProgramList :savedSessions="savedSessions" />
      </div>
    </div>
</template>