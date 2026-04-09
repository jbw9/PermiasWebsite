-- =============================================================
-- PERMIAS ADMIN DASHBOARD — SUPABASE SETUP
-- Run this entire file in the Supabase SQL Editor
-- =============================================================

-- 1. TABLES

CREATE TABLE IF NOT EXISTS officers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  fun_image_url TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  linkedin TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS past_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS upcoming_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  location TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS link_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_name TEXT NOT NULL UNIQUE,
  count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT 'text',
  label TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROW LEVEL SECURITY

ALTER TABLE officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE upcoming_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;

-- Public can read everything
CREATE POLICY "Public read officers" ON officers FOR SELECT USING (true);
CREATE POLICY "Public read past_events" ON past_events FOR SELECT USING (true);
CREATE POLICY "Public read upcoming_events" ON upcoming_events FOR SELECT USING (true);
CREATE POLICY "Public read link_clicks" ON link_clicks FOR SELECT USING (true);

-- Only authenticated users can write officers/events
CREATE POLICY "Auth write officers" ON officers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write past_events" ON past_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write upcoming_events" ON upcoming_events FOR ALL USING (auth.role() = 'authenticated');

-- Anyone can upsert link_clicks (for tracking)
CREATE POLICY "Public write link_clicks" ON link_clicks FOR ALL USING (true);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can insert page views (tracking)
CREATE POLICY "Public insert page_views" ON page_views FOR INSERT WITH CHECK (true);
-- Only authenticated can read analytics
CREATE POLICY "Auth read page_views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');

-- Anyone can read site content
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
-- Only authenticated can write site content
CREATE POLICY "Auth write site_content" ON site_content FOR ALL USING (auth.role() = 'authenticated');

-- 3. STORAGE BUCKET
-- Go to Storage in the Supabase dashboard and:
--   1. Create a new bucket called "permias-media"
--   2. Set it to PUBLIC
--   3. Allow all file types

-- 4. SEED EXISTING OFFICERS
-- Image paths reference files already hosted on GitHub Pages.
-- New images uploaded via admin will use full Supabase Storage URLs.

