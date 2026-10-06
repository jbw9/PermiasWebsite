import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import { UpcomingEvent } from "../../types";
import ImageUpload from "./ImageUpload";
import {
  autoArchivePastUpcomingEvents,
  moveSingleEventToPast,
} from "../../lib/eventArchive";

const emptyForm = {
  title: "",
  date: "",
  location: "",
  description: "",
  rsvp_url: "",
  ticket_url: "",
  ticket_price: "",
  capacity: "",
  cover_image: "",
};

const UpcomingEventsTab: React.FC = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [movingId, setMovingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase
      .from("upcoming_events")
      .select("*")
      .order("date", { ascending: true });
    if (data) setEvents(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: any = {
      title: form.title,
      date: new Date(form.date).toISOString(),
      location: form.location,
      description: form.description,
      rsvp_url: form.rsvp_url,
      ticket_url: form.ticket_url,
      ticket_price: form.ticket_price,
      capacity: form.capacity ? parseInt(form.capacity, 10) : 0,
      cover_image: form.cover_image,
    };

    const { error } = await supabase.from("upcoming_events").insert(payload);

    if (error) {
      // Graceful fallback if database additive columns are still pending execution in Supabase SQL editor
      await supabase.from("upcoming_events").insert({
        title: form.title,
        date: new Date(form.date).toISOString(),
        location: form.location,
        description: form.description,
      });
    }

    setForm(emptyForm);
    setShowForm(false);
    await fetchEvents();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this upcoming event?")) return;
    await supabase.from("upcoming_events").delete().eq("id", id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleMoveToPast = async (event: UpcomingEvent) => {
    setMovingId(event.id);
    const res = await moveSingleEventToPast(event);
    if (!res.success) {
      alert(`Could not move event: ${res.error}`);
    } else {
      await fetchEvents();
    }
    setMovingId(null);
  };

  const handleArchiveAllPassed = async () => {
    if (!window.confirm("Move all passed events into the Past Events gallery?")) return;
    setArchiving(true);
    const res = await autoArchivePastUpcomingEvents();
    if (res.error) {
      alert(`Archive error: ${res.error}`);
    } else {
      alert(`Successfully moved ${res.archivedCount} event(s) to Past Events!`);
      await fetchEvents();
    }
    setArchiving(false);
  };

  const passedEvents = events.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-footer">Upcoming Events</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage upcoming announcements, RSVP/ticketing links, and capacity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {passedEvents.length > 0 && (
            <button
              onClick={handleArchiveAllPassed}
              disabled={archiving}
              className="text-xs bg-amber-600 text-white rounded-lg px-3 py-2 hover:bg-amber-700 transition disabled:opacity-50"
            >
              {archiving ? "Moving..." : `⚡ Move ${passedEvents.length} Passed Event(s)`}
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-sm bg-red text-white rounded-lg px-4 py-2 hover:opacity-90 transition"
          >
            {showForm ? "Cancel" : "+ Add Event"}
          </button>
        </div>
      </div>

      {/* Auto-archive banner if passed events exist */}
      {passedEvents.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">📅</span>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                {passedEvents.length} event(s) have passed
              </p>
              <p className="text-xs text-amber-700">
                They can be automatically moved into the Past Events calendar with all photos & info preserved.
              </p>
            </div>
          </div>
          <button
            onClick={handleArchiveAllPassed}
            disabled={archiving}
            className="text-xs font-semibold bg-amber-700 text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition disabled:opacity-50"
          >
            {archiving ? "Moving..." : "Auto-Move All to Past Events"}
          </button>
        </div>
      )}

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
                placeholder="e.g. Pasar Malam 2025"
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
                Location / Venue
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Illini Union, Latzer Hall"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Price
              </label>
              <input
                type="text"
                value={form.ticket_price}
                onChange={(e) => setForm({ ...form, ticket_price: e.target.value })}
                placeholder="e.g. Free, $5, or Early Bird: $10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RSVP / Registration URL
              </label>
              <input
                type="url"
                value={form.rsvp_url}
                onChange={(e) => setForm({ ...form, rsvp_url: e.target.value })}
                placeholder="https://forms.gle/... or Eventbrite"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Direct Ticket URL (if paid event)
              </label>
              <input
                type="url"
                value={form.ticket_url}
                onChange={(e) => setForm({ ...form, ticket_url: e.target.value })}
                placeholder="https://ticket-platform.com/..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity Limit (Optional)
              </label>
              <input
                type="number"
                min="0"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                placeholder="e.g. 250 (leave empty for unlimited)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Poster / Flyer
              </label>
              <ImageUpload
                folder="events/upcoming"
                currentUrl={form.cover_image}
                onUploaded={(url) => setForm({ ...form, cover_image: url })}
                label="Upload Cover Poster"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description / Schedule Details
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Provide event overview, schedule, food/merch details..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red text-sm"
            />
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
        <p className="text-gray-400">
          No upcoming events. Add one above — it will appear on the public Events page and Home page.
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const isPast = new Date(event.date) < new Date();
            return (
              <div
                key={event.id}
                className={`flex flex-col sm:flex-row sm:items-start justify-between p-4 rounded-xl border gap-4 ${
                  isPast ? "bg-amber-50/50 border-amber-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {event.cover_image && (
                    <img
                      src={
                        event.cover_image.startsWith("http")
                          ? event.cover_image
                          : process.env.PUBLIC_URL + event.cover_image
                      }
                      alt={event.title}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-footer text-lg">{event.title}</span>
                      {isPast && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
                          Passed
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-sm mt-0.5 ${
                        isPast ? "text-amber-800 font-medium" : "text-red font-medium"
                      }`}
                    >
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {event.location && (
                      <div className="text-sm text-gray-600 mt-0.5 flex items-center gap-1">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.description && (
                      <p className="text-xs text-gray-500 mt-2 max-w-xl line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {event.ticket_price && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md border border-gray-200">
                          🎟️ {event.ticket_price}
                        </span>
                      )}
                      {event.rsvp_url && (
                        <a
                          href={event.rsvp_url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-red/10 text-red text-xs px-2.5 py-1 rounded-md hover:bg-red/20 transition font-medium"
                        >
                          RSVP Link ↗
                        </a>
                      )}
                      {event.ticket_url && (
                        <a
                          href={event.ticket_url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md hover:bg-blue-100 transition font-medium"
                        >
                          Buy Tickets ↗
                        </a>
                      )}
                      {Boolean(event.capacity) && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md">
                          👥 Capacity: {event.capacity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end gap-2 flex-shrink-0">
                  {isPast && (
                    <button
                      onClick={() => handleMoveToPast(event)}
                      disabled={movingId === event.id}
                      className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition disabled:opacity-50 whitespace-nowrap"
                    >
                      {movingId === event.id ? "Moving..." : "Move to Past"}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsTab;
