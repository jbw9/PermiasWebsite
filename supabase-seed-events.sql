-- ==============================================================================
-- PERMIAS UIUC — 2026 EVENTS SEED SCRIPT (PAST & UPCOMING)
-- ==============================================================================
-- Run this script in the Supabase SQL Editor once access is granted.
-- It populates `past_events` and `upcoming_events` with the newly scheduled events,
-- reusing image assets from previous events where specified.
-- ==============================================================================

-- 1. SEED PAST EVENTS (2026)
INSERT INTO past_events (name, date, event_date, location, description, images, display_order)
SELECT
  'Batik Day',
  'October 3, 2026, North and South Quad',
  '2026-10-03T15:00:00-05:00'::TIMESTAMPTZ,
  'North and South Quad',
  'Cultural community gathering featuring a potluck, various lawn and board games, a best-dressed award, and an external partnership with Depop. Time: 3:00 PM – 7:00 PM.',
  ARRAY[
    '/events/batik_day_2023/one.jpg',
    '/events/batik_day_2023/two.jpg',
    '/events/batik_day_2023/five.jpg',
    '/events/batik_day_2023/six.jpg',
    '/events/batik_day_2023/seven.jpg',
    '/events/batik_day_2023/eight.jpg',
    '/events/batik_day_2023/nine.jpg',
    '/events/batik_day_2023/ten.jpg',
    '/events/batik_day_2023/eleven.jpg'
  ],
  0
WHERE NOT EXISTS (
  SELECT 1 FROM past_events WHERE name = 'Batik Day' AND date LIKE '%2026%'
);

INSERT INTO past_events (name, date, event_date, location, description, images, display_order)
SELECT
  'KPIB Fundraiser',
  'September 26, 2026, Anniversary Plaza',
  '2026-09-26T16:00:00-05:00'::TIMESTAMPTZ,
  'Anniversary Plaza',
  'Public food stall event offering Pandan cookies and Pandan coffee to the community. Time: 4:00 PM – 7:00 PM.',
  ARRAY[
    '/events/kpib_fundraising_2026/IMG_3961.jpeg',
    '/events/kpib_fundraising_2026/IMG_3962.jpeg',
    '/events/kpib_fundraising_2026/IMG_3963.jpeg',
    '/events/kpib_fundraising_2026/IMG_3964.jpeg',
    '/events/kpib_fundraising_2026/IMG_3965.jpeg',
    '/events/kpib_fundraising_2026/IMG_3966.jpeg',
    '/events/kpib_fundraising_2026/IMG_3967.jpeg',
    '/events/kpib_fundraising_2026/IMG_3968.jpeg',
    '/events/kpib_fundraising_2026/IMG_3969.jpeg',
    '/events/kpib_fundraising_2026/IMG_3970.jpeg',
    '/events/kpib_fundraising_2026/IMG_3971.jpeg',
    '/events/kpib_fundraising_2026/IMG_3972.jpeg',
    '/events/kpib_fundraising_2026/IMG_3973.jpeg',
    '/events/kpib_fundraising_2026/IMG_3974.jpeg',
    '/events/kpib_fundraising_2026/IMG_3975.jpeg',
    '/events/kpib_fundraising_2026/IMG_3976.jpeg',
    '/events/kpib_fundraising_2026/IMG_3977.jpeg',
    '/events/kpib_fundraising_2026/IMG_3978.jpeg',
    '/events/kpib_fundraising_2026/IMG_3981.jpeg',
    '/events/kpib_fundraising_2026/IMG_3982.jpeg',
    '/events/kpib_fundraising_2026/IMG_3983.jpeg',
    '/events/kpib_fundraising_2026/IMG_3984.jpeg',
    '/events/kpib_fundraising_2026/IMG_3985.jpeg',
    '/events/kpib_fundraising_2026/IMG_3986.jpeg',
    '/events/kpib_fundraising_2026/IMG_3987.jpeg',
    '/events/kpib_fundraising_2026/IMG_3988.jpeg',
    '/events/kpib_fundraising_2026/IMG_3989.jpeg',
    '/events/kpib_fundraising_2026/IMG_3990.jpeg',
    '/events/kpib_fundraising_2026/IMG_3991.jpeg',
    '/events/kpib_fundraising_2026/IMG_3992.jpeg',
    '/events/kpib_fundraising_2026/IMG_3993.jpeg',
    '/events/kpib_fundraising_2026/IMG_3994.jpeg',
    '/events/kpib_fundraising_2026/IMG_3995.jpeg',
    '/events/kpib_fundraising_2026/IMG_3996.jpeg',
    '/events/kpib_fundraising_2026/IMG_3997.jpeg',
    '/events/kpib_fundraising_2026/IMG_3998.jpeg',
    '/events/kpib_fundraising_2026/IMG_3999.jpeg',
    '/events/kpib_fundraising_2026/IMG_4000.jpeg',
    '/events/kpib_fundraising_2026/IMG_4001.jpeg',
    '/events/kpib_fundraising_2026/IMG_4002.jpeg',
    '/events/kpib_fundraising_2026/IMG_4003.jpeg',
    '/events/kpib_fundraising_2026/IMG_4004.jpeg',
    '/events/kpib_fundraising_2026/IMG_4005.jpeg',
    '/events/kpib_fundraising_2026/IMG_4006.jpeg',
    '/events/kpib_fundraising_2026/IMG_4007.jpeg',
    '/events/kpib_fundraising_2026/IMG_4008.jpeg',
    '/events/kpib_fundraising_2026/IMG_4009.jpeg',
    '/events/kpib_fundraising_2026/IMG_4010.jpeg',
    '/events/kpib_fundraising_2026/IMG_4011.jpeg',
    '/events/kpib_fundraising_2026/IMG_4012.jpeg',
    '/events/kpib_fundraising_2026/IMG_4013.jpeg',
    '/events/kpib_fundraising_2026/IMG_4014.jpeg',
    '/events/kpib_fundraising_2026/IMG_4015.jpeg',
    '/events/kpib_fundraising_2026/IMG_4016.jpeg',
    '/events/kpib_fundraising_2026/IMG_4017.jpeg',
    '/events/kpib_fundraising_2026/IMG_4018.jpeg',
    '/events/kpib_fundraising_2026/IMG_4019.jpeg',
    '/events/kpib_fundraising_2026/IMG_4020.jpeg',
    '/events/kpib_fundraising_2026/IMG_4021.jpeg',
    '/events/kpib_fundraising_2026/IMG_4022.jpeg',
    '/events/kpib_fundraising_2026/IMG_4023.jpeg',
    '/events/kpib_fundraising_2026/IMG_4025.jpeg',
    '/events/kpib_fundraising_2026/IMG_4026.jpeg',
    '/events/kpib_fundraising_2026/IMG_4027.jpeg',
    '/events/kpib_fundraising_2026/IMG_4028.jpeg',
    '/events/kpib_fundraising_2026/IMG_4029.jpeg',
    '/events/kpib_fundraising_2026/IMG_4030.jpeg',
    '/events/kpib_fundraising_2026/IMG_4031.jpeg'
  ],
  1
