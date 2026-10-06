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
  event_date?: string;
  location?: string;
  description?: string;
  images: string[];
  display_order: number;
  rsvp_url?: string;
  ticket_url?: string;
  ticket_price?: string;
  capacity?: number;
  created_at?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  rsvp_url?: string;
  ticket_url?: string;
  ticket_price?: string;
  capacity?: number;
  cover_image?: string;
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

export interface PermiasEvent {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  start_time: string;
  end_time?: string;
  location_name?: string;
  location_address?: string;
  google_maps_url?: string;
  description?: string;
  cover_image_url?: string;
  gallery_images?: string[];
  rsvp_url?: string;
  ticket_url?: string;
  is_featured?: boolean;
  status?: "draft" | "published" | "archived" | "cancelled";
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}
