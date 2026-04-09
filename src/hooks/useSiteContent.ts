import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type ContentMap = Record<string, string>;

// Simple in-memory cache so multiple components sharing the same keys don't re-fetch
const cache: ContentMap = {};
let fetched = false;
let fetchPromise: Promise<void> | null = null;

async function primeCache(): Promise<void> {
  if (fetched) return;
  if (fetchPromise) { await fetchPromise; return; }
  fetchPromise = Promise.resolve(
    supabase.from("site_content").select("key, value")
  ).then(
    ({ data }) => {
      if (data) data.forEach((row: { key: string; value: string }) => { cache[row.key] = row.value; });
      fetched = true;
    },
    () => { fetched = true; }
  );
  return fetchPromise;
}

export function useSiteContent(keys: string[], defaults: ContentMap = {}): ContentMap {
  const [content, setContent] = useState<ContentMap>(() => {
    // Return defaults merged with whatever's already cached
    const merged: ContentMap = { ...defaults };
    keys.forEach((k) => { if (cache[k] !== undefined) merged[k] = cache[k]; });
    return merged;
  });

  useEffect(() => {
    primeCache().then(() => {
      const merged: ContentMap = { ...defaults };
      keys.forEach((k) => { if (cache[k] !== undefined) merged[k] = cache[k]; });
      setContent(merged);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return content;
}

// Call this after an admin update to bust the cache
export function bustSiteContentCache() {
  fetched = false;
  fetchPromise = null;
  Object.keys(cache).forEach((k) => delete cache[k]);
}
