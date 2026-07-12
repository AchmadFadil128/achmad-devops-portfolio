# Validation Report

Validated on 12 July 2026.

## Static and build checks

- `npm run typecheck`: passed with strict TypeScript settings.
- `npm run build`: passed on Next.js 16.2.10 with Turbopack.
- Dynamic project routes generated with `generateStaticParams`.
- `npm audit --omit=dev`: 0 known vulnerabilities after the PostCSS override.

## Chromium responsive checks

The browser script checks server-rendered output in headless Chromium at desktop and mobile viewports. It verifies response status, page title, primary heading, navigation visibility, console errors, and horizontal overflow.

Validated pages:

- Desktop home, 1440 × 1000
- Mobile home, 390 × 844
- Desktop projects, 1440 × 1000
- Mobile project detail, 390 × 844
- Desktop profile, 1440 × 1000
- Mobile certifications, 390 × 844
- Desktop writings, 1440 × 1000
- Desktop custom 404, 1440 × 1000

All checks passed. The custom error route returned HTTP 404. No checked page produced horizontal overflow or console errors.

## Environment limitation

The sandbox Chromium policy blocked direct navigation to local HTTP URLs. The validation script therefore fetched the production server output with Node, injected the rendered HTML and compiled CSS into Chromium, and performed responsive layout and console checks there. Run `npm run browser-check` in a normal local environment for the same checks. Interactive GSAP transitions are included in the production code but were not exercised through direct local URL navigation in this sandbox.
