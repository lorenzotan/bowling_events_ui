import type { Event } from "@/services/apiClient";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const NOON = 12;

/** Display-ready values for a collapsed scoreboard card. */
export interface EventCardView {
  name: string;
  category: string;
  weekday: string;
  date: string;
  time: string;
  place: string;
}

/** Parse a "YYYY-MM-DD" date as a local calendar date, not UTC midnight. */
function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

/** "18:30:00" -> "6:30P" */
function formatShortTime(isoTime: string): string {
  const [hours, minutes] = isoTime.split(":").map(Number);
  const hour12 = hours % NOON || NOON;
  const meridiem = hours >= NOON ? "P" : "A";
  return `${hour12}:${pad(minutes)}${meridiem}`;
}

export function toEventCardView(event: Event): EventCardView {
  const start = event.start_date ? parseIsoDate(event.start_date) : null;
  const location = event.location;

  return {
    name: event.name,
    category: event.category.toLowerCase(),
    weekday: start ? WEEKDAYS[start.getDay()] : "",
    date: start ? `${pad(start.getMonth() + 1)}.${pad(start.getDate())}` : "TBA",
    time: event.game_time ? formatShortTime(event.game_time) : "",
    place: location ? `${location.name} · ${location.city}` : "Location TBA",
  };
}
