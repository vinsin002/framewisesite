# Framewise — Landing Page

Marketing landing page for the **Framewise** Chrome extension (capture YouTube
lecture slides, annotate them, export PDF study booklets). A static React
(Vite) site — no backend or database required.

```
website_ext/
  client/   React + Vite frontend (the landing page)
```

## Run locally

```bash
cd client
npm install
npm run dev
```

## Build for production

```bash
cd client
npm run build
```

Outputs static files to `client/dist/` — deploy them to any static host
(Vercel, Netlify, GitHub Pages, S3, etc.).

The "Get notified" form opens the visitor's email client via a `mailto:`
link — no server-side signup storage.
