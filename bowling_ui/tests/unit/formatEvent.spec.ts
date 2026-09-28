import { describe, expect, test } from "vitest";
import { toEventCardView } from "@/utils/formatEvent";
import { makeEvent } from "../fixtures/events";

describe("toEventCardView", () => {
  test("formats the scoreboard readout fields", () => {
    expect(toEventCardView(makeEvent())).toEqual({
      name: "Fall Classic Mixed League",
      category: "league",
      weekday: "TUE",
      date: "10.06",
      time: "6:30P",
      place: "Cal Bowl · Lakewood",
    });
  });

  test("reads start_date as a local calendar date", () => {
    const card = toEventCardView(makeEvent({ start_date: "2026-11-01" }));

    expect(card.weekday).toBe("SUN");
    expect(card.date).toBe("11.01");
  });

  test.each([
    ["00:15:00", "12:15A"],
    ["09:00:00", "9:00A"],
    ["12:00:00", "12:00P"],
  ])("formats game_time %s as %s", (gameTime, expected) => {
    expect(toEventCardView(makeEvent({ game_time: gameTime })).time).toBe(
      expected,
    );
  });

  test("lowercases the category", () => {
    expect(toEventCardView(makeEvent({ category: "Tournament" })).category).toBe(
      "tournament",
    );
  });

  test("falls back when date, time and location are missing", () => {
    const card = toEventCardView(
      makeEvent({ start_date: null, game_time: null, location: null }),
    );

    expect(card.weekday).toBe("");
    expect(card.date).toBe("TBA");
    expect(card.time).toBe("");
    expect(card.place).toBe("Location TBA");
  });
});
