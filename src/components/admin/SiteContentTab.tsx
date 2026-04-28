import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../../supabaseClient";
import { SiteContent } from "../../types";
import ImageUpload from "./ImageUpload";
import { bustSiteContentCache } from "../../hooks/useSiteContent";
import ContactTab from "./ContactTab";

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

function getSectionFromKey(key: string): string {
  const part = key.split("_")[0];
  return part.charAt(0).toUpperCase() + part.slice(1);
}

const SECTION_ICONS: Record<string, string> = {
  Home: "⌂",
  About: "i",
  Events: "◈",
  Contact: "✉",
  Guide: "☰",
  Transport: "⟳",
  Team: "◎",
  Footer: "▤",
  Nav: "≡",
  Hero: "★",
};

function getSectionIcon(section: string): string {
  return SECTION_ICONS[section] ?? "◇";
}

const SiteContentTab: React.FC = () => {
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .order("key");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  // Derive sections from DB keys, excluding contact_ keys (managed by Contact section)
  const sections = useMemo(() => {
    const map: Record<string, SiteContent[]> = {};
    items.forEach((item) => {
      if (item.key.startsWith("contact_")) return;
      const section = getSectionFromKey(item.key);
      if (!map[section]) map[section] = [];
      map[section].push(item);
    });
    return map;
  }, [items]);

  // All sidebar entries: "Contact" is always present, rest come from DB
  const sectionNames = useMemo(
    () => [...Object.keys(sections), "Contact"].sort(),
    [sections]
  );

  useEffect(() => {
    if (sectionNames.length > 0 && activeSection === null) {
      setActiveSection(sectionNames[0]);
    }
  }, [sectionNames, activeSection]);

  const startEdit = (item: SiteContent) => {
    setEditing((prev) => ({ ...prev, [item.key]: item.value }));
  };

  const handleSave = async (item: SiteContent) => {
    const newValue = editing[item.key];
    if (newValue === undefined) return;
    setSaving(item.key);
    await supabase
      .from("site_content")
      .upsert({ key: item.key, value: newValue, updated_at: new Date().toISOString() }, { onConflict: "key" });
    bustSiteContentCache();
    await fetchItems();
    setEditing((prev) => { const next = { ...prev }; delete next[item.key]; return next; });
    setSaving(null);
    setSaved(item.key);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleCancel = (key: string) => {
    setEditing((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  if (loading) return <p className="text-gray-400 py-10 text-center">Loading...</p>;

  const activeItems = activeSection && activeSection !== "Contact"
    ? (sections[activeSection] ?? [])
    : [];

  return (
    <div className="flex gap-5 min-h-[500px]">
      {/* Sidebar */}
      <div className="w-44 flex-shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Sections
        </p>
        <nav className="space-y-0.5">
          {sectionNames.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeSection === section
                  ? "bg-red/10 text-red"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <span
                className={`text-xs w-5 h-5 flex items-center justify-center rounded flex-shrink-0 font-mono ${
                  activeSection === section ? "text-red" : "text-gray-400"
                }`}
              >
                {getSectionIcon(section)}
              </span>
              <span className="truncate">{section}</span>
              {section !== "Contact" && (
                <span
                  className={`ml-auto text-xs rounded-full px-1.5 py-0.5 font-medium flex-shrink-0 ${
                    activeSection === section
                      ? "bg-red/20 text-red"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {sections[section]?.length ?? 0}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="w-px bg-gray-200 flex-shrink-0" />

      {/* Content panel */}
      <div className="flex-1 min-w-0">
        {activeSection === "Contact" ? (
          <ContactTab />
        ) : activeSection ? (
          <>
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <h2 className="text-base font-semibold text-footer">{activeSection}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {activeItems.length} field{activeItems.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {activeItems.map((item) => {
                const isEditing = item.key in editing;
                const currentValue = editing[item.key] ?? item.value;

                return (
                  <div
                    key={item.key}
                    className={`bg-white rounded-xl border overflow-hidden transition-shadow ${
                      isEditing
                        ? "border-red/30 shadow-sm shadow-red/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Row header — always visible */}
                    <div className="px-4 py-3 flex items-center gap-3">
                      {/* Image thumbnail */}
                      {item.type === "image" && item.value && !isEditing && (
                        <img
                          src={getImageSrc(item.value)}
                          alt={item.label}
                          className="h-10 w-14 rounded-md object-cover border border-gray-100 flex-shrink-0"
                        />
                      )}

                      {/* Label + value preview */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-footer leading-tight">
                          {item.label || item.key}
                        </p>
                        {!isEditing && item.type !== "image" && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {item.value
                              ? item.value.length > 80
                                ? item.value.slice(0, 80) + "…"
                                : item.value
                              : <span className="italic text-gray-300">No value</span>}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {saved === item.key && (
                          <span className="text-xs text-green-600 font-medium">Saved</span>
                        )}
                        {!isEditing ? (
                          <button
                            onClick={() => startEdit(item)}
                            className="text-xs font-medium text-gray-500 hover:text-gray-800 transition px-2.5 py-1 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200"
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCancel(item.key)}
                            className="text-xs text-gray-400 hover:text-gray-600 transition"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Editing panel */}
                    {isEditing && (
                      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50 space-y-3">
                        {item.type === "image" ? (
                          <div className="flex items-start gap-3">
                            {currentValue && (
                              <img
                                src={getImageSrc(currentValue)}
                                alt={item.label}
                                className="h-20 w-28 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 space-y-2">
                              <ImageUpload
                                folder="site-content"
                                label="Upload image"
                                currentUrl={currentValue}
                                onUploaded={(url) =>
                                  setEditing((prev) => ({ ...prev, [item.key]: url }))
                                }
                              />
                              <input
                                type="text"
                                value={currentValue}
                                onChange={(e) =>
                                  setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))
                                }
                                placeholder="or paste URL"
                                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red/30 bg-white"
                              />
                            </div>
                          </div>
                        ) : currentValue.length > 100 ? (
                          <textarea
                            value={currentValue}
                            onChange={(e) =>
                              setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))
                            }
                            rows={4}
                            autoFocus
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 resize-none bg-white"
                          />
                        ) : (
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) =>
                              setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))
                            }
                            autoFocus
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red/30 bg-white"
                          />
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(item)}
                            disabled={saving === item.key}
                            className="text-sm bg-red text-white rounded-lg px-4 py-1.5 hover:opacity-90 disabled:opacity-50 transition font-medium"
                          >
                            {saving === item.key ? "Saving…" : "Save"}
                          </button>
                          <button
                            onClick={() => handleCancel(item.key)}
                            className="text-sm bg-white border border-gray-200 rounded-lg px-4 py-1.5 hover:bg-gray-50 transition text-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-sm py-10 text-center">Select a section to edit</p>
        )}
      </div>
    </div>
  );
};

export default SiteContentTab;
