---
name: permias-guardrails
description: Critical architectural guardrails, Supabase safety invariants, and vibe coding rules for PermiasWebsite
---

# PermiasWebsite Architectural Guardrails

## 1. Zero-Regression Routing
- **Never replace `HashRouter` with `BrowserRouter` in `src/App.tsx`**. GitHub Pages is a static server; `BrowserRouter` causes 404 errors on direct path refreshes.

## 2. Supabase Free-Tier Protection
- **Never remove or disable `.github/workflows/supabase-keepalive.yml`**. It prevents Supabase from pausing after 7 days of inactivity.

## 3. Image URL Resolution Invariant
- Media in Supabase or local assets must always be normalized:
  `const imgSrc = url.startsWith("http") ? url : process.env.PUBLIC_URL + url;`

## 4. Secret & Key Security
- `REACT_APP_SUPABASE_ANON_KEY` is the ONLY key allowed on the client.
- NEVER expose or log `service_role` keys, database passwords, or server secrets.
- Verify `.env` is ignored by git.

## 5. Additive Migrations Only
- Never drop columns or tables in production Supabase. Use additive DDL (`ADD COLUMN IF NOT EXISTS`, `ON CONFLICT DO NOTHING`) and compatibility views.

## 6. Pending Supabase Access Priority
- As soon as dashboard access is granted, prioritize running `supabase-events-additive-upgrade.sql` and `supabase-seed-2025-officers.sql`, configuring local `.env`, and setting up the admin user.

