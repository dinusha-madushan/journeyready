# JourneyReady

**Smart Travel Planner for Sri Lanka**
*Plan It. Prepare It. Explore It.*

Developer: D.M.D.M. Bandara · Submitted to: White Coder Pvt Ltd

## What it does

| Feature | How it works |
|---|---|
| Destination Explorer | 12 places. Search, filter, save favourites. |
| Live weather | Open-Meteo API. Updates every 10 minutes. Weather page: next 24 hours and 7 days (rain, wind, UV, sunrise, sunset). |
| Near me (live location) | Browser GPS. Shows your spot, address, weather there, nearest places and nearby services. Works as the start of a route. |
| Maps and routes | Leaflet + OpenStreetMap. Road distance and time from Geoapify (or OSRM if no key). |
| Nearby places | Geoapify: restaurants, hotels, hospitals, pharmacies, fuel. |
| Travel alerts | Made from the live forecast. Links to official sites. |
| Itinerary planner | Plan by day. Print, save as PDF, or copy the plan. |
| Smart packing | List changes with trip places, live weather and activities. |
| Budget planner | Set a budget. Track expenses by category. |
| User account | Supabase login. Plans are saved online per user. |

## Tech

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Supabase · Open-Meteo · Leaflet · Geoapify · Selenium

## Run it on your computer

You need Node.js 18 or newer.

```bash
npm install
cp .env.example .env.local      # on Windows: copy .env.example .env.local
npm run dev
```

Open http://localhost:3000

The app works with no keys. Weather and routes work right away.
Add keys to `.env.local` to turn on nearby places and online saving.

## Set up the keys

1. **Geoapify** (free): make a key at https://www.geoapify.com and set `GEOAPIFY_API_KEY`.
   This key is used only on the server. It is never sent to the browser.
2. **Supabase** (free):
   - Make a project at https://supabase.com.
   - Open *SQL Editor*, paste `supabase/schema.sql`, and press *Run*.
   - Open *Project Settings > API*. Copy the project URL and the `anon` key into
     `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - The SQL turns on row level security. Each user can only see their own plan.

Never upload `.env.local` to GitHub. It is already in `.gitignore`.

## Project structure

```
src/app/            pages (/, explore, routes, trip, packing, budget, alerts, login)
src/app/api/        server routes: weather, places, route
src/components/     Header, MapView, TravelMap, ui
src/lib/            destinations, weather, plan (state + saving), auth, packing, alerts
supabase/schema.sql database table and security rules
tests/              Selenium smoke test
```

## Test with Selenium

```bash
npm run dev                      # keep this running
pip install selenium
python tests/smoke_test.py
```

It opens every page, adds a budget expense, and checks form errors.
Also run `npm run typecheck` and `npm run build` before you submit.

## Put it on GitHub

```bash
git init
git add .
git commit -m "JourneyReady first version"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/journeyready.git
git push -u origin main
```

Make small commits often. Your lecturers can see them.

## Deploy on Vercel

1. Push the project to GitHub.
2. At https://vercel.com choose *Add New > Project* and pick the repo.
3. Add the same environment variables from `.env.example`.
4. Press *Deploy*. Then test the live URL.

## Not included in version 1

Hotel or flight booking, online payments, and guaranteed live traffic.
Route times do not include traffic.
