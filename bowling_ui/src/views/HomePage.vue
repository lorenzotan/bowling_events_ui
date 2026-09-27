<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="event in events" :key="event.id">
          <ion-label>
            <h2>{{ event.name }}</h2>
            <p>Category: {{ event.category }}</p>
            <p>Day: {{ event.game_day }} @ {{ event.game_time }}</p>
            <p>Dates: {{ event.start_date }} → {{ event.end_date }}</p>
            <p v-if="event.registration_url">
              <a :href="event.registration_url" target="_blank">Register</a>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-text v-if="error" color="danger">
        Failed to load Events: {{ error }}
      </ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getEvents, Event } from "@/services/apiClient";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/vue";

const events = ref<Event[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    events.value = await getEvents();
  } catch (err: any) {
    error.value = err.message || "Unknown error";
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
