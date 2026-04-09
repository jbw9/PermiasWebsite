import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { SiteContent } from "../../types";
import ImageUpload from "./ImageUpload";
import { bustSiteContentCache } from "../../hooks/useSiteContent";

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

const SiteContentTab: React.FC = () => {
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .order("key");
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const startEdit = (item: SiteContent) => {
    setEditing((prev) => ({ ...prev, [item.key]: item.value }));
  };

  const handleSave = async (item: SiteContent) => {
    const newValue = editing[item.key];
    if (newValue === undefined) return;
    setSaving(item.key);
    await supabase
      .from("site_content")
      .update({ value: newValue, updated_at: new Date().toISOString() })
      .eq("key", item.key);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-footer">Site Content</h2>
        <p className="text-sm text-gray-500 mt-1">
          Edit text and images that appear on public pages. Changes go live immediately.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const isEditing = item.key in editing;
          const currentValue = editing[item.key] ?? item.value;

          return (
            <div
              key={item.key}
              className="bg-white rounded-xl border border-gray-200 p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-sm text-footer">{item.label || item.key}</p>
                  <p className="text-xs text-gray-400 font-mono">{item.key}</p>
                </div>
                {saved === item.key && (
                  <span className="text-xs text-green-600 font-medium">Saved!</span>
                )}
              </div>

              {item.type === "image" ? (
                <div className="space-y-3">
                  {currentValue && (
                    <img
                      src={getImageSrc(currentValue)}
                      alt={item.label}
                      className="h-32 rounded-lg object-cover border border-gray-100"
                    />
                  )}
                  <ImageUpload
                    folder="site-content"
                    label="Upload new image"
                    currentUrl={currentValue}
                    onUploaded={(url) => {
                      setEditing((prev) => ({ ...prev, [item.key]: url }));
                    }}
                  />
                  {isEditing && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) =>
                          setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))
                        }
                        placeholder="or paste URL / path"
                        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(item)}
                          disabled={saving === item.key}
                          className="text-sm bg-red text-white rounded-lg px-4 py-1.5 hover:opacity-90 disabled:opacity-50 transition"
                        >
                          {saving === item.key ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => handleCancel(item.key)}
                          className="text-sm bg-gray-100 border border-gray-300 rounded-lg px-4 py-1.5 hover:bg-gray-200 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {isEditing ? (
                    <>
                      {currentValue.length > 100 ? (
                        <textarea
                          value={currentValue}
                          onChange={(e) =>
                            setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))
                          }
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
                        />
                      ) : (
                        <input
                          type="text"
                          value={currentValue}
                          onChange={(e) =>
                            setEditing((prev) => ({ ...prev, [item.key]: e.target.value }))
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(item)}
                          disabled={saving === item.key}
                          className="text-sm bg-red text-white rounded-lg px-4 py-1.5 hover:opacity-90 disabled:opacity-50 transition"
                        >
                          {saving === item.key ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => handleCancel(item.key)}
                          className="text-sm bg-gray-100 border border-gray-300 rounded-lg px-4 py-1.5 hover:bg-gray-200 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{item.value}</p>
                      <button
                        onClick={() => startEdit(item)}
                        className="text-sm text-blue-500 hover:text-blue-700 transition flex-shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteContentTab;
