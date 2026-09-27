import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import HomePage from "@/views/HomePage.vue";
import { getEvents } from "@/services/apiClient";

vi.mock("@/services/apiClient", () => ({
  getEvents: vi.fn(),
}));

describe("HomePage.vue", () => {
  test("renders the scoreboard header and live indicator", () => {
    const wrapper = mount(HomePage);

    expect(wrapper.find(".sb-title").text()).toBe("My Bowling World");
    expect(wrapper.find(".sb-live-text").text()).toBe("Live Event Board");
    expect(wrapper.find(".sb-live-dot").exists()).toBe(true);
  });

  test("does not fetch events yet", () => {
    mount(HomePage);

    expect(getEvents).not.toHaveBeenCalled();
  });
});
