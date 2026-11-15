import { Officer } from "../types";

export interface TeamMember {
  name: string;
  role: string;
  team?: string;
  bio: string;
  image: string;
  funImage: string;
  instagram: string;
  linkedin: string;
}

export interface TeamDivisionMeta {
  name: string;
  shortName: string;
  description: string;
  badgeColor: string;
  icon: string;
}

export const TEAM_DIVISIONS: TeamDivisionMeta[] = [
  {
    name: "Executive Board",
    shortName: "Executives",
    description: "Guiding the organization's strategic vision, external representation, and operational integrity.",
    badgeColor: "bg-red text-white",
    icon: "🏛️",
  },
  {
    name: "Sponsorship & Partnership",
    shortName: "Sponsorship",
    description: "Building relationships with corporate sponsors, Indonesian enterprises, and campus partners.",
    badgeColor: "bg-blue-600 text-white",
    icon: "🤝",
  },
  {
    name: "Membership",
    shortName: "Membership",
    description: "Welcoming prospective and incoming students, fostering camaraderie, and community bonding.",
    badgeColor: "bg-emerald-600 text-white",
    icon: "👥",
  },
  {
    name: "PR & Marketing",
    shortName: "PR & Marketing",
    description: "Amplifying PERMIAS's brand through creative design, social media campaigns, and visual documentation.",
    badgeColor: "bg-purple-600 text-white",
    icon: "🎨",
  },
  {
    name: "Fundraising",
    shortName: "Fundraising",
    description: "Orchestrating Indonesian culinary fundraisers, merchandise drops, and community pop-ups.",
    badgeColor: "bg-amber-600 text-white",
    icon: "🍲",
  },
  {
    name: "Tech Team",
    shortName: "Technology",
    description: "Architecting, maintaining, and innovating permiasuiuc.com, event platforms, and digital tooling.",
    badgeColor: "bg-indigo-600 text-white",
    icon: "💻",
  },
  {
    name: "Event Organizers",
    shortName: "Events",
    description: "Executing flagship cultural celebrations including Pasar Malam, Welcoming, and Buka Bersama.",
    badgeColor: "bg-rose-600 text-white",
    icon: "🎪",
  },
];

export function getOfficerTeam(role: string, team?: string): string {
  if (team && team.trim()) {
    return team.trim();
  }
  const r = role.toLowerCase().trim();

  // Executives
  if (
    r.includes("president") ||
    r.includes("secretary") ||
    r.includes("treasurer") ||
    r.includes("executive")
  ) {
    return "Executive Board";
  }

  // Sponsorship & Partnership
  if (
    r.includes("sponsorship") ||
    r.includes("partnership") ||
    r.includes("external relation") ||
    r.includes("sponsor")
  ) {
    return "Sponsorship & Partnership";
  }

  // Membership
  if (
    r.includes("membership") ||
    r.includes("internal relation") ||
    r.includes("member")
  ) {
    return "Membership";
  }

  // PR & Marketing / Media
  if (
    r.includes("pr") ||
    r.includes("marketing") ||
    r.includes("social media") ||
    r.includes("graphic") ||
    r.includes("designer") ||
    r.includes("design") ||
    r.includes("documentation") ||
    r.includes("media")
  ) {
    return "PR & Marketing";
  }

  // Fundraising
  if (r.includes("fundrais")) {
    return "Fundraising";
  }

  // Technology
  if (
    r.includes("tech") ||
    r.includes("developer") ||
    r.includes("engineer") ||
    r.includes("web") ||
    r.includes("software")
  ) {
    return "Tech Team";
  }

  // Event Organizers
  if (r.includes("event") || r.includes("organizer")) {
    return "Event Organizers";
  }

  return "General Officers";
}

export function getRolePriority(role: string): number {
  const r = role.toLowerCase().trim();
  if (r.includes("president") && !r.includes("vice")) return 0;
  if (r.includes("vice president")) return 1;
  if (r.includes("director") || r.includes("lead") || r.includes("head") || r.includes("chair")) return 2;
  if (r.includes("secretary")) return 3;
  if (r.includes("treasurer")) return 4;
  return 5;
}

export function sortOfficersLeaderFirst(officers: Officer[]): Officer[] {
  return [...officers].sort((a, b) => {
    const prioDiff = getRolePriority(a.role) - getRolePriority(b.role);
    if (prioDiff !== 0) return prioDiff;
    return (a.display_order ?? 0) - (b.display_order ?? 0);
  });
}

