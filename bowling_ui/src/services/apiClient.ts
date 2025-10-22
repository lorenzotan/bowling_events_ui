import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export interface Event {
  id: number;
  name: string;
  category: string;
  start_date: string;
  end_date: string;
  game_day: string;
  game_time: string;
  location_id: number | null;
  registration_url: string;
}

export async function getEvents(): Promise<Event[]> {
  const { data } = await api.get<Event[]>("/events/");
  return data;
}
