import { mount, flushPromises } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import HomePage from "@/views/HomePage.vue";
import { getEvents } from "@/services/apiClient";

vi.mock("@/services/apiClient", () => ({
  getEvents: vi.fn(),
}));

describe("HomePage.vue", () => {
  test("renders events returned by the API", async () => {
    vi.mocked(getEvents).mockResolvedValue([
      {
        id: 1,
        name: "Monday Night League",
        category: "league",
        start_date: "2026-01-05",
        end_date: "2026-04-06",
        game_day: "Monday",
        game_time: "19:00",
        location_id: 1,
        registration_url: "https://example.com/register",
      },
    ]);

    const wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.text()).toContain("Monday Night League");
    expect(wrapper.text()).toContain("Category: league");
    expect(wrapper.find("a").attributes("href")).toBe(
      "https://example.com/register",
    );
  });

  test("shows an error message when the API call fails", async () => {
    vi.mocked(getEvents).mockRejectedValue(new Error("Network Error"));

    const wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.text()).toContain("Failed to load Events: Network Error");
  });
});
