# Bluvia Dive (mobile)

Consumer-facing dive tracking app, built with Expo (React Native + TypeScript).
This lives alongside the existing web business dashboard at the repo root — the
two apps are independent and do not share a Supabase project or user pool.

## Stack

- Expo / React Native / TypeScript
- React Navigation (auth stack + bottom tabs)
- Supabase (Auth + Postgres) — project `Bluvia Dive` (`oqcoxzzfewdmcyekizdj`), separate
  from the `Bluvia` project used by the web dashboard
- Dark theme: black background, `#009DFF` accent, glassmorphism cards (`expo-blur` + `expo-linear-gradient`)

## Getting started

```bash
cd mobile
npm install
npm start
```

Environment variables live in `.env` (already populated for the `Bluvia Dive` Supabase
project's public URL + anon key — both safe to expose client-side since access is
governed by RLS). See `.env.example` for the shape.

## What's implemented

- Email/password auth: sign up, log in, forgot password, guest mode
- Diver profile: username, country, bio, experience level, aggregate stats
- Dive logbook: manual dive entry, list, and detail view
- Home screen: streak/best/weekly-monthly stat cards computed from logged dives

## Data model

Two tables, both RLS-locked to the owning user (`auth.uid()`):

- `diver_profiles` — one row per user, auto-created via an `on_auth_user_created_diver`
  trigger on signup
- `dives` — one row per logged dive

## Not yet built (see project spec for full scope)

This is a first slice, not the full spec. Notably absent: Google/Apple native
sign-in (needs native config outside Expo Go), smartwatch sync (Apple Watch/Garmin/
Suunto/Amazfit), live dive tracking, social features, challenges/gamification,
training plans, equipment tracking, the Bluvia Store, admin dashboard, and AI
features. These are large, separable workstreams — happy to scope and build any
of them next.
