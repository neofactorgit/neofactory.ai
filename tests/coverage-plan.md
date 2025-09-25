# Test Coverage Roadmap

This roadmap expands the existing Playwright smoke plan into a multi-layered test strategy for the entire Remix marketing site. The objective is to reach and sustain **≥80% line and branch coverage** across TypeScript/TSX modules while keeping fast feedback loops locally and in CI.

## 1. Baseline assessment
- **App surface area.** The app exposes a marketing home page with rich media sections, reusable plan cards, and supporting components such as the `DotPattern` background and video-driven hero state.【F:app/routes/_index.tsx†L9-L200】 It also serves a contact form with Upstash rate limiting, Slack handoff, and bot honeypots, plus a thank-you state after successful submissions.【F:app/routes/contact.tsx†L15-L200】 Supporting routes include a downloadable brand-assets catalogue【F:app/routes/brand.tsx†L14-L121】 and a blog that renders cached articles and per-post metadata from filesystem data sources.【F:app/routes/blog+/_index.tsx†L1-L35】【F:app/routes/blog+/'$slug.tsx'†L11-L76】【F:app/lib/blog.server.ts†L1-L35】【F:app/components/article.tsx†L22-L64】
- **Existing automated coverage.** `@playwright/test` is configured in `package.json` and exercised by `tests/e2e/home.spec.ts`, which currently verifies hero rendering, header navigation, and the plan section.【F:package.json†L43-L74】【F:tests/e2e/home.spec.ts†L4-L39】 The GitHub Actions workflow already installs Playwright browsers and runs these smoke checks on pushes and pull requests.【F:.github/workflows/playwright.yml†L1-L26】
- **Uncovered logic hotspots.** Server utilities (Slack client, Upstash Redis bootstrap, mode cookies) run without direct tests despite orchestrating external dependencies.【F:app/lib/slack.server.ts†L1-L31】【F:app/lib/upstash.server.ts†L1-L39】【F:app/services/mode.server.ts†L4-L25】 Client hooks such as `useIsMobile` also lack coverage.【F:app/hooks/useIsMobile.tsx†L3-L14】

## 2. Tooling & instrumentation strategy
1. **Introduce Vitest for unit, hook, and loader/action tests.** Add `vitest`, `@testing-library/react`, and `@testing-library/react-hooks` (or the modern `renderHook` helpers from RTL) as dev dependencies. Configure `vitest` in `vite.config.ts` for Remix SSR support, enabling `globals: true` and `environment: "jsdom"`. Use `c8`/Istanbul instrumentation (`coverage: { provider: "c8", reporter: ["text", "lcov", "html"], lines: 0.8, branches: 0.8 }`).
2. **Extend Playwright usage beyond smoke.** Keep playwright as the system-test layer, but tag tests (e.g., `@smoke`, `@regression`) so CI can run fast checks on PRs and deeper suites nightly. Capture traces and screenshots for flaky investigations.
3. **Wire coverage aggregation.** Vitest will produce `coverage/lcov.info`. For Playwright, rely on scenario counts rather than statement coverage; if desired, leverage browser `coverage.startJSCoverage` hooks to approximate UI coverage but do not gate on it. Publish the Vitest HTML report as a GitHub Actions artifact for regressions.
4. **Local developer workflows.** Add npm scripts: `test:unit` (vitest watch), `test:unit:ci` (vitest --coverage), `test:e2e:smoke` (tagged subset), and `test:e2e:regression` (full suite). Document env var setup (e.g., stub Slack via MSW) in `README` or `/tests/README.md`.

## 3. Coverage targets by layer
| Layer | Focus | Target contribution |
| --- | --- | --- |
| **Unit & hook tests** | Pure functions/utilities (e.g., `mode.server.ts`, `useIsMobile`, `cn` helper).【F:app/services/mode.server.ts†L4-L25】【F:app/hooks/useIsMobile.tsx†L3-L14】【F:app/lib/utils.ts†L1-L5】 | 15% |
| **Server integration tests** | Remix loaders/actions for contact form, blog caching, and global meta loader using mocked upstream services.【F:app/routes/contact.tsx†L21-L200】【F:app/lib/blog.server.ts†L10-L35】【F:app/root.tsx†L32-L108】 | 30% |
| **Component tests** | Deterministic components like `Article`, header/footer, and CTA buttons rendered under jsdom.【F:app/components/article.tsx†L22-L64】【F:app/root.tsx†L135-L190】 | 15% |
| **Playwright E2E** | Critical journeys: marketing home, blog discovery, contact submission (with Slack stub), brand asset downloads.【F:tests/e2e/home.spec.ts†L4-L39】【F:app/routes/blog+/_index.tsx†L18-L35】【F:app/routes/brand.tsx†L14-L121】 | Confidence layer (no direct % but guards regressions) |

Combined, the first three layers should raise statement/branch coverage above 80%, while Playwright guards end-to-end behavior.

## 4. Detailed test mapping
### Global shell (`app/root.tsx`)
- **Unit tests:** Assert `links()` emits Tailwind/visually-hidden CSS and `meta()` returns complete Open Graph/Twitter metadata.【F:app/root.tsx†L25-L108】
- **Component tests:** Render `<Document>` in jsdom to verify header links (LinkedIn CTA, Join Us) and footer snapshots, stubbing Remix context.
- **Integration tests:** Use Vitest to exercise the root loader, passing mocked `Request` objects to confirm canonical URL formation.【F:app/root.tsx†L32-L37】

