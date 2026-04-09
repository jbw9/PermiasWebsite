import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Geo is fetched once per browser session (module-level cache)
interface GeoData {
  country: string;
  country_code: string;
  city: string;
  latitude: number;
  longitude: number;
}

let geoCache: GeoData | null = null;
let geoFetching = false;
let geoCallbacks: Array<(g: GeoData) => void> = [];

async function getGeo(): Promise<GeoData> {
  if (geoCache) return geoCache;
  if (geoFetching) {
    return new Promise((resolve) => geoCallbacks.push(resolve));
  }
  geoFetching = true;
  try {
    const r = await fetch("https://ipapi.co/json/");
    const d = await r.json();
    geoCache = {
      country: d.country_name || "",
      country_code: d.country_code || "",
      city: d.city || "",
      latitude: d.latitude || 0,
      longitude: d.longitude || 0,
    };
  } catch {
    geoCache = { country: "", country_code: "", city: "", latitude: 0, longitude: 0 };
  }
  geoFetching = false;
  const g = geoCache!;
  geoCallbacks.forEach((cb) => cb(g));
  geoCallbacks = [];
  return g;
}

function getVisitorId(): string {
  let id = localStorage.getItem("perm_vid");
  if (!id) {
    id = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("perm_vid", id);
  }
  return id;
}

export default function PageViewTracker() {
  const { pathname } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Don't double-track the same path (StrictMode fires effects twice in dev)
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const track = async () => {
      const visitor_id = getVisitorId();
      const geo = await getGeo();
      supabase.from("page_views").insert({
        visitor_id,
        path: pathname,
        country: geo.country,
        country_code: geo.country_code,
        city: geo.city,
        latitude: geo.latitude,
        longitude: geo.longitude,
      }).then(
        () => {},
        () => {}
      );
    };

    track();
  }, [pathname]);

  return null;
}
