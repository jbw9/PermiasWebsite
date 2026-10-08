# AGENTS.md — Contributor & AI Agent Engineering Manual

> **Repository**: [jbw9/PermiasWebsite](https://github.com/jbw9/PermiasWebsite)  
> **Production URL**: [permiasuiuc.com](https://permiasuiuc.com)  
> **Host**: GitHub Pages via GitHub Actions (`.github/workflows/main.yml`)  
> **Backend & Database**: Supabase (PostgreSQL, Storage, Auth)

---

## 1. Project Identity & Context

**PERMIAS UIUC** (Persatuan Mahasiswa Indonesia di Amerika Serikat - University of Illinois Urbana-Champaign), also known as the **Indonesian Students Club (ISC)**, is the official organization uniting Indonesian students and scholars at UIUC and showcasing Indonesian cultural heritage to the greater Champaign-Urbana and Midwest community.

### Core Website Purposes
1. **Community Hub**: Official source of truth for prospective, incoming, and returning Indonesian students (Housing, Packing, Transit, Banking guides).
2. **Event Showcase & Ticketing**: Promotes flagship annual events (Pasar Malam / Pasmal, Welcoming Event, Batik Day, Buka Bersama, Pumpkin Potluck) with upcoming announcements and past event retrospective galleries.
3. **Leadership Directory**: Showcases annual executive board officers with roles, bios, and LinkedIn/Instagram links.
4. **Dynamic CMS & Analytics**: In-house admin dashboard (`/#/admin`) providing non-developer board members the ability to edit text/photos and view privacy-preserving visitor analytics (via `page_views` and `link_clicks`).

### Brand Tokens & Design System
- **Navy (UIUC Blue / Footer)**: `#13294b`
- **Crimson (Indonesian Red)**: `#8c0305`
- **Ground Base**: `#fafafa`
- **Surface / Light Gray**: `#f5f5f7`
- **Typography**: `Chivo`, sans-serif (configured in Tailwind)

---

## 2. Inviolable Architectural Invariants ("Do Not Break the Live Site")

Any agent or contributor modifying this codebase **must** uphold the following invariants without exception:

### A. Routing Invariant: Keep `HashRouter`
- **Rule**: Never convert `<HashRouter>` to `<BrowserRouter>` in [`src/App.tsx`](src/App.tsx) unless a full GitHub Pages 404 rewrite proxy (e.g., `404.html` SPA hack) is explicitly implemented and verified.
- **Why**: GitHub Pages is a static file host. Without server-side URL rewrite rules, any browser reload on a route like `permiasuiuc.com/events` returns an HTTP 404 error under `BrowserRouter`. `HashRouter` (`/#/events`) guarantees zero routing failure across all static CDNs.

### B. Environment Variables & Client Keys
- **Rule**: Client variables must use the Create React App prefix `REACT_APP_*` (e.g., `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`).
- **Rule**: **Never** expose or commit the Supabase `service_role` key, database passwords, or server secrets to client code or repository commits.
- **Rule**: `.env` and `.env.*` files are strictly excluded in `.gitignore`. Production variables are injected securely via GitHub Secrets in [`.github/workflows/main.yml`](.github/workflows/main.yml).

### C. Image & Media URL Normalization
- **Rule**: Image sources in the database can be **either**:
  1. A relative path hosted in the `/public` folder on GitHub Pages (e.g., `/events/welcoming_event_2024/one.png` or `/officers/leon 2024.png`).
  2. A full public URL uploaded to Supabase Storage (e.g., `https://<ref>.supabase.co/storage/v1/object/public/permias-media/...`).
- **Invariant**: Always normalize image paths using the established pattern:
  ```ts
  const imgSrc = url.startsWith("http") ? url : process.env.PUBLIC_URL + url;
  ```
  Failing to do this will produce broken images on production GitHub Pages subpaths and custom domains.

### D. Supabase Free-Tier Keep-Alive
- **Rule**: Supabase free-tier projects automatically pause after 7 days of inactivity.
- **Invariant**: Do not delete or disable [`.github/workflows/supabase-keepalive.yml`](.github/workflows/supabase-keepalive.yml). It pings `$SUPABASE_URL/rest/v1/site_content?select=id&limit=1` every 3 days at 00:00 UTC to maintain database availability.

### E. Additive Database Migrations
- **Rule**: Never execute destructive SQL (`DROP TABLE`, `DROP COLUMN`) against live production tables.
- **Invariant**: All schema updates must be additive (`ADD COLUMN IF NOT EXISTS`, `CREATE TABLE IF NOT EXISTS`, `ON CONFLICT DO NOTHING`). When migrating legacy data models (such as merging `past_events` and `upcoming_events`), create compatibility views or support fallback columns to prevent breaking deployed client code.

---

## 3. Vibe Coding & Agentic Safety Mandates

All agent actions and pull requests must comply with the following safety checklist:

### 1. Architectural & Integration Mandates
- **Resilient Integrations**: Prefer official APIs. If web scraping or automated data retrieval is needed, never use brittle CSS/DOM selectors. Guide extraction with LLM-powered browser automation backed by strict validation schemas (e.g., Zod).
- **Authentication Security**: Never write server-side code or client helpers that store, log, or transmit plaintext passwords. Enforce standardized Supabase Auth flows (`supabase.auth.signInWithPassword` or OAuth).
- **MFA / Security Boundaries**: Never attempt to programmatically bypass MFA, CAPTCHAs, or biometric gates.
- **Strict Typing**: Strict TypeScript is enforced across the entire stack. All code must pass `./node_modules/.bin/tsc --noEmit` with zero errors before merging.

### 2. Vibe Coding & Agentic Safety Checklist
- **Untrusted by Default**: Treat all LLM outputs and external inputs as untrusted. Never use LLM-generated payloads directly for authorization checks, database access controls, or session validation.
- **Server-Side / Boundary Validation**: All incoming API data and user forms must be validated against defined schemas (e.g., Zod schemas or strict TypeScript interfaces) before touching Supabase.
- **Zero Custom Auth**: Do not write homemade password hashing, JWT parsers, or session managers. Always use Supabase Auth.
- **Least Privilege & RLS**: All Supabase tables must have Row Level Security (RLS) enabled.
  - Public `SELECT` allowed on published content (`officers`, `past_events`, `upcoming_events`, `site_content`).
  - Public `INSERT` restricted to tracking tables (`page_views`, `link_clicks`).
  - Mutations (`INSERT`, `UPDATE`, `DELETE`) restricted to `auth.role() = 'authenticated'`.
- **No Secret Leakage**: Verify `.env` is absent from git staging. Verify no hardcoded API keys or Supabase service keys exist in client bundles.
- **Cost & Loop Controls**: Implement circuit breakers, debouncing, and rate limits on analytics, storage uploads, and external API calls to prevent runaway loops.
- **Aggressive Caching**: Utilize client-side caching (as implemented in `useSiteContent.ts`) to avoid redundant REST queries on static content.
- **Idempotent Operations**: Database mutations must be idempotent using `upsert` with explicit `onConflict` keys or unique constraints.
- **Mocked Testing**: Mock all external API calls and Supabase network requests during automated unit tests.

---

## 4. Permissions Matrix: What You Need to Contribute

To contribute effectively to PermiasWebsite and perform major upgrades, ensure you have obtained the following permissions from the organization administrators:

| Resource | Scope / Role Needed | Purpose | How to Request |
| :--- | :--- | :--- | :--- |
| **GitHub Repository** | `Collaborator` (Write access) or Fork with PR review permissions | Pushing feature branches, opening PRs, triggering Actions | Ask repository owner (`jbw9`) to add your GitHub username |
| **GitHub Actions Secrets** | Repository Admin or Environment access | Setting `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` for CI/CD builds | Configure under Repo Settings → Secrets and variables → Actions |
| **GitHub Pages** | Repo Admin | Custom domain settings (`permiasuiuc.com`), Enforce HTTPS, CNAME preservation | Configure under Repo Settings → Pages |
| **Supabase Project** | `Developer` or `Owner` on Supabase Org | Access to Supabase Studio SQL Editor, Table Editor, Storage bucket policies, Authentication users | Ask project owner to invite your email via Supabase Dashboard → Members |
| **Supabase Auth User** | Admin email / password record | Logging into `/#/admin` to manage live officers, site content, and events | Created via Supabase Dashboard → Authentication → Users → Add User |
| **Supabase Storage** | Read/Write access on `permias-media` | Uploading high-res event posters, officer headshots, and site banners | Bucket must be Public with RLS allowing authenticated uploads |
| **DNS / Registrar** | UIUC domain manager / Cloudflare / GoDaddy | Editing A / CNAME records if updating hosting or SSL certificates | Contact UIUC student organization tech lead or treasurer |

---

### 🚨 IMMEDIATE PRIORITY ON ACCESS GRANTED: Supabase Runbook

As soon as Supabase Dashboard access is granted, execute the following priority runbook in order:

1. **Configure Local Secrets (`.env`)**:
   - Navigate to **Project Settings** → **API**.
   - Copy **Project URL** and **Project API keys: `anon` (public)**.
   - Create a local `.env` file (strictly excluded by `.gitignore`):
     ```env
     REACT_APP_SUPABASE_URL=https://<your-project-ref>.supabase.co
     REACT_APP_SUPABASE_ANON_KEY=<your-anon-key>
     ```
   - Restart the local development server with `npm run dev`.

2. **Run Additive Events Upgrade**:
   - Open **SQL Editor** in Supabase Studio.
   - Run [`supabase-events-additive-upgrade.sql`](supabase-events-additive-upgrade.sql).
   - This adds `rsvp_url`, `ticket_url`, `ticket_price`, `capacity`, and `cover_image` to `upcoming_events`, adds structured timestamps to `past_events`, and installs the `auto_archive_past_events()` function.

3. **Seed the 2025/2026 Officer Roster**:
   - In **SQL Editor**, run [`supabase-seed-2025-officers.sql`](supabase-seed-2025-officers.sql).
   - *(Optional)*: Uncomment `TRUNCATE TABLE officers;` if replacing the previous year's board entirely.

4. **Verify Storage Bucket**:
   - Navigate to **Storage** → verify bucket `permias-media` exists and is set to **Public**.

5. **Create Admin User**:
   - Navigate to **Authentication** → **Users** → **Add User** to create your login for `/#/admin`.

---

## 5. Current Data Schema vs. Future Events & UI/UX Overhaul

### Current Events Architecture (Limitations)
Currently, events are split into two completely separate, disjoint tables:

```sql
-- 1. past_events: Freeform string dates and image array
CREATE TABLE past_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT NOT NULL,          -- e.g. 'August 31 2024, Scotts Park' (unparsed string)
  images TEXT[] DEFAULT '{}',  -- array of public URL strings
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. upcoming_events: Timestamped but lacks rich event metadata
CREATE TABLE upcoming_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Why the Current Setup Needs Refactoring:
1. **Manual Lifecycle Toil**: When an upcoming event passes, an admin must manually delete it and re-enter it into `past_events` with manual image arrays.
2. **Missing Upcoming Media & RSVP**: `upcoming_events` lacks cover images, RSVP URLs, ticket links, schedule itineraries, and category tags.
3. **Unstructured Past Dates**: `past_events.date` stores strings like `"March 23 2024, Orchard Downs Community Center"`, making programmatic sorting, filtering by year/semester, and calendar sync fragile.

---

### Target Unified Events Schema (Zero-Downtime Migration)

To support a state-of-the-art UI/UX redesign with RSVP, ticketing, photo galleries, category filters, and automatic upcoming-to-past transitions, use the unified `events` table architecture:

```sql
-- Unified Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'General',     -- e.g. 'Cultural', 'Social', 'Career', 'Fundraiser'
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location_name TEXT DEFAULT '',
  location_address TEXT DEFAULT '',
  google_maps_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  cover_image_url TEXT DEFAULT '',
  gallery_images TEXT[] DEFAULT '{}',  -- Retrospective photo gallery
  rsvp_url TEXT DEFAULT '',
  ticket_url TEXT DEFAULT '',
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',     -- 'draft', 'published', 'cancelled'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Auth write events" ON events FOR ALL USING (auth.role() = 'authenticated');

-- Non-Breaking Backward-Compatibility Views for Legacy Components:
CREATE OR REPLACE VIEW upcoming_events_view AS
  SELECT 
    id, 
    title, 
    start_time AS date, 
    location_name AS location, 
    description, 
    created_at
  FROM events
  WHERE start_time >= NOW() AND status = 'published'
  ORDER BY start_time ASC;

CREATE OR REPLACE VIEW past_events_view AS
  SELECT 
    id, 
    title AS name, 
    TO_CHAR(start_time, 'FMMonth DD, YYYY') || CASE WHEN location_name != '' THEN ', ' || location_name ELSE '' END AS date,
    gallery_images AS images, 
    display_order, 
    created_at
  FROM events
  WHERE start_time < NOW() AND status = 'published'
  ORDER BY start_time DESC;
```

---

## 6. UI/UX Redesign Roadmap for Events & Website

When upgrading the website layout and user experience, follow these design principles:

### A. Events Page UI/UX Redesign
1. **Interactive Event Switcher**:
   - Clean segmented toggle: `Upcoming (N)` | `Past Galleries` | `All Events`.
   - Category chips: `All`, `Cultural`, `Social`, `Professional`, `Sports`.
2. **Upcoming Event Cards (Modern Bento / Card Layout)**:
   - High-contrast date badge (Month, Day, Day-of-week).
   - Dynamic Countdown timer for the next flagship event (e.g., Pasar Malam).
   - Quick action buttons: `Add to Calendar (.ics / Google Calendar)`, `RSVP`, `Get Directions`.
   - Venue chip with map preview dialog.
3. **Past Events Gallery (High-Performance Experience)**:
   - Replace infinite marquee scroller on mobile with a touch-friendly carousel or responsive mason grid with Lightbox modal.
   - Lazy load images with low-res blur placeholders to protect mobile bandwidth.
   - Event story recap summary alongside officer photo credits.

### B. Global Website UI/UX Modernization
1. **Navigation & Header**:
   - Modern glassmorphism header (`backdrop-blur-md bg-white/80`) with active indicators and mobile drawer navigation.
2. **Interactive Guide & Transport**:
   - Replace modal popup placeholders with clean tabbed survival guides (Housing, Peoria Charter schedule links, Campus Transit, Banking for F-1 students).
3. **Accessibility & SEO**:
   - Single `<h1>` per page, descriptive `alt` tags on all dynamic images, semantic HTML5 structure.

---

## 7. Verification Runbook for Agents

Before committing any changes or marking a task complete, every agent must execute the following verification steps:

```bash
# 1. Verify dependencies install cleanly
npm ci --legacy-peer-deps

# 2. Strict TypeScript type check (Must exit 0 with NO errors)
./node_modules/.bin/tsc --noEmit

# 3. Verify production build succeeds
CI=false npm run build

# 4. Git diff audit for secrets and rogue files
git status
git diff --stat
```

If any step fails, diagnose and resolve the issue immediately before proceeding.
