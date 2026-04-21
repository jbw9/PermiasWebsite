-- =============================================================
-- PERMIAS — Seed new site_content entries for Home & Contact pages
-- Run this in the Supabase SQL Editor
-- =============================================================

INSERT INTO site_content (key, value, type, label) VALUES

-- Home: Our Purpose cards
('home_purpose_networking_title', 'Networking', 'text', 'Home — Purpose: Networking Title'),
('home_purpose_networking_desc', 'Connect with fellow Indonesian students in the to foster professional relationships, creating a strong, supportive network of peers.', 'text', 'Home — Purpose: Networking Description'),
('home_purpose_entertainment_title', 'Entertainment', 'text', 'Home — Purpose: Entertainment Title'),
('home_purpose_entertainment_desc', 'Attend engaging events organized by our team, creating unforgettable experiences together.', 'text', 'Home — Purpose: Entertainment Description'),
('home_purpose_friendship_title', 'Friendship', 'text', 'Home — Purpose: Friendship Title'),
('home_purpose_friendship_desc', 'Forge friendships with peers sharing your culture, building enduring connections that extend beyond university life.', 'text', 'Home — Purpose: Friendship Description'),

-- Home: Graduate Spotlight
('home_grad_spotlight_quote', 'Found a community, a home far away from home, really glad being one of the board member, and to be honest really had a blast and eventful moments during my time here. Join us!', 'text', 'Home — Graduate Spotlight: Quote'),
('home_grad_spotlight_name', 'Yulius A. Mandataputra', 'text', 'Home — Graduate Spotlight: Name'),
('home_grad_spotlight_class', 'Class of 2027', 'text', 'Home — Graduate Spotlight: Class Year'),
('home_grad_spotlight_image_url', '/Home/graduateSpotlight.png', 'image', 'Home — Graduate Spotlight: Photo'),

-- Home: Freshman Spotlight
('home_fresh_spotlight_quote', 'Being a part of PERMIAS immersed me in the vibrant Indonesian community, celebrating our rich culture through engaging events and shared experiences', 'text', 'Home — Freshman Spotlight: Quote'),
('home_fresh_spotlight_name', 'Andi Alif Badawi Harist', 'text', 'Home — Freshman Spotlight: Name'),
('home_fresh_spotlight_class', 'Class of 2027', 'text', 'Home — Freshman Spotlight: Class Year'),
('home_fresh_spotlight_image_url', '/Home/freshmanSpotlight.png', 'image', 'Home — Freshman Spotlight: Photo'),

-- Home: Get Involved links
('home_get_involved_join_url', 'https://forms.gle/X37mWwG3roZt8jpL8', 'text', 'Home — Get Involved: Join Our Family URL'),
('home_get_involved_message_url', 'https://forms.gle/TS5HGLAW9AeH86x29', 'text', 'Home — Get Involved: Leave a Message URL'),

-- Contact page: card titles, descriptions, and contact info
('contact_collab_title', 'Collab With Us', 'text', 'Contact — Collab: Title'),
('contact_collab_desc', 'We''d love to talk about how we can work together.', 'text', 'Contact — Collab: Description'),
('contact_collab_contact', 'Ewangga: +1 (217) 926 2707', 'text', 'Contact — Collab: Contact Info'),
('contact_general_title', 'General Permias', 'text', 'Contact — General: Title'),
('contact_general_desc', 'We''re here to help with any questions regarding permias.', 'text', 'Contact — General: Description'),
('contact_general_contact1', 'Leonardo: +1 (217) 979 9614', 'text', 'Contact — General: Contact 1'),
('contact_general_contact2', 'Azhura: +1 (217) 693-2442', 'text', 'Contact — General: Contact 2'),
('contact_lpdp_title', 'LPDP', 'text', 'Contact — LPDP: Title'),
('contact_lpdp_desc', 'Discuss if you have any questions related to LPDP', 'text', 'Contact — LPDP: Description'),
('contact_lpdp_contact', 'David: +1 (224) 418 8775', 'text', 'Contact — LPDP: Contact Info'),
('contact_grad_asst_title', 'Graduate Assistant', 'text', 'Contact — Grad Assistant: Title'),
('contact_grad_asst_desc', 'We''d love to assist you anything regarding graduate education at UIUC.', 'text', 'Contact — Grad Assistant: Description'),
('contact_grad_asst_contact', 'Regina Giovanni: +1 (551) 297-9660', 'text', 'Contact — Grad Assistant: Contact Info'),
('contact_indonesia_maju_title', 'Indonesia Maju', 'text', 'Contact — Indonesia Maju: Title'),
('contact_indonesia_maju_desc', 'Discuss if you have any questions related to Indonesia Maju', 'text', 'Contact — Indonesia Maju: Description'),
('contact_indonesia_maju_contact', 'Alif: +62 813-8355-0907', 'text', 'Contact — Indonesia Maju: Contact Info')

ON CONFLICT (key) DO NOTHING;
