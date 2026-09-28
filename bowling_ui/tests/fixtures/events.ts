import type { Event } from "@/services/apiClient";

export function makeEvent(overrides: Partial<Event> = {}): Event {
  return {
    id: 1,
    name: "Fall Classic Mixed League",
    category: "league",
    start_date: "2026-10-06",
    end_date: "2027-03-30",
    game_day: "Tuesday",
    game_time: "18:30:00",
    registration_url: null,
    location_id: 1,
    location: {
      id: 1,
      name: "Cal Bowl",
      address: "2500 E Carson St",
      city: "Lakewood",
      state: "CA",
      zip: "90712",
    },
    ...overrides,
  };
}