INSERT INTO officers (name, role, bio, image_url, fun_image_url, instagram, linkedin, display_order) VALUES
('Leonardo Quarviando', 'President', '', '/officers/leon 2024.png', '/officers/leon 2024.png', 'https://www.instagram.com/leonardoquarviando/', 'https://www.linkedin.com/in/leonardo-quarviando-2b6766288/', 0),
('Ewangga Patrianada', 'Vice President External', 'Hullo!! I''m Magellan, the VP and I''m a sophomore in Industrial Engineering. When I''m not grinding at Grainger, I love playing sports with my friends(mostly tennis 🎾), listening to Laufey 24/7 🎶 and watching some of my comfort films 📽(I''ve watched ''You''ve Got Mail'' more than 5 times).

Fun facts about me: I am a big sucker for anything in the romantic comedy genre and I love watching films (I have the app Letterbox to track all my watched films). As per my MBTI, I am an INFJ! I may seem reserved/quiet when you first meet me but once you get to know me I''m a completely different person(feel free to ask any of the board members). I also love Dachshunds (sausage dogs!), I think they''re the cutest dog breed.

I''m often seen around the Grainger quad area, with a cup of matcha in hand, so don''t hesitate to say hi!! :)', '/officers/ewangga 2024.png', '/officers/ewangga 2024.png', 'https://www.instagram.com/magellanfrances', 'https://www.linkedin.com/in/magellan-frances-wirawan-325948222/', 1),
('Azhura H. Viandyra', 'Vice President Internal', '', '/officers/azhura 2024.png', '/officers/azhura 2024.png', 'https://www.instagram.com/calistaferoniq/', 'https://www.linkedin.com/in/calista-feroniq-gunawan/', 2),
('Andi Alif Badawi Harist', 'Secretary', '', '/officers/alif 2024.png', '/officers/alif 2024.png', 'https://www.instagram.com/andrewnathanielk/', 'https://www.linkedin.com/in/andrew-kwanandas-88367221b/', 3),
('Putra Ganesha Karmayoga', 'Treasurer', '', '/officers/putra 2024.png', '/officers/putra 2024.png', 'https://www.instagram.com/ryaneidoo/', 'https://www.linkedin.com/in/ryanliem1555/', 4),
('Hanaan Santosa', 'Event Organizer', '', '/officers/hanaan 2024.png', '/officers/hanaan 2024.png', 'https://www.instagram.com/yuliusadyan/', 'https://www.linkedin.com/in/yuliusadyan/', 5),
('Yeremias Naro Panjaitan', 'Event Organizer', '', '/officers/naro 2024.png', '/officers/naro 2024.png', 'https://www.instagram.com/yuliusadyan/', 'https://www.linkedin.com/in/yuliusadyan/', 6),
('Chloe Lembong', 'Event Organizer', '', '/officers/chloe 2024.png', '/officers/chloe 2024.png', 'https://www.instagram.com/yuliusadyan/', 'https://www.linkedin.com/in/yuliusadyan/', 7),
('Evan M. Huang', 'Fundraising', 'Hey guys, my name is Evan. I''m a freshman majoring in Industrial Engineering at Grainger. I''m really excited to be a part of PERMIAS and its team as a fundraising officer for this year.

I love spending my spare time playing badminton, playing billiards with friends and just hangin out in general. I love chinese food and noodles so hmu if you ever have any recommendations.

I would usually be at the ARC playing badminton or hitting the gym so if you see me there just stop by and say hi:)', '/officers/evan 2024.png', '/officers/evan 2024.png', 'https://www.instagram.com/evanhuang._/', 'https://www.linkedin.com/in/evan-huang243/', 8),
('Jeddy Marta', 'Fundraising', '', '/officers/jeddy 2024.png', '/officers/jeddy 2024.png', 'https://www.instagram.com/ewangganada/', 'https://www.linkedin.com/in/patrianada-ewangga/', 9),
('Benvito Themas', 'Fundraising', '', '/officers/benvito 2024.png', '/officers/benvito 2024.png', 'https://www.instagram.com/jonathan.b.w/', 'https://www.linkedin.com/in/jwidjajakusuma/', 10),
('Abigail Liaw', 'Social Media', '', '/officers/abigail 2024.png', '/officers/abigail 2024.png', 'https://www.instagram.com/leonardoquarviando/', 'https://www.linkedin.com/in/leonardo-quarviando-2b6766288/', 11),
('Henry Lukas Hutagalung', 'Documentation', '', '/officers/henry 2024.png', '/officers/henry 2024.png', 'https://www.instagram.com/febeyem/', 'https://www.linkedin.com/in/febeyemima/', 12),
('Jonathan Widjajakusuma', 'Technology Officer', '', '/officers/jonathan 2024.png', '/officers/jonathan 2024.png', 'https://www.instagram.com/keisha.alifia/', 'https://www.linkedin.com/in/keisha-ratu-alifia-638314207/', 13),
('Aicha Putri', 'Graphic Designer', '', '/officers/aicha 2024.png', '/officers/aicha 2024.png', 'https://www.instagram.com/keisha.alifia/', 'https://www.linkedin.com/in/keisha-ratu-alifia-638314207/', 14);

-- 5. SEED EXISTING PAST EVENTS
-- Images stored as relative paths — they're already on GitHub Pages.

