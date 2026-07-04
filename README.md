# HOOKS — Storefront

Production storefront for **HOOKS**, an Indian streetwear label. Next.js (App
Router) + TypeScript (strict) + Tailwind v4. No backend — orders complete over
WhatsApp with a pre-filled message.

## Quick start

```bash
npm install
cp .env.example .env.local   # then set your WhatsApp number
npm run dev                  # http://localhost:3000
```

## Configuration

All brand-level constants live in [`lib/site.ts`](lib/site.ts). Environment
overrides (see [`.env.example`](.env.example)):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Order line, digits only w/ country code, e.g. `9198…` |
| `NEXT_PUBLIC_SITE_URL` | Absolute base for metadata / OpenGraph |

## Where things live

- **Product data (single source of truth):** [`data/products.ts`](data/products.ts)
  + [`data/types.ts`](data/types.ts). Swap the arrays for a CMS fetch of the
  same shape and every component keeps working (they read via the selector
  helpers).
- **Design tokens:** `@theme` block in [`app/globals.css`](app/globals.css)
  (`bg-ink`, `text-bone`, `text-ash`, `bg-signal`, `text-on-accent`,
  `border-hairline`, …).
- **Cart:** [`store/cart.ts`](store/cart.ts) — Zustand, persisted to
  localStorage. **Drawer state:** [`store/ui.ts`](store/ui.ts).
- **WhatsApp checkout:** [`lib/whatsapp.ts`](lib/whatsapp.ts).
- **Logo:** [`components/brand/Logo.tsx`](components/brand/Logo.tsx) — drop your
  SVG/PNG in `/public` and swap the text span.

## Images

Product, category and lookbook imagery is served from **Unsplash** and defined
in [`data/products.ts`](data/products.ts) (`img()` helper + `POOL` of photo
ids). The host is allowlisted in [`next.config.ts`](next.config.ts). Swap these
URLs for your own product photography before launch — change nothing else.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
