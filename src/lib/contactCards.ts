// Contact cards are stored as flat site_content rows:
//   contact_cards_list          JSON array of slugs, in display order
//   contact_<slug>_<field>      one row per card field
export interface ContactCard {
  slug: string;
  title: string;
  desc: string;
  contact: string;
  image_url: string;
}

export const CARDS_LIST_KEY = "contact_cards_list";

const FIELD_KEY = /^contact_(.+?)_(title|desc|contact\d?|image_url)$/;

export const contactKey = (slug: string, field: string) =>
  `contact_${slug}_${field}`;

export function readContactRows(rows: { key: string; value: string }[]) {
  const map: Record<string, string> = {};
  rows.forEach((row) => {
    map[row.key] = row.value;
  });

  let listedSlugs: string[] = [];
  if (map[CARDS_LIST_KEY]) {
    try {
      listedSlugs = JSON.parse(map[CARDS_LIST_KEY]);
    } catch {}
  }

  // Older data has no list; recover the slugs from the field keys.
  const detectedSlugs = Array.from(
    new Set(
      rows
        .map((row) => row.key.match(FIELD_KEY)?.[1])
        .filter((slug): slug is string => Boolean(slug))
    )
  );

  return { map, listedSlugs, detectedSlugs };
}

// Legacy cards split contact info across contact1/contact2.
function resolveContact(slug: string, map: Record<string, string>): string {
  const single = map[contactKey(slug, "contact")];
  if (single !== undefined) return single;
  const c1 = map[contactKey(slug, "contact1")] ?? "";
  const c2 = map[contactKey(slug, "contact2")] ?? "";
  return [c1, c2].filter(Boolean).join("\n");
}

export function buildContactCard(
  slug: string,
  map: Record<string, string>,
  fallback?: ContactCard
): ContactCard {
  return {
    slug,
    title: map[contactKey(slug, "title")] ?? fallback?.title ?? "",
    desc: map[contactKey(slug, "desc")] ?? fallback?.desc ?? "",
    contact: resolveContact(slug, map) || fallback?.contact || "",
    image_url: map[contactKey(slug, "image_url")] ?? fallback?.image_url ?? "",
  };
}
