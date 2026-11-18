# Project architecture

This is Philomena Andreas Peace’s executive documentation website. React 19 and TanStack Start serve the homepage through `src/routes/index.tsx`. The root route supplies document metadata from `src/data/site.ts` and imports global CSS.

- `src/components/MarketingPage.tsx`: responsive navigation, services, biography, process, and consultation form.
- `src/styles.css`: ivory, navy, and copper editorial design, responsive layouts, document artwork, and reduced-motion handling.
- `public/__forms.html`: static Netlify Forms registration. Keep the consultation form name and all field names synchronized with the React form.
- `.netlify/features/netlify-forms`: enables form detection during deployment.

Use TypeScript and semantic, accessible HTML. Keep browser-dependent code in event handlers or effects. No custom backend or database is needed. Form submissions POST URL-encoded data to the static registration path; do not POST to the SSR homepage. Preserve pending, success, and error states, timeout handling, and user-entered data on failure.

Do not invent testimonials, outcome statistics, certification organizations, contact information, or a portrait. The hero is an illustrative document, not a real client résumé. Font loading uses Google Fonts with serif and sans-serif fallbacks. Use existing CSS tokens and responsive breakpoints for visual changes.

Run locally with `pnpm install` and `pnpm dev`. Deployment is handled by the Netlify build pipeline; never commit generated build output.
