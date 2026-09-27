import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Event {
  id: number;
  name: string;
  category: string;
  start_date: string | null;
  end_date: string | null;
  game_day: string | null;
  game_time: string | null;
  registration_url: string | null;
  location_id: number | null;
  location: Location | null;
}

export async function getEvents(): Promise<Event[]> {
  const { data } = await api.get<Event[]>("/events/");
  return data;
}
