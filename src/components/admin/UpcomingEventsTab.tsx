import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { UpcomingEvent } from "../../types";

const UpcomingEventsTab: React.FC = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("upcoming_events")
      .select("*")
      .order("date", { ascending: true });
    if (data) setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("upcoming_events").insert({
      title: form.title,
      date: new Date(form.date).toISOString(),
      location: form.location,
      description: form.description,
    });
    setForm({ title: "", date: "", location: "", description: "" });
    setShowForm(false);
    await fetchEvents();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this upcoming event?")) return;
    await supabase.from("upcoming_events").delete().eq("id", id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-footer">Upcoming Events</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time *
              </label>
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
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
        <p className="text-gray-400">No upcoming events. Add one above — it will appear on the public Events page and Home page.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const isPast = new Date(event.date) < new Date();
            return (
              <div
                key={event.id}
                className={`flex items-start justify-between p-4 rounded-xl border ${
                  isPast ? "bg-gray-50 border-gray-200 opacity-60" : "bg-white border-gray-200"
                }`}
              >
                <div>
                  <div className="font-semibold text-footer">{event.title}</div>
                  <div className={`text-sm mt-0.5 ${isPast ? "text-gray-400" : "text-red"}`}>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isPast && " (past)"}
                  </div>
                  {event.location && (
                    <div className="text-sm text-gray-500">{event.location}</div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-sm text-red-500 hover:text-red-700 transition ml-4 flex-shrink-0"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsTab;
