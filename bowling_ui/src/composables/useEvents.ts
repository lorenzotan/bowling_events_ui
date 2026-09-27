import { ref } from "vue";
import { getEvents, type Event } from "@/services/apiClient";

export type LoadStatus = "loading" | "error" | "ready";

/** Event list plus its fetch status; call `load` to fetch or retry. */
export function useEvents() {
  const events = ref<Event[]>([]);
  const status = ref<LoadStatus>("loading");

  async function load(): Promise<void> {
    status.value = "loading";
    try {
      events.value = await getEvents();
      status.value = "ready";
    } catch {
      status.value = "error";
    }
  }

  return { events, status, load };
}
