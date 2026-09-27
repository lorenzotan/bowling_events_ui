<template>
  <ion-header class="ion-no-border">
    <ion-toolbar>
      <div class="sb-header">
        <h1 class="sb-title">My Bowling World</h1>
        <div class="sb-live">
          <span class="sb-live-dot" aria-hidden="true"></span>
          <span class="sb-live-text">Live Event Board</span>
        </div>
      </div>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar } from "@ionic/vue";
</script>

<style scoped>
.sb-header {
  padding: 6px 16px 14px 20px;
}

.sb-title {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.sb-live {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
}

.sb-live-dot {
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sb-accent);
  box-shadow: 0 0 8px var(--sb-accent);
}

.sb-live-text {
  font-family: var(--sb-font-mono);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sb-muted);
}
</style>
