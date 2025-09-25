# Playwright End-to-End Test Coverage Plan

This document outlines the initial strategy for using Playwright to cover the
critical user journeys of the neofactory marketing site. Each milestone builds
on the previous to incrementally increase confidence while keeping the suite
fast and maintainable.

## Milestone 1 – Smoke tests (implemented)
- **Home page renders**: Verify the hero headline "One-person factory" is
  visible to catch regressions in the landing page shell.
- **Primary navigation works**: Ensure the "Join Us" call-to-action in the
  header routes to `/contact` and the contact page headline renders.

## Milestone 2 – Interaction basics
- [x] **Plan section visibility**: Assert that the "The path to hyper-scale"
  section is reachable and cards render, confirming scroll-linked content is
  mounted correctly. Covered by `tests/e2e/home.spec.ts`.
- [ ] **Footer links**: Validate that external links such as LinkedIn render
  with the expected `href` attributes.

## Milestone 3 – Contact form validation
- **Required field validation**: Submit the form without data and confirm the
  browser reports validation errors. Requires running the test with a seeded
  `SLACK_BOT_TOKEN` to satisfy server boot requirements.
- **Successful submission flow**: Post a valid payload while stubbing network
  calls to Slack, then check for the confirmation message.

## Milestone 4 – Visual confidence (future)
- Use Playwright's trace viewer and screenshot comparisons for key sections
  once layout stabilizes.

Each milestone can be toggled via test annotations or tags so CI pipelines can
choose between a fast smoke suite and deeper regression coverage as needed.
