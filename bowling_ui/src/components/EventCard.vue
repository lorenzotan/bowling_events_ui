<template>
  <article class="sb-card" :data-category="card.category">
    <div class="sb-card-accent" aria-hidden="true"></div>
    <div class="sb-card-summary">
      <div class="sb-card-time">
        <div class="sb-card-day">{{ card.weekday }}</div>
        <div class="sb-card-date">{{ card.date }}</div>
        <div class="sb-card-hour">{{ card.time }}</div>
      </div>
      <div class="sb-card-body">
        <h2 class="sb-card-name">{{ card.name }}</h2>
        <div class="sb-card-loc">{{ card.place }}</div>
      </div>
      <span class="sb-card-badge">{{ card.category }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Event } from "@/services/apiClient";
import { toEventCardView } from "@/utils/formatEvent";

const props = defineProps<{ event: Event }>();

const card = computed(() => toEventCardView(props.event));
</script>

<style scoped>
.sb-card {
  position: relative;
  overflow: hidden;
  background: var(--sb-surface);
  border: 1px solid var(--sb-border);
  border-radius: 10px;
}

.sb-card-accent {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 3px;
  background: var(--sb-dim);
}

.sb-card[data-category="league"] {
  --card-color: var(--sb-accent);
}

.sb-card[data-category="tournament"] {
  --card-color: var(--sb-alert);
}

.sb-card[data-category="league"] .sb-card-accent,
.sb-card[data-category="tournament"] .sb-card-accent {
  background: var(--card-color);
  box-shadow: 0 0 8px var(--card-color);
}

.sb-card-summary {
  display: flex;
  align-items: stretch;
  gap: 12px;
  padding: 12px 14px;
}

.sb-card-time {
  flex: 0 0 52px;
  margin-right: 2px;
  padding: 0 10px 0 6px;
  border-right: 1px solid var(--sb-divider);
  font-family: var(--sb-font-mono);
  text-align: center;
}

.sb-card-day {
  font-size: 9.5px;
  letter-spacing: 0.1em;
  color: var(--sb-dim);
}

.sb-card-date {
  margin: 2px 0;
  font-size: 16px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--sb-text);
}

.sb-card-hour {
  font-size: 10px;
  color: var(--sb-subtle);
}

.sb-card-body {
  flex: 1;
  min-width: 0;
}

.sb-card-name {
  margin: 0 0 4px;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.3;
}

.sb-card-loc {
  font-size: 11.5px;
  color: var(--sb-subtle);
}

.sb-card-badge {
  align-self: flex-start;
  margin-top: 1px;
  padding: 4px 7px;
  border-radius: 5px;
  font-family: var(--sb-font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
  color: var(--card-color, var(--sb-subtle));
  background: color-mix(in srgb, var(--card-color, var(--sb-subtle)) 14%, transparent);
}
</style>
