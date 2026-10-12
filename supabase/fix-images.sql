-- =============================================================
-- FIX: Correct event image folder paths in Supabase
-- Run this in the Supabase SQL Editor if you already seeded past_events
-- =============================================================

-- Fix KPIB Fundraising (kpib_fundraising → kpib_fundraising_2024)
UPDATE past_events
SET images = ARRAY[
  '/events/kpib_fundraising_2024/one.jpg',
  '/events/kpib_fundraising_2024/two.jpg',
  '/events/kpib_fundraising_2024/three.jpg',
  '/events/kpib_fundraising_2024/four.jpg',
  '/events/kpib_fundraising_2024/five.jpg',
  '/events/kpib_fundraising_2024/six.jpg',
  '/events/kpib_fundraising_2024/seven.jpg'
]
WHERE name = 'KPIB X TASC Fundraising';

-- Fix Pasar Malam (pasar_malam_2023 → pasmal_2023)
UPDATE past_events
SET images = ARRAY[
  '/events/pasmal_2023/one.jpg',
  '/events/pasmal_2023/two.jpg',
  '/events/pasmal_2023/three.jpg',
  '/events/pasmal_2023/four.jpg',
  '/events/pasmal_2023/five.jpg',
  '/events/pasmal_2023/six.jpg',
  '/events/pasmal_2023/seven.jpg',
  '/events/pasmal_2023/eight.jpg'
]
WHERE name ILIKE '%Pasar Malam%';

-- Fix Pumpkin Potluck (pumpkin_potluck → pumpkin_potluck_2023, and add missing images)
UPDATE past_events
SET images = ARRAY[
  '/events/pumpkin_potluck_2023/one.jpg',
  '/events/pumpkin_potluck_2023/two.jpg',
  '/events/pumpkin_potluck_2023/three.jpg',
  '/events/pumpkin_potluck_2023/four.jpg',
  '/events/pumpkin_potluck_2023/five.jpg',
  '/events/pumpkin_potluck_2023/six.jpg',
  '/events/pumpkin_potluck_2023/seven.jpg',
  '/events/pumpkin_potluck_2023/eight.jpg',
  '/events/pumpkin_potluck_2023/nine.jpg',
  '/events/pumpkin_potluck_2023/ten.jpg',
  '/events/pumpkin_potluck_2023/eleven.jpg',
  '/events/pumpkin_potluck_2023/twelve.jpg',
  '/events/pumpkin_potluck_2023/fourteen.jpg',
  '/events/pumpkin_potluck_2023/threeee.jpg'
]
WHERE name = 'Pumpkin Potluck';

-- Fix Batik Day (batik_day → batik_day_2023, and add missing images)
UPDATE past_events
SET images = ARRAY[
  '/events/batik_day_2023/one.jpg',
  '/events/batik_day_2023/two.jpg',
  '/events/batik_day_2023/five.jpg',
  '/events/batik_day_2023/six.jpg',
  '/events/batik_day_2023/seven.jpg',
  '/events/batik_day_2023/eight.jpg',
  '/events/batik_day_2023/nine.jpg',
  '/events/batik_day_2023/ten.jpg',
  '/events/batik_day_2023/eleven.jpg'
]
WHERE name = 'Batik Day';

-- =============================================================
-- ADD NEW TABLES (run if you haven't done a fresh setup)
-- =============================================================

CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  path TEXT DEFAULT '/',
  country TEXT DEFAULT '',
  country_code TEXT DEFAULT '',
  city TEXT DEFAULT '',
  latitude FLOAT DEFAULT 0,
  longitude FLOAT DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert page_views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read page_views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'text',
  label TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Auth write site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO site_content (key, value, type, label) VALUES
('team_banner_url', '/officers/teambg2024.png', 'image', 'Team Page Banner'),
('team_heading_white', 'Meet', 'text', 'Team Heading (white part)'),
('team_heading_red', 'Our Officers', 'text', 'Team Heading (red part)'),
('about_banner_url', '/AboutUs/background.png', 'image', 'About Us Page Banner'),
('home_about_image_url', '/Home/about.png', 'image', 'Home — About Community Image'),
('home_about_text', 'PERMIAS UIUC, also known as the Indonesian Students Club (ISC), is a vibrant Indonesian community based in Urbana-Champaign, committed to uniting Indonesian students at the University of Illinois at Urbana-Champaign and showcasing our rich culture to the wider Illinois community. Our vision centers on creating a welcoming and engaging environment for socializing and networking, both within the local Indonesian community and across the Midwest. Through a variety of cultural events and activities, we aim to foster connections, promote Indonesian culture, and provide valuable networking opportunities for our members.', 'text', 'Home — About Community Text')
ON CONFLICT (key) DO NOTHING;