INSERT INTO past_events (name, date, images, display_order) VALUES
('Welcoming Event 2024 - Mingle & Connect', 'August 31 2024, Scotts Park', ARRAY['/events/welcoming_event_2024/one.png','/events/welcoming_event_2024/two.png','/events/welcoming_event_2024/three.png','/events/welcoming_event_2024/four.png','/events/welcoming_event_2024/five.png','/events/welcoming_event_2024/six.png','/events/welcoming_event_2024/seven.png','/events/welcoming_event_2024/eight.png','/events/welcoming_event_2024/nine.png','/events/welcoming_event_2024/ten.png'], 0),
('Buka Bersama Permias UIUC X Komunitas Pengajian Urbana-Champaign', 'March 23 2024, Orchard Downs Community Center', ARRAY['/events/buka_bersama_2024/one.jpg','/events/buka_bersama_2024/two.jpg','/events/buka_bersama_2024/five.jpg','/events/buka_bersama_2024/six.jpg','/events/buka_bersama_2024/seven.jpg','/events/buka_bersama_2024/eight.jpg','/events/buka_bersama_2024/nine.jpg','/events/buka_bersama_2024/ten.jpg','/events/buka_bersama_2024/eleven.jpg'], 1),
('KPIB X TASC Fundraising', 'February 2 2024, Illini Union', ARRAY['/events/kpib_fundraising_2024/one.jpg','/events/kpib_fundraising_2024/two.jpg','/events/kpib_fundraising_2024/three.jpg','/events/kpib_fundraising_2024/four.jpg','/events/kpib_fundraising_2024/five.jpg','/events/kpib_fundraising_2024/six.jpg','/events/kpib_fundraising_2024/seven.jpg'], 2),
('Pasar Malam Permias UIUC', 'November 11 2023, I-Hotel and Conference Center', ARRAY['/events/pasmal_2023/one.jpg','/events/pasmal_2023/two.jpg','/events/pasmal_2023/three.jpg','/events/pasmal_2023/four.jpg','/events/pasmal_2023/five.jpg','/events/pasmal_2023/six.jpg','/events/pasmal_2023/seven.jpg','/events/pasmal_2023/eight.jpg'], 3),
('Pumpkin Potluck', 'October 28 2023, Orchard Downs Community Center', ARRAY['/events/pumpkin_potluck_2023/one.jpg','/events/pumpkin_potluck_2023/two.jpg','/events/pumpkin_potluck_2023/three.jpg','/events/pumpkin_potluck_2023/four.jpg','/events/pumpkin_potluck_2023/five.jpg','/events/pumpkin_potluck_2023/six.jpg','/events/pumpkin_potluck_2023/seven.jpg','/events/pumpkin_potluck_2023/eight.jpg','/events/pumpkin_potluck_2023/nine.jpg','/events/pumpkin_potluck_2023/ten.jpg','/events/pumpkin_potluck_2023/eleven.jpg','/events/pumpkin_potluck_2023/twelve.jpg','/events/pumpkin_potluck_2023/fourteen.jpg','/events/pumpkin_potluck_2023/threeee.jpg'], 4),
('Batik Day', 'October 2 2023, Main Quad', ARRAY['/events/batik_day_2023/one.jpg','/events/batik_day_2023/two.jpg','/events/batik_day_2023/five.jpg','/events/batik_day_2023/six.jpg','/events/batik_day_2023/seven.jpg','/events/batik_day_2023/eight.jpg','/events/batik_day_2023/nine.jpg','/events/batik_day_2023/ten.jpg','/events/batik_day_2023/eleven.jpg'], 5);

-- 6. SEED SITE CONTENT (editable text/images via admin)

INSERT INTO site_content (key, value, type, label) VALUES
('team_banner_url', '/officers/teambg2024.png', 'image', 'Team Page Banner'),
('team_heading_white', 'Meet', 'text', 'Team Heading (white part)'),
('team_heading_red', 'Our Officers', 'text', 'Team Heading (red part)'),
('about_banner_url', '/AboutUs/background.png', 'image', 'About Us Page Banner'),
('home_about_image_url', '/Home/about.png', 'image', 'Home — About Community Image'),
('home_about_text', 'PERMIAS UIUC, also known as the Indonesian Students Club (ISC), is a vibrant Indonesian community based in Urbana-Champaign, committed to uniting Indonesian students at the University of Illinois at Urbana-Champaign and showcasing our rich culture to the wider Illinois community. Our vision centers on creating a welcoming and engaging environment for socializing and networking, both within the local Indonesian community and across the Midwest. Through a variety of cultural events and activities, we aim to foster connections, promote Indonesian culture, and provide valuable networking opportunities for our members.', 'text', 'Home — About Community Text')
ON CONFLICT (key) DO NOTHING;
