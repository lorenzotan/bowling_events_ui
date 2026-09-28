import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import HomePage from "@/views/HomePage.vue";
import { getEvents } from "@/services/apiClient";
import { makeEvent } from "../fixtures/events";

vi.mock("@/services/apiClient", () => ({
  getEvents: vi.fn(),
}));

const mockedGetEvents = vi.mocked(getEvents);

describe("HomePage.vue", () => {
  beforeEach(() => {
    mockedGetEvents.mockReset();
  });

  test("renders the scoreboard header and live indicator", async () => {
    mockedGetEvents.mockResolvedValue([]);
    const wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.find(".sb-title").text()).toBe("My Bowling World");
    expect(wrapper.find(".sb-live-text").text()).toBe("Live Event Board");
  });

  test("shows a loading message while events are fetched", () => {
    mockedGetEvents.mockReturnValue(new Promise(() => {}));
    const wrapper = mount(HomePage);

    expect(wrapper.find('[role="status"]').text()).toContain("Loading events");
  });

  test("renders one card per event", async () => {
    mockedGetEvents.mockResolvedValue([
      makeEvent(),
      makeEvent({ id: 2, name: "Southland Scratch Open", category: "tournament" }),
    ]);
    const wrapper = mount(HomePage);
    await flushPromises();

    const cards = wrapper.findAll(".sb-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].find(".sb-card-name").text()).toBe(
      "Fall Classic Mixed League",
    );
    expect(cards[1].attributes("data-category")).toBe("tournament");
  });

  test("shows an empty message when there are no events", async () => {
    mockedGetEvents.mockResolvedValue([]);
    const wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.find(".sb-message").text()).toContain("No events scheduled");
    expect(wrapper.find(".sb-card").exists()).toBe(false);
  });

  test("shows an error with a retry that refetches", async () => {
    mockedGetEvents
      .mockRejectedValueOnce(new Error("Network Error"))
      .mockResolvedValueOnce([makeEvent()]);
    const wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.find('[role="alert"]').text()).toContain(
      "Couldn't reach the event board",
    );

    await wrapper.find(".sb-retry").trigger("click");
    await flushPromises();

    expect(mockedGetEvents).toHaveBeenCalledTimes(2);
    expect(wrapper.findAll(".sb-card")).toHaveLength(1);
  });
});
