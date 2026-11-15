-- ==============================================================================
-- PERMIAS UIUC — 2025/2026 OFFICER PHOTOS
-- ==============================================================================
-- Points officer cards at the portraits in public/officers/2025/
-- (680x950 JPGs, cropped to the 340x475 officer card ratio).
-- Run in the Supabase SQL Editor after the photos are deployed.
-- Additive only: updates image_url for matching names, touches nothing else.
-- ==============================================================================

-- Executives
UPDATE officers SET image_url = '/officers/2025/valiant.jpg' WHERE name = 'Valiant';
UPDATE officers SET image_url = '/officers/2025/aurel.jpg'   WHERE name = 'Aurel';
UPDATE officers SET image_url = '/officers/2025/chelsea.jpg' WHERE name = 'Chelsea';
UPDATE officers SET image_url = '/officers/2025/james.jpg'   WHERE name IN ('James', 'Justin', 'Justin Yuwono');

-- Fundraising
UPDATE officers SET image_url = '/officers/2025/ethan.jpg'   WHERE name = 'Ethan';
UPDATE officers SET image_url = '/officers/2025/josias.jpg'  WHERE name = 'Josias';
UPDATE officers SET image_url = '/officers/2025/saila.jpg'   WHERE name = 'Saila';
UPDATE officers SET image_url = '/officers/2025/tara.jpg'    WHERE name = 'Tara';

-- Sponsorship & Partnership
UPDATE officers SET image_url = '/officers/2025/qatrin.jpg'  WHERE name = 'Qatrin';
UPDATE officers SET image_url = '/officers/2025/ley.jpg'     WHERE name = 'Ley';
