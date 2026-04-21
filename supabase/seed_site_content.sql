-- Seed new site_content rows
-- Run this in your Supabase SQL editor.
-- ON CONFLICT DO NOTHING means existing rows are left unchanged.

INSERT INTO site_content (key, value, type, label) VALUES

-- Header
('header_logo_url', '/mainLogo.png', 'image', 'Header - Logo'),

-- Home Hero
('home_hero_title', 'PERMIAS UIUC', 'text', 'Home - Hero Title'),
('home_hero_subtitle', 'Welcome to Our Official Website', 'text', 'Home - Hero Subtitle'),
('home_hero_cta', 'Get Involved!', 'text', 'Home - Hero CTA Button'),
('home_mascot_image_url', '/Home/mascot.png', 'image', 'Home - Mascot Image'),
('home_bg_video_url', '/Home/backgroundvid.mp4', 'text', 'Home - Background Video URL'),

-- Home - Purpose Card Images
('home_purpose_networking_image_url', '/Home/networking.png', 'image', 'Home - Networking Card Image'),
('home_purpose_entertainment_image_url', '/Home/entertainment.png', 'image', 'Home - Entertainment Card Image'),
('home_purpose_friendship_image_url', '/Home/friendship.png', 'image', 'Home - Friendship Card Image'),

-- Home - Booklet
('home_booklet_title', 'New Students Booklet', 'text', 'Home - Booklet Title'),
('home_booklet_link_url', 'https://www.canva.com/design/DAGG1vUJC5M/EzHcDifJjS5rL2imbr-gMA/view?utm_content=DAGG1vUJC5M&utm_campaign=designshare&utm_medium=embeds&utm_source=link', 'text', 'Home - Booklet Link URL'),
('home_booklet_embed_url', 'https://www.canva.com/design/DAGG1vUJC5M/EzHcDifJjS5rL2imbr-gMA/view?embed', 'text', 'Home - Booklet Embed URL'),

-- About Us
('about_background_image_url', '/AboutUs/background.png', 'image', 'About Us - Background Image'),
('about_image1_url', '/AboutUs/image1.png', 'image', 'About Us - Section 1 Image'),
('about_us_text', 'PERMIAS UIUC, or commonly known as the Indonesian Students Club (ISC), is an Indonesian community in the heart of Urbana - Champaign. We strive to unite the Indonesian community within the University of Illinois at Urbana-Champaign while also promoting our culture to the greater community in Illinois.', 'text', 'About Us - About Us Text'),
('about_image2_url', '/AboutUs/image2.png', 'image', 'About Us - Section 2 Image'),
('about_vision_text', 'At PERMIAS UIUC, our vision extends beyond merely creating a fun and safe environment for the Indonesian community in Urbana-Champaign. We aspire to be a beacon of Indonesian culture, heritage, and values in Illinois, fostering a deeper understanding and appreciation among the diverse tapestry of communities we live in.', 'text', 'About Us - Our Vision Text'),
('about_image3_url', '/AboutUs/image3.png', 'image', 'About Us - Section 3 Image'),
('about_mission_text', 'Our mission is to promote Indonesian culture to the Urbana-Champaign community, provide networking opportunities for Indonesian students, and connect PERMIAS UIUC members with the wider Indonesian community in the Midwest area.', 'text', 'About Us - Our Mission Text'),

-- Contact - Card Images
('contact_collab_image_url', '/Home/networking.png', 'image', 'Contact - Collab Card Image'),
('contact_general_image_url', '/ContactUs/permLogo.png', 'image', 'Contact - General Card Image'),
('contact_lpdp_image_url', '/ContactUs/lpdp.png', 'image', 'Contact - LPDP Card Image'),
('contact_grad_asst_image_url', '/ContactUs/grad.png', 'image', 'Contact - Grad Assistant Card Image'),
('contact_indonesia_maju_image_url', '/ContactUs/indonesiamaju.png', 'image', 'Contact - Indonesia Maju Card Image'),

-- Footer
('footer_instagram_url', 'https://www.instagram.com/permiasuiuc/?hl=en', 'text', 'Footer - Instagram URL'),
('footer_facebook_url', 'https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2Fisc.uiuc%2F', 'text', 'Footer - Facebook URL'),
('footer_email', 'permias.uiuc@gmail.com', 'text', 'Footer - Email Address'),
('footer_copyright', '© 2024 Indonesian Student Association at the University of Illinois Urbana-Champaign', 'text', 'Footer - Copyright Text')

ON CONFLICT (key) DO NOTHING;
