import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Officer } from "../../types";
import ImageUpload from "./ImageUpload";

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  instagram: "",
  linkedin: "",
  display_order: 0,
  image_url: "",
  fun_image_url: "",
};

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

const OfficersTab: React.FC = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const fetchOfficers = async () => {
    const { data } = await supabase
      .from("officers")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setOfficers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const startEdit = (officer: Officer) => {
    setForm({
      name: officer.name,
      role: officer.role,
      bio: officer.bio || "",
      instagram: officer.instagram || "",
      linkedin: officer.linkedin || "",
      display_order: officer.display_order,
      image_url: officer.image_url || "",
      fun_image_url: officer.fun_image_url || "",
    });
    setEditingId(officer.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      instagram: form.instagram,
      linkedin: form.linkedin,
      display_order: Number(form.display_order),
      image_url: form.image_url,
      fun_image_url: form.fun_image_url,
    };

    if (editingId) {
      await supabase.from("officers").update(payload).eq("id", editingId);
    } else {
      await supabase.from("officers").insert(payload);
    }

    resetForm();
    await fetchOfficers();
    setSaving(false);
  };

  const handleDelete = async (officer: Officer) => {
    if (!window.confirm(`Delete ${officer.name}?`)) return;
    setDeletingId(officer.id);
    await supabase.from("officers").delete().eq("id", officer.id);
    setOfficers((prev) => prev.filter((o) => o.id !== officer.id));
    setDeletingId(null);
  };

  const handleDrop = async (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const reordered = [...officers];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    const updated = reordered.map((o, i) => ({ ...o, display_order: i }));
    setOfficers(updated);
    setDragIdx(null);
    setOverIdx(null);
    setSavingOrder(true);
    await Promise.all(
      updated.map((o) =>
        supabase.from("officers").update({ display_order: o.display_order }).eq("id", o.id)
      )
    );
    setSavingOrder(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-footer">Officers</h2>
        <button
          onClick={() => {
            if (showForm && !editingId) {
              resetForm();
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
          className="text-sm bg-red text-white rounded-lg px-4 py-2 hover:opacity-90 transition"
        >
          {showForm && !editingId ? "Cancel" : "+ Add Officer"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSave}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4"
        >
          <h3 className="font-semibold text-footer">
            {editingId ? "Edit Officer" : "New Officer"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Photo</label>
              <ImageUpload
                folder="officers"
                onUploaded={(url) => setForm({ ...form, image_url: url })}
                label="Upload Main Photo"
                currentUrl={form.image_url}
              />
              {form.image_url && (
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="or paste URL / path"
                  className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fun Photo</label>
              <ImageUpload
                folder="officers/fun"
                onUploaded={(url) => setForm({ ...form, fun_image_url: url })}
                label="Upload Fun Photo"
                currentUrl={form.fun_image_url}
              />
              {form.fun_image_url && (
                <input
                  type="text"
                  value={form.fun_image_url}
                  onChange={(e) => setForm({ ...form, fun_image_url: e.target.value })}
                  placeholder="or paste URL / path"
                  className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-red text-white rounded-lg px-5 py-2 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Officer" : "Add Officer"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-100 border border-gray-300 rounded-lg px-5 py-2 text-sm hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : officers.length === 0 ? (
        <p className="text-gray-400">No officers yet. Add one above — they'll appear on the Team page.</p>
      ) : (
        <>
          {savingOrder && (
            <p className="text-xs text-gray-400 text-right">Saving order...</p>
          )}
          <p className="text-xs text-gray-400">Drag ≡ to reorder</p>
          <div className="space-y-2">
            {officers.map((officer, idx) => (
              <div
                key={officer.id}
                draggable
                onDragStart={() => setDragIdx(idx)}
                onDragOver={(e) => { e.preventDefault(); setOverIdx(idx); }}
                onDrop={() => { if (dragIdx !== null) handleDrop(dragIdx, idx); }}
                onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
                className={`flex items-center justify-between p-3 bg-white rounded-xl border transition ${
                  overIdx === idx && dragIdx !== idx
                    ? "border-red bg-red/5"
                    : dragIdx === idx
                    ? "border-gray-300 opacity-50"
                    : "border-gray-200"
                }`}
              >
                {/* Drag handle */}
                <span className="text-gray-300 cursor-grab active:cursor-grabbing mr-2 text-lg select-none">≡</span>

                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {officer.image_url ? (
                    <img
                      src={getImageSrc(officer.image_url)}
                      alt={officer.name}
                      className="w-12 h-12 object-cover rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-footer truncate">{officer.name}</div>
                    <div className="text-xs text-red">{officer.role}</div>
                  </div>
                </div>
                <div className="flex gap-3 ml-4 flex-shrink-0">
                  <button
                    onClick={() => startEdit(officer)}
                    className="text-sm text-blue-500 hover:text-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(officer)}
                    disabled={deletingId === officer.id}
                    className="text-sm text-red-500 hover:text-red-700 transition disabled:opacity-50"
                  >
                    {deletingId === officer.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OfficersTab;
