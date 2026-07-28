# Bowling Events UI — Coding Standards

Vue 3 + Ionic Framework web/mobile client, consuming the [Bowling Events API](../api). TypeScript, Vite, Capacitor for native builds. The actual app lives in `bowling_ui/`; this repo root just wraps it with Docker.

## Tooling

- **Lint:** ESLint (`plugin:vue/vue3-essential`, `eslint:recommended`, `@vue/typescript/recommended`), configured in `bowling_ui/.eslintrc.cjs`. Run with `npm run lint` (from `bowling_ui/`).
- **Pre-commit:** `.pre-commit-config.yaml` runs ESLint on staged `.js`/`.ts`/`.vue` files under `bowling_ui/src/`. It bootstraps its own Node/ESLint — no local Node install required. Install once per clone with `uvx pre-commit install` (run from this `ui/` directory). Run manually with `uvx pre-commit run --all-files`. When upgrading ESLint or its plugins in `bowling_ui/package.json`, bump the matching versions in `.pre-commit-config.yaml`'s `additional_dependencies` and the `rev` in lockstep.
- **Unit tests:** vitest — `npm run test:unit`.
- **E2E tests:** Cypress — `npm run test:e2e`.
- **Type check:** `vue-tsc` (runs as part of `npm run build`).

## Style

- Components use the Composition API with `<script setup lang="ts">` (see `HomePage.vue`) — don't introduce Options API components.
- Component filenames are `PascalCase.vue`; variables and functions are `camelCase`.
- Domain types (e.g. `Event`) are defined once in `src/services/apiClient.ts` next to the API call that returns them, and imported from there — don't redeclare local shadow interfaces in components.
- API field names mirror the backend's `snake_case` JSON verbatim in TypeScript interfaces (`start_date`, `game_day`, etc.) rather than converting to `camelCase` — keeps the interface a direct match to the API response.
- All backend calls go through `src/services/apiClient.ts` (axios), not ad-hoc `fetch`/`axios` calls in components.

## Code Smells

Use [refactoring.guru's code smell catalog](https://refactoring.guru/refactoring/smells) as a review checklist when writing or refactoring components — the categories apply to Vue/TypeScript just as much as any OO or backend code:

- **Bloaters** — long components doing too much (data-fetching + presentation + business logic all in one `.vue` file), props lists that keep growing, primitive obsession (passing five loose strings/numbers around instead of one typed object). `.eslintrc.cjs` doesn't currently enforce complexity/param-count limits; if this becomes a recurring issue, consider adding ESLint's `complexity`, `max-lines-per-function`, `max-params`, and `no-magic-numbers` rules.
- **Needless complexity / duplicate code** — repeated template markup or fetch/error-handling logic across views is a signal to extract a composable (`src/composables/`) or shared component rather than copy-pasting.
- **Dispensables** — dead code (unused components, commented-out template blocks), and components that only pass props straight through without adding behavior.
- **Couplers** — a component reaching into another component's internals, or chaining deep into a response object (`event.location.address.city`) in the template instead of shaping the data at the `apiClient.ts` boundary; watch for "middle man" components that just forward props/emits without doing anything.
- **Object-Orientation Abusers** — less relevant here since Composition API favors functions over classes, but watch for `v-if`/`v-else` chains standing in for what should be separate components (the switch-statement smell, Vue-flavored).

Most of these need judgment during review, not a linter — flag them in code review rather than expecting ESLint to catch them.

## Project structure

- `src/views/` — route-level page components (Ionic pages).
- `src/services/` — API client and shared data-fetching logic.
- `src/router/` — Vue Router route definitions.
- `tests/unit/`, `tests/e2e/` — vitest and Cypress specs respectively.