### Home route (`app/routes/_index.tsx`)
- **Component tests:** Snapshot or DOM-based tests for `Plan` card rendering and hero copy under various viewport mocks. Mock `useVideoBackground` to avoid HLS dependencies.【F:app/routes/_index.tsx†L46-L177】
- **E2E:** Extend Playwright to cover demo video controls, mission section CTA visibility, and accessibility assertions (tab order, skip links).

### Blog listing and detail (`app/routes/blog+/_index.tsx`, `'$slug.tsx'`, `app/lib/blog.server.ts`, `app/components/article.tsx`)
- **Server tests:** Stub `process.env.VERCEL_ENV` to toggle between static and dynamic blog sourcing and verify caching via `LRUCache`.【F:app/lib/blog.server.ts†L10-L35】
- **Component tests:** Mount `Article` with preview and full states to ensure author blocks and sanitized HTML rendering behave correctly.【F:app/components/article.tsx†L22-L64】
- **E2E:** Add Playwright flows for `/blog` list ordering by `publishedAt` and navigation into detail pages, checking meta tags if feasible via API.

### Contact form (`app/routes/contact.tsx`, `app/lib/slack.server.ts`, `app/lib/upstash.server.ts`)
- **Integration tests:** Use Vitest with `unstable_createRemixStub` (or direct action invocation) to simulate POST submissions: happy path, missing fields, honeypot triggers, rate-limit rejections. Mock Slack and Upstash modules via `vi.mock` to assert message payloads without network calls.【F:app/routes/contact.tsx†L21-L99】【F:app/lib/slack.server.ts†L1-L31】【F:app/lib/upstash.server.ts†L1-L39】
- **E2E:** Implement Playwright tests that seed fake tokens through environment variables, intercept Slack POSTs, and verify thank-you state animations in the UI.【F:app/routes/contact.tsx†L100-L200】

### Brand assets (`app/routes/brand.tsx`)
- **Component tests:** Ensure download links point to the correct asset filenames and variants (SVG/PNG).【F:app/routes/brand.tsx†L29-L116】
- **E2E:** Validate that each download anchor resolves to HTTP 200 and correct MIME type using `page.waitForEvent("download")`.

### Mode persistence & hooks (`app/services/mode.server.ts`, `app/types/validators.ts`, `app/hooks/useIsMobile.tsx`)
- **Unit tests:** Validate cookie serialization/deserialization and system-mode clearing, including invalid cookie fallbacks.【F:app/services/mode.server.ts†L6-L25】【F:app/types/validators.ts†L3-L7】
- **Hook tests:** Simulate `window.resize` events to ensure `useIsMobile` updates thresholds as expected.【F:app/hooks/useIsMobile.tsx†L3-L14】

## 5. Implementation phases
1. **Phase 0 – Tool bootstrap (Week 1).** Install Vitest/RTL, configure coverage, add npm scripts, and create a `tests/setup.ts` to mock Remix globals. Target: passing `vitest --coverage` with ~30% initial coverage from a few high-value unit tests.
2. **Phase 1 – Server critical paths (Weeks 2-3).** Cover contact action edge cases, blog loader caching, and mode cookies. Expect coverage to climb into the 60-70% range because these modules dominate server logic.
3. **Phase 2 – Component and hook polish (Weeks 3-4).** Add DOM-focused tests for `Article`, header/footer, and `useIsMobile`. Combine with accessibility assertions using `@testing-library/jest-dom`. Coverage goal: 75%+.
4. **Phase 3 – End-to-end deepening (Week 4).** Expand Playwright suite (blog navigation, contact happy path, brand asset downloads) and introduce network stubbing patterns. While E2E does not change coverage metrics, it raises confidence for high-traffic paths.
5. **Phase 4 – Coverage gate (Week 5).** Enforce ≥80% thresholds in Vitest config, add CI coverage summary comments via `actions/upload-artifact` + `coverallsapp/github-action` or `dorny/test-reporter`. Fail the build if coverage dips below target.

## 6. Continuous Integration integration
- **Workflow consolidation.** Extend `.github/workflows/playwright.yml` with additional jobs:
  - `unit-tests`: run `npm ci`, `npm run test:unit:ci`, upload `coverage/` as artifact, and enforce coverage thresholds.
  - `lint`: keep ESLint timing script (`npm run lint`) to guard style regressions.【F:package.json†L61-L64】
  - `playwright-regression`: matrix job triggered nightly or via workflow dispatch for full regression tag.
- **Caching & parallelism.** Use `actions/setup-node` with `cache: npm` (already present) and share Playwright browsers via `npx playwright install --with-deps` caching between jobs.【F:.github/workflows/playwright.yml†L13-L26】 Consider `actions/cache` for `.playwright` directory.
- **Reporting.** After Vitest run, execute `npx vitest --coverage --reporter=json-summary` and feed results to GitHub Checks annotations. Optionally integrate Codecov for trend tracking.

## 7. Governance & maintenance
- **Definition of done.** Every PR must include at least one automated test that exercises new or changed logic, with coverage checks passing locally before review.
- **Flake management.** Capture Playwright traces on failure (`--trace=on-first-retry`), add retry logic sparingly, and quarantine flaky specs via `test.fixme` while investigating root causes.
- **Documentation.** Maintain `/tests/README.md` (or this roadmap) with instructions for running tests locally, updating as new suites land. Include environment variable requirements for server-side tests (Slack/Upstash) and recommended stubs.

Following this roadmap will give the team a clear path to 80%+ measured coverage while ensuring high-fidelity end-to-end confidence for critical marketing funnels.
