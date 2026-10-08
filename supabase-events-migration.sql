-- ==============================================================================
-- PERMIAS UIUC — UNIFIED EVENTS TABLE MIGRATION & ENHANCEMENT SCRIPT
-- ==============================================================================
-- This migration upgrades the disjoint `upcoming_events` and `past_events` tables
-- into a unified, feature-rich `events` table supporting:
--   - Single source of truth for all events
--   - Automatic transition from upcoming to past based on `start_time`
--   - Cover images, retrospective photo galleries, and promotional banners
--   - RSVP links, ticket purchasing links, and calendar integration
--   - Categories, location maps, and display controls
--
-- RUN THIS SCRIPT in the Supabase SQL Editor.
-- This script is strictly ADDITIVE and IDEMPOTENT. It will NOT destroy existing data.
-- ==============================================================================

-- 1. CREATE UNIFIED EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'General',                  -- 'Cultural', 'Social', 'Career', 'Academic', 'Sports'
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location_name TEXT DEFAULT '',                     -- e.g. 'Scotts Park', 'Illini Union Latzer Hall'
  location_address TEXT DEFAULT '',                  -- e.g. '1401 W Green St, Urbana, IL 61801'
  google_maps_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  cover_image_url TEXT DEFAULT '',                   -- Hero poster / card thumbnail
  gallery_images TEXT[] DEFAULT '{}',                -- Post-event photo recap carousel
  rsvp_url TEXT DEFAULT '',                          -- Google Form / RSVP link
  ticket_url TEXT DEFAULT '',                        -- External ticketing link (if paid event)
  is_featured BOOLEAN DEFAULT false,                 -- Highlight on Home Page banner
  status TEXT DEFAULT 'published',                   -- 'draft', 'published', 'archived', 'cancelled'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREATE INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS idx_events_start_time ON events (start_time);
CREATE INDEX IF NOT EXISTS idx_events_status ON events (status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events (is_featured);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES: Public read for published events, Authenticated full access for admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Public read published events'
  ) THEN
    CREATE POLICY "Public read published events" ON events 
      FOR SELECT USING (status = 'published');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Auth write events'
  ) THEN
    CREATE POLICY "Auth write events" ON events 
      FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- 5. AUTOMATED DATA MIGRATION FROM LEGACY TABLES (IDEMPOTENT)

-- A. Migrate from upcoming_events
INSERT INTO events (title, start_time, location_name, description, status, created_at)
SELECT 
  u.title,
  u.date,
  COALESCE(u.location, ''),
  COALESCE(u.description, ''),
  'published',
  COALESCE(u.created_at, NOW())
FROM upcoming_events u
WHERE NOT EXISTS (
  SELECT 1 FROM events e WHERE e.title = u.title AND e.start_time = u.date
);

-- B. Migrate from past_events (inferring timestamp from textual date strings where possible)
INSERT INTO events (title, start_time, location_name, gallery_images, display_order, status, created_at)
SELECT
  p.name,
  -- Fallback logic for date string parsing: if unparseable, defaults to created_at
  COALESCE(
    CASE 
      WHEN p.date ~ '^[A-Za-z]+ [0-9]{1,2} [0-9]{4}' THEN 
        TO_TIMESTAMP(SUBSTRING(p.date FROM '^[A-Za-z]+ [0-9]{1,2} [0-9]{4}'), 'Month DD YYYY')
      ELSE NULL 
    END,
    p.created_at,
    NOW() - INTERVAL '1 year'
  ) AS start_time,
  -- Extract location if appended after comma
  CASE 
    WHEN p.date LIKE '%, %' THEN SPLIT_PART(p.date, ', ', 2)
    ELSE ''
  END AS location_name,
  p.images,
  p.display_order,
  'published',
  COALESCE(p.created_at, NOW())
FROM past_events p
WHERE NOT EXISTS (
  SELECT 1 FROM events e WHERE e.title = p.name
);

-- 6. BACKWARD-COMPATIBILITY VIEWS (OPTIONAL HELPER)
-- If legacy code still points to past_events or upcoming_events, these views allow 
-- components to read from the unified table seamlessly:
CREATE OR REPLACE VIEW v_upcoming_events AS
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

CREATE OR REPLACE VIEW v_past_events AS
  SELECT 
    id,
    title AS name,
    TO_CHAR(start_time, 'FMMonth DD YYYY') || 
      CASE WHEN location_name != '' THEN ', ' || location_name ELSE '' END AS date,
    gallery_images AS images,
    display_order,
    created_at
  FROM events
  WHERE start_time < NOW() AND status = 'published'
  ORDER BY start_time DESC;

-- Verification query:
-- SELECT count(*) AS total_unified_events FROM events;
