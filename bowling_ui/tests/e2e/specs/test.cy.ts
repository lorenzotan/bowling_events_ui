const EVENTS_URL = "**/api/v1/events/";

describe("Event board", () => {
  it("shows the scoreboard header", () => {
    cy.intercept("GET", EVENTS_URL, { body: [] });
    cy.visit("/");

    cy.contains(".sb-title", "My Bowling World");
    cy.contains(".sb-live-text", "Live Event Board");
  });

  it("renders a card per event", () => {
    cy.intercept("GET", EVENTS_URL, { fixture: "events.json" });
    cy.visit("/");

    cy.get(".sb-card").should("have.length", 2);
    cy.get(".sb-card")
      .first()
      .should("have.attr", "data-category", "league")
      .and("contain", "Fall Classic Mixed League")
      .and("contain", "Cal Bowl · Lakewood");
    cy.get(".sb-card")
      .last()
      .should("have.attr", "data-category", "tournament")
      .and("contain", "Southland Scratch Open");
  });

  it("offers a retry when the API is unreachable", () => {
    cy.intercept("GET", EVENTS_URL, { statusCode: 500 });
    cy.visit("/");

    cy.contains('[role="alert"]', "Couldn't reach the event board");
    cy.intercept("GET", EVENTS_URL, { fixture: "events.json" });
    cy.contains("button", "Retry").click();

    cy.get(".sb-card").should("have.length", 2);
  });
});
