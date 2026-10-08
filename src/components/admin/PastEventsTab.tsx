import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { PastEvent } from "../../types";
import ImageUpload from "./ImageUpload";
import {
  sortPastEventsChronologically,
  parseEventDate,
  formatDatePretty,
} from "../../utils/eventDateUtils";

const PastEventsTab: React.FC = () => {
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    event_date: "",
    location: "",
    legacyDate: "",
  });
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEvents = async () => {
    const { data } = await supabase.from("past_events").select("*");
    if (data) {
      setEvents(sortPastEventsChronologically(data, true));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageUploaded = (url: string) => {
    setPendingImages((prev) => [...prev, url]);
  };

  const handleRemovePendingImage = (url: string) => {
    setPendingImages((prev) => prev.filter((u) => u !== url));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    setSaving(true);
    const maxOrder =
      events.length > 0 ? Math.max(...events.map((e) => e.display_order)) : -1;

    let computedDateString = form.legacyDate;
    let isoTimestamp = form.event_date ? new Date(form.event_date).toISOString() : null;

    if (form.event_date) {
      const pretty = formatDatePretty(new Date(form.event_date));
      computedDateString = form.location ? `${pretty}, ${form.location}` : pretty;
    }

    const payload: any = {
      name: form.name,
      date: computedDateString,
      event_date: isoTimestamp,
      location: form.location,
      images: pendingImages,
      display_order: maxOrder + 1,
    };

    const { error } = await supabase.from("past_events").insert(payload);

    if (error) {
      // Fallback for legacy database before running additive migration
      await supabase.from("past_events").insert({
        name: form.name,
        date: computedDateString,
        images: pendingImages,
        display_order: maxOrder + 1,
      });
    }

    setForm({ name: "", event_date: "", location: "", legacyDate: "" });
    setPendingImages([]);
    setShowForm(false);
    await fetchEvents();
    setSaving(false);
  };

  const handleDelete = async (event: PastEvent) => {
    if (!window.confirm(`Delete "${event.name}"? This cannot be undone.`)) return;
    setDeletingId(event.id);
    await supabase.from("past_events").delete().eq("id", event.id);
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-footer">Past Events</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Retrospective galleries, event dates, and photo carousels.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm bg-red text-white rounded-lg px-4 py-2 hover:opacity-90 transition"
        >
          {showForm ? "Cancel" : "+ Add Event"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSave}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Welcoming Event 2025"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date *
              </label>
              <input
                type="date"
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location / Venue
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Scotts Park or Illini Union"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos *
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {pendingImages.map((url) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt="pending"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePendingImage(url)}
                    className="absolute -top-1 -right-1 bg-red text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              <ImageUpload
                folder="events"
                onUploaded={handleImageUploaded}
                label="+ Add Photo"
              />
            </div>
            <p className="text-xs text-gray-400">
              Upload multiple photos. They will scroll in the event carousel.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-red text-white rounded-lg px-5 py-2 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Event"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-400">No past events yet. Add one above.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const parsed = parseEventDate(event.date, event.event_date);
            return (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {event.images?.[0] && (
                    <img
                      src={
                        event.images[0].startsWith("http")
                          ? event.images[0]
                          : process.env.PUBLIC_URL + event.images[0]
                      }
                      alt={event.name}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-footer">{event.name}</div>
                    <div className="text-sm text-gray-500">
                      {parsed.formattedDate || event.date}
                    </div>
                    {event.location && (
                      <div className="text-xs text-gray-400">📍 {event.location}</div>
                    )}
                    <div className="text-xs text-gray-400">
                      {event.images?.length || 0} photo(s)
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(event)}
                  disabled={deletingId === event.id}
                  className="text-sm text-red-500 hover:text-red-700 transition ml-4 flex-shrink-0 disabled:opacity-50"
                >
                  {deletingId === event.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PastEventsTab;
