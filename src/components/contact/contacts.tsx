import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

interface ContactCard {
  slug: string;
  title: string;
  desc: string;
  contact: string;
  image_url: string;
}

// Shown immediately (before DB fetch) and as fallback if no DB data exists
const DEFAULT_CARDS: ContactCard[] = [
  {
    slug: "collab",
    title: "Collab With Us",
    desc: "We'd love to talk about how we can work together.",
    contact: "Email: permias.uiuc@gmail.com",
    image_url: "/Home/networking.png",
  },
  {
    slug: "general",
    title: "General Permias",
    desc: "We're here to help with any questions regarding permias.",
    contact: "Leonardo: +1 (217) 979 9614\nAzhura: +1 (217) 693-2442",
    image_url: "/ContactUs/permLogo.png",
  },
  {
    slug: "lpdp",
    title: "LPDP",
    desc: "Discuss if you have any questions related to LPDP",
    contact: "David: +1 (224) 418 8775",
    image_url: "/ContactUs/lpdp.png",
  },
  {
    slug: "grad_asst",
    title: "Graduate Assistant",
    desc: "We'd love to assist you anything regarding graduate education at UIUC.",
    contact: "Regina Giovanni: +1 (551) 297-9660",
    image_url: "/ContactUs/grad.png",
  },
  {
    slug: "indonesia_maju",
    title: "Indonesia Maju",
    desc: "Discuss if you have any questions related to Indonesia Maju",
    contact: "Alif: +62 813-8355-0907",
    image_url: "/ContactUs/indonesiamaju.png",
  },
];

function resolveContact(slug: string, map: Record<string, string>): string {
  if (map[`contact_${slug}_contact`] !== undefined) return map[`contact_${slug}_contact`];
  const c1 = map[`contact_${slug}_contact1`] ?? "";
  const c2 = map[`contact_${slug}_contact2`] ?? "";
  return [c1, c2].filter(Boolean).join("\n");
}

const Contacts = () => {
  // Start with defaults so there's no loading flash
  const [cards, setCards] = useState<ContactCard[]>(DEFAULT_CARDS);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("key, value")
        .like("key", "contact_%");

      if (!data || data.length === 0) return;

      const map: Record<string, string> = {};
      data.forEach((row) => { map[row.key] = row.value; });

      let slugs: string[] = [];
      if (map["contact_cards_list"]) {
        try { slugs = JSON.parse(map["contact_cards_list"]); } catch {}
      }

      if (slugs.length === 0) {
        // No list yet — fall back to detecting slugs from existing keys
        const slugSet = new Set<string>();
        data.forEach((row) => {
          const m = row.key.match(/^contact_(.+?)_(title|desc|contact\d?|image_url)$/);
          if (m) slugSet.add(m[1]);
        });
        // Preserve default ordering
        const defaultSlugs = DEFAULT_CARDS.map((c) => c.slug);
        const extras = Array.from(slugSet).filter((s) => !defaultSlugs.includes(s));
        slugs = [...defaultSlugs.filter((s) => slugSet.has(s)), ...extras];
      }

      const defaults = Object.fromEntries(DEFAULT_CARDS.map((c) => [c.slug, c]));

      setCards(
        slugs.map((slug) => ({
          slug,
          title: map[`contact_${slug}_title`] ?? defaults[slug]?.title ?? "",
          desc: map[`contact_${slug}_desc`] ?? defaults[slug]?.desc ?? "",
          contact: resolveContact(slug, map) || defaults[slug]?.contact || "",
          image_url: map[`contact_${slug}_image_url`] ?? defaults[slug]?.image_url ?? "",
        }))
      );
    };

    fetchCards();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 px-4 mb-[100px] md:px-8">
        <span className="text-4xl font-bold text-red mb-[20px] md:text-5xl text-center">
          Contact Us
        </span>
        <span className="text-xl text-center text-footer md:text-2xl">
          Get in touch and let us know how we can help
        </span>

        <div className="flex flex-wrap justify-center gap-[40px] mt-[40px] max-w-[1160px] w-full">
          {cards.map((card) => (
            <div
              key={card.slug}
              className="h-auto min-h-[468px] w-[360px] pb-8 rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200"
            >
              <img
                className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px] object-contain"
                src={getImageSrc(card.image_url)}
                alt={card.title}
              />
              <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px]">
                <span className="text-2xl font-semibold text-center md:text-3xl text-footer">
                  {card.title}
                </span>
                <div className="w-full mt-4 text-base text-center md:text-lg">
                  {card.desc}
                </div>
                <div className="w-full mt-[40px] text-base md:text-lg text-center space-y-1">
                  {card.contact.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
