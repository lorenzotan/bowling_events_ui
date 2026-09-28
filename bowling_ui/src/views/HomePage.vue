<template>
  <ion-page>
    <ScoreboardHeader />
    <ion-content :fullscreen="true">
      <p v-if="status === 'loading'" class="sb-message" role="status">
        // Loading events…
      </p>
      <div v-else-if="status === 'error'" class="sb-message" role="alert">
        <p>// Couldn't reach the event board</p>
        <button type="button" class="sb-retry" @click="load">Retry</button>
      </div>
      <p v-else-if="events.length === 0" class="sb-message">
        // No events scheduled
      </p>
      <ul v-else class="sb-list">
        <li v-for="event in events" :key="event.id">
          <EventCard :event="event" />
        </li>
      </ul>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import EventCard from "@/components/EventCard.vue";
import ScoreboardHeader from "@/components/ScoreboardHeader.vue";
import { useEvents } from "@/composables/useEvents";

const { events, status, load } = useEvents();

onMounted(load);
</script>

<style scoped>
.sb-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 14px 16px 24px;
  list-style: none;
}

.sb-message {
  margin: 0;
  padding: 48px 24px;
  font-family: var(--sb-font-mono);
  font-size: 13px;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  color: var(--sb-dim);
}

.sb-message p {
  margin: 0;
}

.sb-retry {
  margin-top: 16px;
  padding: 9px 18px;
  font-family: var(--sb-font-mono);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sb-accent);
  background: color-mix(in srgb, var(--sb-accent) 14%, transparent);
  border: 1px solid var(--sb-accent);
  border-radius: 8px;
  cursor: pointer;
}
</style>
