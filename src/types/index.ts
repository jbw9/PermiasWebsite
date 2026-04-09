export interface Officer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  fun_image_url: string;
  instagram: string;
  linkedin: string;
  display_order: number;
  created_at?: string;
}

export interface PastEvent {
  id: string;
  name: string;
  date: string;
  images: string[];
  display_order: number;
  created_at?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  created_at?: string;
}

export interface LinkClick {
  id: string;
  link_name: string;
  count: number;
  updated_at?: string;
}

export interface PageView {
  id: string;
  visitor_id: string;
  path: string;
  country: string;
  country_code: string;
  city: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: "text" | "image";
  label: string;
  updated_at?: string;
}
