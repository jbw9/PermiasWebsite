-- ==============================================================================
-- PERMIAS UIUC — ADDITIVE EVENTS UPGRADE & AUTO-ARCHIVE MIGRATION
-- ==============================================================================
-- This script safely upgrades existing `upcoming_events` and `past_events` tables:
--   1. Adds RSVP, Ticketing, Price, Capacity, and Cover Image fields
--   2. Adds structured timestamps (event_date) and dedicated location fields to past_events
--   3. Backfills existing text dates to structured timestamps
--   4. Creates a PostgreSQL stored function `auto_archive_past_events()` to
--      automatically move passed events into past_events without manual toil.
--
-- RUN THIS IN THE SUPABASE SQL EDITOR.
-- This script is 100% ADDITIVE and will NEVER drop tables or lose data.
-- ==============================================================================

-- 1. UPGRADE upcoming_events TABLE
ALTER TABLE upcoming_events 
  ADD COLUMN IF NOT EXISTS rsvp_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ticket_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ticket_price TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS capacity INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cover_image TEXT DEFAULT '';

-- 2. UPGRADE past_events TABLE
ALTER TABLE past_events
  ADD COLUMN IF NOT EXISTS event_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS location TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS rsvp_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ticket_url TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ticket_price TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS capacity INTEGER DEFAULT 0;

-- 3. BACKFILL past_events (parse textual dates into event_date and location)
UPDATE past_events
SET 
  event_date = COALESCE(
    CASE 
      WHEN date ~ '^[A-Za-z]+ [0-9]{1,2} [0-9]{4}' THEN 
        TO_TIMESTAMP(SUBSTRING(date FROM '^[A-Za-z]+ [0-9]{1,2} [0-9]{4}'), 'Month DD YYYY')
      ELSE NULL 
    END,
    created_at
  ),
  location = CASE 
    WHEN location = '' AND date LIKE '%, %' THEN SPLIT_PART(date, ', ', 2)
    ELSE location 
  END
WHERE event_date IS NULL;

-- 4. CREATE DATABASE STORED FUNCTION TO AUTO-ARCHIVE PASSED EVENTS
CREATE OR REPLACE FUNCTION auto_archive_past_events()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  archived_count INTEGER := 0;
  r RECORD;
  max_order INTEGER := 0;
  formatted_date TEXT;
BEGIN
  -- Get current maximum display_order in past_events
  SELECT COALESCE(MAX(display_order), 0) INTO max_order FROM past_events;

  FOR r IN 
    SELECT * FROM upcoming_events WHERE date < NOW()
  LOOP
    max_order := max_order + 1;
    
    -- Format date string: Month DD, YYYY, Location
    formatted_date := TO_CHAR(r.date, 'FMMonth DD, YYYY') || 
      CASE WHEN COALESCE(r.location, '') != '' THEN ', ' || r.location ELSE '' END;

    -- Insert into past_events
    INSERT INTO past_events (
      name,
      date,
      event_date,
      location,
      description,
      images,
      display_order,
      rsvp_url,
      ticket_url,
      ticket_price,
      capacity,
      created_at
    ) VALUES (
      r.title,
      formatted_date,
      r.date,
      COALESCE(r.location, ''),
      COALESCE(r.description, ''),
      CASE WHEN COALESCE(r.cover_image, '') != '' THEN ARRAY[r.cover_image] ELSE '{}'::text[] END,
      max_order,
      COALESCE(r.rsvp_url, ''),
      COALESCE(r.ticket_url, ''),
      COALESCE(r.ticket_price, ''),
      COALESCE(r.capacity, 0),
      r.created_at
    );

    -- Remove from upcoming_events
    DELETE FROM upcoming_events WHERE id = r.id;
    archived_count := archived_count + 1;
  END LOOP;

  RETURN archived_count;
END;
$$;

-- Allow authenticated users and anon clients (or keep-alive cron) to execute the function
GRANT EXECUTE ON FUNCTION auto_archive_past_events() TO authenticated, anon, service_role;

-- Verification test:
-- SELECT auto_archive_past_events();
