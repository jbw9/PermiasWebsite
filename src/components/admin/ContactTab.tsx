import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { bustSiteContentCache } from "../../hooks/useSiteContent";
import ImageUpload from "./ImageUpload";

interface ContactCard {
  slug: string;
  title: string;
  desc: string;
  contact: string;
  image_url: string;
}

const EMPTY_FORM = { title: "", desc: "", contact: "", image_url: "" };

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

// Merge legacy contact1/contact2 fields into a single string
function resolveContact(slug: string, map: Record<string, string>): string {
  if (map[`contact_${slug}_contact`] !== undefined) return map[`contact_${slug}_contact`];
  const c1 = map[`contact_${slug}_contact1`] ?? "";
  const c2 = map[`contact_${slug}_contact2`] ?? "";
  return [c1, c2].filter(Boolean).join("\n");
}

const ContactTab: React.FC = () => {
  const [cards, setCards] = useState<ContactCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ContactCard | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCards = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("key, value")
      .like("key", "contact_%");

    if (!data) { setLoading(false); return; }

    const map: Record<string, string> = {};
    data.forEach((row) => { map[row.key] = row.value; });

    let slugs: string[] = [];
    if (map["contact_cards_list"]) {
      try { slugs = JSON.parse(map["contact_cards_list"]); } catch {}
    }

    if (slugs.length === 0) {
      // Auto-detect slugs from existing keys
      const slugSet = new Set<string>();
      data.forEach((row) => {
        const m = row.key.match(/^contact_(.+?)_(title|desc|contact\d?|image_url)$/);
        if (m) slugSet.add(m[1]);
      });
      slugs = Array.from(slugSet);
    }

    setCards(
      slugs.map((slug) => ({
        slug,
        title: map[`contact_${slug}_title`] ?? "",
        desc: map[`contact_${slug}_desc`] ?? "",
        contact: resolveContact(slug, map),
        image_url: map[`contact_${slug}_image_url`] ?? "",
      }))
    );
    setLoading(false);
  };

  useEffect(() => { fetchCards(); }, []);

  // Write all cards + list to site_content
  const persistCards = async (updatedCards: ContactCard[]) => {
    const now = new Date().toISOString();
    const rows = [
      { key: "contact_cards_list", value: JSON.stringify(updatedCards.map((c) => c.slug)), updated_at: now },
      ...updatedCards.flatMap((card) => [
        { key: `contact_${card.slug}_title`, value: card.title, updated_at: now },
        { key: `contact_${card.slug}_desc`, value: card.desc, updated_at: now },
        { key: `contact_${card.slug}_contact`, value: card.contact, updated_at: now },
        { key: `contact_${card.slug}_image_url`, value: card.image_url, updated_at: now },
      ]),
    ];
    await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    bustSiteContentCache();
  };

  const handleSaveEdit = async () => {
    if (!editForm) return;
    setSaving(true);
    const updatedCards = cards.map((c) => (c.slug === editForm.slug ? editForm : c));
    await persistCards(updatedCards);
    await fetchCards();
    setEditingSlug(null);
    setEditForm(null);
    setSaving(false);
  };

  const handleDelete = async (slug: string) => {
    const card = cards.find((c) => c.slug === slug);
    if (!window.confirm(`Delete the "${card?.title || slug}" card?`)) return;
    setDeleting(slug);

    // Remove the card's keys
    await supabase.from("site_content").delete().in("key", [
      `contact_${slug}_title`,
      `contact_${slug}_desc`,
      `contact_${slug}_contact`,
      `contact_${slug}_contact1`,
      `contact_${slug}_contact2`,
      `contact_${slug}_image_url`,
    ]);

    const updatedCards = cards.filter((c) => c.slug !== slug);
    const now = new Date().toISOString();
    await supabase.from("site_content").upsert(
      { key: "contact_cards_list", value: JSON.stringify(updatedCards.map((c) => c.slug)), updated_at: now },
      { onConflict: "key" }
    );

    bustSiteContentCache();
    await fetchCards();
    setDeleting(null);
  };

  const handleAddCard = async () => {
    if (!addForm.title.trim()) return;
    let slug = slugify(addForm.title);
    if (!slug) return;

    // Ensure unique slug
    let i = 2;
    while (cards.some((c) => c.slug === slug)) slug = `${slugify(addForm.title)}_${i++}`;

    setSaving(true);
    const newCard: ContactCard = { slug, ...addForm };
    await persistCards([...cards, newCard]);
    await fetchCards();
    setAddForm(EMPTY_FORM);
    setShowAddForm(false);
    setSaving(false);
  };

  if (loading) return <p className="text-gray-400 py-10 text-center">Loading...</p>;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-footer">Contact Cards</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {cards.length} card{cards.length !== 1 ? "s" : ""} on the Contact page
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm((v) => !v);
            setEditingSlug(null);
            setEditForm(null);
          }}
          className="text-sm bg-red text-white rounded-lg px-4 py-2 hover:opacity-90 transition font-medium"
        >
          {showAddForm ? "Cancel" : "+ Add Card"}
        </button>
      </div>

      {/* Add Card form */}
      {showAddForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-footer text-sm mb-4">New Contact Card</h3>
          <CardForm
            form={addForm}
            onChange={setAddForm}
            onSave={handleAddCard}
            onCancel={() => { setShowAddForm(false); setAddForm(EMPTY_FORM); }}
            saving={saving}
            isNew
          />
        </div>
      )}

      {/* Card list */}
      <div className="space-y-2">
        {cards.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            No contact cards yet. Add one above.
          </p>
        )}

        {cards.map((card) => (
          <div
            key={card.slug}
            className={`bg-white rounded-xl border overflow-hidden transition-shadow ${
              editingSlug === card.slug
                ? "border-red/30 shadow-sm shadow-red/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Summary row */}
            <div className="px-4 py-3 flex items-center gap-3">
              {card.image_url ? (
                <img
                  src={getImageSrc(card.image_url)}
                  alt={card.title}
                  className="h-12 w-12 rounded-full object-cover border border-gray-100 flex-shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-200 flex-shrink-0 flex items-center justify-center text-gray-300 text-lg">
                  ✉
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-footer truncate">
                  {card.title || <span className="italic text-gray-300">Untitled</span>}
                </p>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {card.desc || <span className="italic">No description</span>}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {editingSlug !== card.slug ? (
                  <>
                    <button
                      onClick={() => {
                        setEditingSlug(card.slug);
                        setEditForm({ ...card });
                        setShowAddForm(false);
                      }}
                      className="text-xs font-medium text-gray-500 hover:text-gray-800 transition px-2.5 py-1 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(card.slug)}
                      disabled={deleting === card.slug}
                      className="text-xs font-medium text-red-400 hover:text-red-600 transition px-2.5 py-1 rounded-md hover:bg-red-50 border border-transparent hover:border-red-100 disabled:opacity-50"
                    >
                      {deleting === card.slug ? "..." : "Delete"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setEditingSlug(null); setEditForm(null); }}
                    className="text-xs text-gray-400 hover:text-gray-600 transition px-2 py-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Inline edit panel */}
            {editingSlug === card.slug && editForm && (
              <div className="border-t border-gray-100 px-4 py-4 bg-gray-50/50">
                <CardForm
                  form={editForm}
                  onChange={setEditForm}
                  onSave={handleSaveEdit}
                  onCancel={() => { setEditingSlug(null); setEditForm(null); }}
                  saving={saving}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ——— Reusable form fields ———

interface CardFormProps {
  form: Omit<ContactCard, "slug">;
  onChange: (form: any) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew?: boolean;
}

const CardForm: React.FC<CardFormProps> = ({ form, onChange, onSave, onCancel, saving, isNew }) => (
  <div className="space-y-3">
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      {/* Image column */}
      <div className="flex-shrink-0 space-y-1.5">
        <p className="text-xs font-medium text-gray-600">Image</p>
        {form.image_url && (
          <img
            src={form.image_url.startsWith("http") ? form.image_url : process.env.PUBLIC_URL + form.image_url}
            alt="preview"
            className="h-16 w-16 rounded-full object-cover border border-gray-200"
          />
        )}
        <ImageUpload
          folder="contact"
          label="Upload"
          onUploaded={(url) => onChange({ ...form, image_url: url })}
        />
        <input
          type="text"
          value={form.image_url}
          onChange={(e) => onChange({ ...form, image_url: e.target.value })}
          placeholder="or paste URL"
          className="w-44 border border-gray-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-red/30 bg-white"
        />
      </div>

      {/* Fields column */}
      <div className="flex-1 space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => onChange({ ...form, title: e.target.value })}
            placeholder="e.g. General Permias"
            autoFocus
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => onChange({ ...form, desc: e.target.value })}
            rows={2}
            placeholder="Brief description shown on the card"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 resize-none bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Contact Info
            <span className="ml-1 font-normal text-gray-400">(use new lines for multiple contacts)</span>
          </label>
          <textarea
            value={form.contact}
            onChange={(e) => onChange({ ...form, contact: e.target.value })}
            rows={2}
            placeholder={"Azhura: +1 (217) 693-2442\nLeonardo: +1 (217) 979 9614"}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 resize-none bg-white"
          />
        </div>
      </div>
    </div>

    <div className="flex gap-2 pt-1">
      <button
        onClick={onSave}
        disabled={saving || !form.title.trim()}
        className="text-sm bg-red text-white rounded-lg px-4 py-1.5 hover:opacity-90 disabled:opacity-50 transition font-medium"
      >
        {saving ? "Saving…" : isNew ? "Add Card" : "Save Changes"}
      </button>
      <button
        onClick={onCancel}
        className="text-sm bg-white border border-gray-200 rounded-lg px-4 py-1.5 hover:bg-gray-50 transition text-gray-600"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default ContactTab;
