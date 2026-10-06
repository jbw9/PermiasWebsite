-- ==============================================================================
-- PERMIAS UIUC — 2025/2026 NEW OFFICER ROSTER SEED SCRIPT
-- ==============================================================================
-- Run this script in the Supabase SQL Editor to populate the `officers` table
-- with the newly elected executive board and team division members.
-- ==============================================================================

-- If you wish to replace the previous year's officers, uncomment the line below:
-- TRUNCATE TABLE officers;

INSERT INTO officers (name, role, display_order, bio, image_url, fun_image_url, instagram, linkedin) VALUES
-- 1. Executives
('Cherish', 'President', 0, '', '', '', '', ''),
('Valiant', 'Vice President Internal', 1, '', '', '', '', ''),
('Aurel', 'Vice President External', 2, '', '', '', '', ''),
('Chelsea', 'Secretary', 3, '', '', '', '', ''),
('James', 'Treasurer', 4, '', '', '', '', ''),

-- 2. Sponsorship & Partnership
('Qatrin', 'Director of Sponsorship & Partnership', 5, '', '', '', '', ''),
('Ley', 'Sponsorship & Partnership', 6, '', '', '', '', ''),

-- 3. Membership
('Barra', 'Director of Membership', 7, '', '', '', '', ''),
('Jotam', 'Membership', 8, '', '', '', '', ''),
('Allison', 'Membership', 9, '', '', '', '', ''),
('Rainier', 'Membership', 10, '', '', '', '', ''),
('Micaela', 'Membership', 11, '', '', '', '', ''),

-- 4. PR & Marketing
('Praysie', 'Director of PR & Marketing', 12, '', '', '', '', ''),
('Madeline', 'PR & Marketing', 13, '', '', '', '', ''),
('Britney', 'PR & Marketing', 14, '', '', '', '', ''),

-- 5. Fundraising
('Ethan', 'Director of Fundraising', 15, '', '', '', '', ''),
('Tara', 'Fundraising', 16, '', '', '', '', ''),
('Josias', 'Fundraising', 17, '', '', '', '', ''),
('Saila', 'Fundraising', 18, '', '', '', '', ''),

-- 6. Tech Team
('Steve', 'Tech Team', 19, '', '', '', '', '');
