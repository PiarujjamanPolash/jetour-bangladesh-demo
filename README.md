# Jetour Bangladesh: website concept demo

A React (Vite) concept website for Jetour Bangladesh, the official Jetour distributor in Bangladesh.
English and Bangla. Prices are not shown: every model has a **Call for price** button and a WhatsApp button.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home: hero film, line-up, 360° T2 i-DM, i-DM trip planner, Travel+, gallery, test drive, showroom |
| `/models` | All models and a side-by-side compare table |
| `/models/t2-idm` | T2 i-DM: design, 360° view, i-DM hybrid explainer, trip planner, interior, features, safety, full specs |
| `/models/dashing` | Dashing: design, interior, features, safety, specs |
| `/models/x70-plus` | X70 Plus: design, interior, features, safety, specs |
| `/test-drive` | Test drive booking (sends the request to WhatsApp). `?model=dashing` preselects a model |
| `/showroom` | Address, map, hours, contact, FAQ |
| anything else | 404 page |

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repo.
2. Vercel detects Vite automatically. The settings are also in `vercel.json`:
   build command `npm run build`, output directory `dist`.
3. Click **Deploy**. `vercel.json` sends every URL to `index.html`, so links like
   `/models/t2-idm` work when opened directly or refreshed.

## Where to change things

- `src/i18n.js`: all English and Bangla page copy
- `src/models.js`: model content (features, specs, compare table) in both languages
- `src/media.js`: every photo and video URL, plus phone, WhatsApp, email and address
- `src/pages/`: one file per page; `src/components/`: shared parts (layout, 360° viewer, trip planner)
- `src/styles.css`: design tokens at the top (colours, type, spacing)

## Media and specs

Photos and video load directly from Jetour's official websites (jetourglobal.com and jetour.co.za).
To host them yourself, download each file into `public/media/` and change its URL in `src/media.js`
to `/media/<file>`.

Specifications come from Jetour global information (the global T2 i-DM specification page and
Jetour South Africa's Dashing and X70 Plus pages). Bangladesh specifications may differ; confirm
them with Jetour Bangladesh before going live.

## Offline preview file

`npm run build:preview` builds the whole site into one file, `preview/index.html`, that opens by
double-clicking (pages use `#/` URLs in that file, e.g. `index.html#/models/t2-idm`).