export function convertTeamMemberToOfficer(m: TeamMember, index: number): Officer {
  return {
    id: `static-${m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
    name: m.name,
    role: m.role,
    team: m.team || getOfficerTeam(m.role, m.team),
    bio: m.bio || "",
    image_url: m.image || "",
    fun_image_url: m.funImage || "",
    instagram: m.instagram || "",
    linkedin: m.linkedin || "",
    display_order: index,
  };
}

// ==============================================================================
// 2025–2026 ELECTED OFFICERS (Current Board)
// ==============================================================================
export const teamMembers: TeamMember[] = [
  // 1. Executives
  {
    name: "Cherish Yulius",
    role: "President",
    team: "Executive Board",
    bio: "President of PERMIAS UIUC for the 2025–2026 academic year. Dedicated to empowering the Indonesian student community at UIUC, elevating cultural awareness across campus, and fostering meaningful connections across North America.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Valiant Setyoputro",
    role: "Vice President Internal",
    team: "Executive Board",
    bio: "Vice President Internal of PERMIAS UIUC. Overseeing internal committee operations, team synergy, board welfare, and community initiatives.",
    image: "/officers/2025/valiant.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Aurelia Sitanggang",
    role: "Vice President External",
    team: "Executive Board",
    bio: "Vice President External of PERMIAS UIUC. Coordinating outreach with external student organizations, UIUC administration, and global Indonesian diaspora networks.",
    image: "/officers/2025/aurel.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Chelsea",
    role: "Secretary",
    team: "Executive Board",
    bio: "Secretary of PERMIAS UIUC. Managing official correspondence, organizational records, meeting proceedings, and campus compliance.",
    image: "/officers/2025/chelsea.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Justin Yuwono",
    role: "Treasurer",
    team: "Executive Board",
    bio: "Treasurer of PERMIAS UIUC. Directing organizational budgeting, financial allocations, event funding, and audit transparency.",
    image: "/officers/2025/james.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },

  // 2. Sponsorship & Partnership
  {
    name: "Qatrin",
    role: "Director of Sponsorship & Partnership",
    team: "Sponsorship & Partnership",
    bio: "Director of Sponsorship & Partnership. Leading corporate outreach, sponsor relations, and collaborative brand initiatives for PERMIAS flagship events.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Ley",
    role: "Sponsorship & Partnership Officer",
    team: "Sponsorship & Partnership",
    bio: "Sponsorship & Partnership officer. Connecting PERMIAS with Midwest and international partners to support cultural programming and community showcases.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },

  // 3. Membership
  {
    name: "Barra Budiyono",
    role: "Director of Membership",
    team: "Membership",
    bio: "Director of Membership. Championing community engagement, incoming student orientations, and student integration at Illinois.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Jonathan Tamboto",
    role: "Membership Officer",
    team: "Membership",
    bio: "Membership committee officer. Creating warm, inclusive spaces and peer mentorship for Indonesian Illini.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Allison",
    role: "Membership Officer",
    team: "Membership",
    bio: "Membership committee officer. Supporting community gatherings, game nights, and cultural transition guides.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Rainier Harsono",
    role: "Membership Officer",
    team: "Membership",
    bio: "Membership committee officer. Dedicated to building friendships and community spirit among undergraduate and graduate members.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Micaela",
    role: "Membership Officer",
    team: "Membership",
    bio: "Membership committee officer. Helping students feel right at home in Urbana-Champaign through community connection.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },

  // 4. PR & Marketing
  {
    name: "Praysie",
    role: "Director of PR & Marketing",
    team: "PR & Marketing",
    bio: "Director of PR & Marketing. Leading creative branding, social media vision, and external marketing strategies across all platforms.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Madeline",
    role: "PR & Marketing Officer",
    team: "PR & Marketing",
    bio: "PR & Marketing officer. Designing visual narratives and campaign content celebrating Indonesian culture.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Britney",
    role: "PR & Marketing Officer",
    team: "PR & Marketing",
    bio: "PR & Marketing officer. Crafting engaging social media promotions and event publicity campaigns.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },

  // 5. Fundraising
  {
    name: "Ethan Chang",
    role: "Director of Fundraising",
    team: "Fundraising",
    bio: "Director of Fundraising. Coordinating culinary pop-ups (Indomie, Sate, Indonesian snacks), merchandise lines, and community fundraisers.",
    image: "/officers/2025/ethan.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Tara",
    role: "Fundraising Officer",
    team: "Fundraising",
    bio: "Fundraising officer. Bringing authentic Indonesian flavors to campus quads through community-favorite food sales.",
    image: "/officers/2025/tara.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Josias Nathaniel Limit",
    role: "Fundraising Officer",
    team: "Fundraising",
    bio: "Fundraising officer. Managing logistics and operations for food sales and seasonal merchandise campaigns.",
    image: "/officers/2025/josias.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Saila Nataatmadja",
    role: "Fundraising Officer",
    team: "Fundraising",
    bio: "Fundraising officer. Engaging the campus community through delicious Indonesian delicacies and festive sales.",
    image: "/officers/2025/saila.jpg",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },

  // 6. Tech Team
  {
    name: "Steve Wong",
    role: "Tech Team Lead",
    team: "Tech Team",
    bio: "Tech Team lead for PERMIAS UIUC. Developing web experiences, event tools, dynamic dashboards, and digital infrastructure for the Indonesian student community.",
    image: "",
    funImage: "",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
];

// ==============================================================================
// 2024–2025 RETROSPECTIVE OFFICERS (Previous Board with Headshots)
// ==============================================================================
export const teamMembers2024: TeamMember[] = [
  // Executives
  {
    name: "Leonardo Quarviando",
    role: "President",
    team: "Executive Board",
    bio: "President of PERMIAS UIUC for the 2024–2025 academic year. Majoring in Industrial Engineering. Passionate about uniting the Indonesian student community and leading flagship events.",
    image: "/officers/leon 2024.png",
    funImage: "/officers/leon 2024.png",
    instagram: "https://www.instagram.com/leonardoquarviando/",
    linkedin: "https://www.linkedin.com/in/leonardo-quarviando-2b6766288/",
  },
  {
    name: "Ewangga Patrianada",
    role: "Vice President External",
    team: "Executive Board",
    bio:
      "Hullo!! I’m Magellan, the VP and I’m a sophomore in Industrial Engineering. " +
      "When I’m not grinding at Grainger, I love playing sports with my friends (mostly tennis 🎾), " +
      "listening to Laufey 24/7 🎶 and watching some of my comfort films 📽.\n\n" +
      "Fun facts about me: I am a big sucker for anything in the romantic comedy genre. " +
      "As per my MBTI, I am an INFJ! I also love Dachshunds (sausage dogs!), they’re the cutest dog breed.",
    image: "/officers/ewangga 2024.png",
    funImage: "/officers/ewangga 2024.png",
    instagram: "https://www.instagram.com/magellanfrances",
    linkedin: "https://www.linkedin.com/in/magellan-frances-wirawan-325948222/",
  },
  {
    name: "Azhura H. Viandyra",
    role: "Vice President Internal",
    team: "Executive Board",
    bio:
      "Hi everyone, my name is Calista, and I am currently majoring in Accountancy + Data Science! " +
      "I love watching stand-up comedies and dad jokes. " +
      "Fun fact: I can eat udang sambal pete every day! My MBTI is ISFJ. You can find me studying at Siebel Center for Design a lot!",
    image: "/officers/azhura 2024.png",
    funImage: "/officers/azhura 2024.png",
    instagram: "https://www.instagram.com/calistaferoniq/",
    linkedin: "https://www.linkedin.com/in/calista-feroniq-gunawan/",
  },
  {
    name: "Andi Alif Badawi Harist",
    role: "Secretary",
    team: "Executive Board",
    bio:
      "Hello! My name is Andrew, senior studying accounting and serving as Secretary for the academic year. " +
      "Some fun facts: I drink at least 3L of water a day, heavily prefer hot tea over cold drinks, and wear outerwear all year round!",
    image: "/officers/alif 2024.png",
    funImage: "/officers/alif 2024.png",
    instagram: "https://www.instagram.com/andrewnathanielk/",
    linkedin: "https://www.linkedin.com/in/andrew-kwanandas-88367221b/",
  },
  {
    name: "Putra Ganesha Karmayoga",
    role: "Treasurer",
    team: "Executive Board",
    bio:
      "Hello everyone! My name is Ryan and I am the Treasurer. Majoring in Computer Engineering. " +
      "When I have free time, I like watching YouTube videos, making music, and playing badminton at the ARC.",
    image: "/officers/putra 2024.png",
    funImage: "/officers/putra 2024.png",
    instagram: "https://www.instagram.com/ryaneidoo/",
    linkedin: "https://www.linkedin.com/in/ryanliem1555/",
  },

  // Event Organizers
  {
    name: "Hanaan Santosa",
    role: "Event Organizer",
    team: "Event Organizers",
    bio: "Event Organizer for PERMIAS UIUC. Coordinating schedules, artist logistics, and venue production for Pasar Malam and campus cultural festivals.",
    image: "/officers/hanaan 2024.png",
    funImage: "/officers/hanaan 2024.png",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Yeremias Naro Panjaitan",
    role: "Event Organizer",
    team: "Event Organizers",
    bio: "Event Organizer for PERMIAS UIUC. Bringing Indonesian cultural programming and welcoming events to life for UIUC students.",
    image: "/officers/naro 2024.png",
    funImage: "/officers/naro 2024.png",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },
  {
    name: "Chloe Lembong",
    role: "Event Organizer",
    team: "Event Organizers",
    bio: "Event Organizer for PERMIAS UIUC. Spearheading stage management, performer itineraries, and volunteer operations for flagship cultural festivals.",
    image: "/officers/chloe 2024.png",
    funImage: "/officers/chloe 2024.png",
    instagram: "https://www.instagram.com/permiasuiuc/",
    linkedin: "https://www.linkedin.com/company/permias-uiuc/",
  },

  // Fundraising
  {
    name: "Evan M. Huang",
    role: "Fundraising Officer",
    team: "Fundraising",
    bio:
      "Hey guys, my name is Evan! Majoring in Industrial Engineering at Grainger. " +
      "I love spending my spare time playing badminton, billiards with friends, and enjoying authentic noodles. Catch me at the ARC gym or courts!",
    image: "/officers/evan 2024.png",
    funImage: "/officers/evan 2024.png",
    instagram: "https://www.instagram.com/evanhuang._/",
    linkedin: "https://www.linkedin.com/in/evan-huang243/",
  },
  {
    name: "Jeddy Marta",
    role: "Fundraising Officer",
    team: "Fundraising",
    bio: "Fundraising Officer for PERMIAS UIUC. Organizing culinary sales and campus pop-ups supporting our annual organizational budget.",
    image: "/officers/jeddy 2024.png",
    funImage: "/officers/jeddy 2024.png",
    instagram: "https://www.instagram.com/ewangganada/",
    linkedin: "https://www.linkedin.com/in/patrianada-ewangga/",
  },
  {
    name: "Benvito Themas",
    role: "Fundraising Officer",
    team: "Fundraising",
    bio:
      "Hey everyone, I’m Benvito! Majoring in Finance + Data Science. " +
      "Huge noodle enthusiast, bowling and billiards lover at the Illini Union Rec Room.",
    image: "/officers/benvito 2024.png",
    funImage: "/officers/benvito 2024.png",
    instagram: "https://www.instagram.com/jonathan.b.w/",
    linkedin: "https://www.linkedin.com/in/jwidjajakusuma/",
  },

  // PR & Marketing / Media
  {
    name: "Abigail Liaw",
    role: "Social Media Officer",
    team: "PR & Marketing",
    bio: "Social Media Officer for PERMIAS UIUC. Creating engaging Instagram reels, community highlights, and cultural spotlights.",
    image: "/officers/abigail 2024.png",
    funImage: "/officers/abigail 2024.png",
    instagram: "https://www.instagram.com/leonardoquarviando/",
    linkedin: "https://www.linkedin.com/in/leonardo-quarviando-2b6766288/",
  },
  {
    name: "Henry Lukas Hutagalung",
    role: "Documentation Officer",
    team: "PR & Marketing",
    bio: "Documentation Officer for PERMIAS UIUC. Capturing photography and cinematic retrospectives across all cultural events and gatherings.",
    image: "/officers/henry 2024.png",
    funImage: "/officers/henry 2024.png",
    instagram: "https://www.instagram.com/febeyem/",
    linkedin: "https://www.linkedin.com/in/febeyemima/",
  },
  {
    name: "Aicha Putri",
    role: "Graphic Designer",
    team: "PR & Marketing",
    bio: "Graphic Designer for PERMIAS UIUC. Designing visual brand guidelines, festival posters, typography, and artistic assets for Pasar Malam.",
    image: "/officers/aicha 2024.png",
    funImage: "/officers/aicha 2024.png",
    instagram: "https://www.instagram.com/keisha.alifia/",
    linkedin: "https://www.linkedin.com/in/keisha-ratu-alifia-638314207/",
  },

  // Technology
  {
    name: "Jonathan Widjajakusuma",
    role: "Technology Officer",
    team: "Tech Team",
    bio: "Technology Officer for PERMIAS UIUC. Architected the PERMIAS web platform, database integrations, and digital infrastructure.",
    image: "/officers/jonathan 2024.png",
    funImage: "/officers/jonathan 2024.png",
    instagram: "https://www.instagram.com/keisha.alifia/",
    linkedin: "https://www.linkedin.com/in/keisha-ratu-alifia-638314207/",
  },
];