WHERE NOT EXISTS (
  SELECT 1 FROM past_events WHERE name = 'KPIB Fundraiser' AND date LIKE '%2026%'
);

INSERT INTO past_events (name, date, event_date, location, description, images, display_order)
SELECT
  'Online Meet & Greet',
  'June 27, 2026, Online',
  '2026-06-27T08:00:00-05:00'::TIMESTAMPTZ,
  'Online',
  'Pre-arrival orientation session covering visa documentation, class registration processes, packing guides, and commuting options around the campus. Time: 8:00 AM CST.',
  ARRAY[
    '/events/upcoming/meetgreet.png',
    '/events/welcoming_event_2024/one.png',
    '/events/welcoming_event_2024/two.png',
    '/events/welcoming_event_2024/three.png',
    '/events/welcoming_event_2024/four.png',
    '/events/welcoming_event_2024/five.png',
    '/events/welcoming_event_2024/six.png',
    '/events/welcoming_event_2024/seven.png',
    '/events/welcoming_event_2024/eight.png',
    '/events/welcoming_event_2024/nine.png',
    '/events/welcoming_event_2024/ten.png'
  ],
  2
WHERE NOT EXISTS (
  SELECT 1 FROM past_events WHERE name = 'Online Meet & Greet'
);

-- 2. SEED UPCOMING & PLANNED EVENTS (2026)
INSERT INTO upcoming_events (title, date, location, description, cover_image, ticket_price)
SELECT
  'TASC Night Market',
  '2026-10-10T18:00:00-05:00'::TIMESTAMPTZ,
  'Bardeen Quad',
  'Night market event featuring a food stall serving Mie Ayam. Time: 6:00 PM – 9:00 PM.',
  '/events/upcoming/pasmal2024.png',
  'Free Entry'
WHERE NOT EXISTS (
  SELECT 1 FROM upcoming_events WHERE title = 'TASC Night Market'
);

INSERT INTO upcoming_events (title, date, location, description, cover_image, ticket_price)
SELECT
  'Ongoing Social Outings',
  '2026-10-18T14:00:00-05:00'::TIMESTAMPTZ,
  'Campus & Champaign-Urbana',
  'Future community activities currently in the planning stages include weekend badminton and volleyball sessions, ice skating, soccer, bouldering in collaboration with MASA at Boneyard Boulders, and a group trip to Matthiessen State Park.',
  '/events/upcoming/irlMeetGreet.png',
  'Community Activity'
WHERE NOT EXISTS (
  SELECT 1 FROM upcoming_events WHERE title = 'Ongoing Social Outings'
);
