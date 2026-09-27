<template>
  <ion-page>
    <ScoreboardHeader />
    <ion-content :fullscreen="true" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import ScoreboardHeader from "@/components/ScoreboardHeader.vue";
</script>
