// Image URLs are either absolute (Supabase Storage) or paths under /public.
export function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}
