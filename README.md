# Achmad DevOps Portfolio

A modern Next.js 16 portfolio for a DevOps and cloud engineer. The interface uses GSAP route transitions, scroll reveals, and a lightweight Three.js infrastructure object.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace the portrait placeholder

The portrait frame is intentionally a component placeholder. Replace the content inside `components/portrait-frame.tsx` with an image, or add `public/profile.png` and render it with `next/image` using `fill` and `object-fit: cover`.

Recommended source:

- Portrait crop: half body
- Aspect ratio: 4:5
- Format: WebP or optimized PNG
- Minimum size: 1200 × 1500 px

## Data

All portfolio content lives in `lib/data.ts`. When `API_BASE_URL` is configured, project, writing, and certification service functions use the API and fall back to local data if a request fails.

## Routes

- `/`
- `/about`
- `/certifications`
- `/projects`
- `/projects/[id]`
- `/writings`
- Custom `404`

## Browser validation

With the production server running on port 3000:

```bash
npm run browser-check
```

The script checks desktop and mobile viewports, route navigation, console errors, horizontal overflow, and creates screenshots in `browser-artifacts/`.
