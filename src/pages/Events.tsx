import React, { useState, useEffect } from "react";
import PastEvents from "../components/events/pastEvents";
import { supabase } from "../supabaseClient";
import { PastEvent, UpcomingEvent } from "../types";
import { pastEvents as defaultPastEvents } from "../data/past_events";
import { upcomingEventsData as defaultUpcomingEvents } from "../data/upcoming_events";
import {
  sortPastEventsChronologically,
  getGoogleCalendarUrl,
  getIcsDataUrl,
} from "../utils/eventDateUtils";

function normalizeImages(images: string[]): string[] {
  return images.map((img) =>
    img.startsWith("http") ? img : process.env.PUBLIC_URL + img
  );
}

const EventPage: React.FC = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase
        .from("past_events")
        .select("*")
        .order("display_order", { ascending: true }),
      supabase
        .from("upcoming_events")
        .select("*")
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true }),
    ]).then(([pastResult, upcomingResult]) => {
      // 1. Process Past Events: ensure 2026 events (KPIB Fundraiser, Batik Day, etc.) are always present
      const pastMap = new Map<string, PastEvent>();

      // Seed with static 2026 past events (contains 68 recap photos for KPIB Fundraiser 2026)
      defaultPastEvents.forEach((e) => {
        pastMap.set(e.name.toLowerCase().trim(), {
          ...e,
          images: normalizeImages(e.images || []),
        });
      });

      // Layer in Supabase database past events
      if (pastResult.data && pastResult.data.length > 0) {
        pastResult.data.forEach((e: PastEvent) => {
          const key = e.name.toLowerCase().trim();
          const existing = pastMap.get(key);
          if (!existing) {
            pastMap.set(key, {
              ...e,
              images: normalizeImages(e.images || []),
            });
          } else if (existing.images.length === 0 && e.images && e.images.length > 0) {
            pastMap.set(key, {
              ...existing,
              ...e,
              images: normalizeImages(e.images || []),
            });
          }
        });
      }

      setPastEvents(sortPastEventsChronologically(Array.from(pastMap.values()), true));

      // 2. Process Upcoming Events: if database has upcoming events, use them; otherwise use 2026 scheduled events
      const dbUpcoming = upcomingResult.data || [];
      if (dbUpcoming.length > 0) {
        const mergedUpcoming = [...dbUpcoming];
        defaultUpcomingEvents.forEach((def) => {
          if (!mergedUpcoming.some((u) => u.title.toLowerCase().trim() === def.title.toLowerCase().trim())) {
            mergedUpcoming.push(def);
          }
        });
        setUpcomingEvents(mergedUpcoming);
      } else {
        setUpcomingEvents(defaultUpcomingEvents);
      }

      setLoading(false);
    });
  }, []);

  return (
    <div className="mb-[100px] overflow-hidden">
      <div className="flex items-end justify-center w-full md:h-[600px]">
        <img
          src={process.env.PUBLIC_URL + "/events/welcoming_event_2024/one.png"}
          alt="Background"
          className="object-cover w-full h-[300px] md:h-[600px]"
        />
      </div>
      <div className="text-center mt-[50px]">
        {upcomingEvents.length > 0 && (
          <div className="mb-[80px]">
            <div>
              <span className="text-4xl font-semibold md:text-5xl text-footer">
                Upcoming{" "}
              </span>
              <span className="text-4xl font-bold md:text-5xl text-red">
                Events
              </span>
            </div>
            <div className="mt-[40px] flex flex-col items-center gap-6 px-[30px] md:px-[170px]">
              {upcomingEvents.map((event) => {
                const googleCalUrl = getGoogleCalendarUrl({
                  title: event.title,
                  date: event.date,
                  location: event.location,
                  description: event.description,
                });
                const icsUrl = getIcsDataUrl({
                  title: event.title,
                  date: event.date,
                  location: event.location,
                  description: event.description,
                });

                return (
                  <div
                    key={event.id}
                    className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 text-left border border-gray-100 flex flex-col sm:flex-row gap-6 items-start"
                  >
                    {event.cover_image && (
                      <img
                        src={
                          event.cover_image.startsWith("http")
                            ? event.cover_image
                            : process.env.PUBLIC_URL + event.cover_image
                        }
                        alt={event.title}
                        className="w-full sm:w-44 h-44 object-cover rounded-xl border border-gray-200 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 w-full">
                      <div className="text-2xl font-semibold text-footer">
                        {event.title}
                      </div>
                      <div className="text-red mt-1 font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      {event.location && (
                        <div className="text-gray-500 mt-1 flex items-center gap-1 text-sm">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                      )}

                      {/* Ticket price & capacity badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {event.ticket_price && (
                          <span className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-200">
                            🎟️ {event.ticket_price}
                          </span>
                        )}
                        {Boolean(event.capacity) && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                            👥 Capacity: {event.capacity}
                          </span>
                        )}
                      </div>

                      {event.description && (
                        <div className="text-gray-700 mt-3 text-sm leading-relaxed">
                          {event.description}
                        </div>
                      )}

                      {/* Action buttons: RSVP, Ticketing, Calendar export */}
                      <div className="flex flex-wrap items-center gap-3 mt-5 pt-3 border-t border-gray-100">
                        {event.rsvp_url && (
                          <a
                            href={event.rsvp_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition"
                          >
                            RSVP Now
                          </a>
                        )}
                        {event.ticket_url && (
                          <a
                            href={event.ticket_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-footer text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition"
                          >
                            Get Tickets
                          </a>
                        )}
                        <a
                          href={googleCalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-2 rounded-xl hover:bg-gray-200 transition"
                        >
                          + Google Calendar
                        </a>
                        <a
                          href={icsUrl}
                          download={`${event.title.toLowerCase().replace(/\s+/g, "-")}.ics`}
                          className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-2 rounded-xl hover:bg-gray-200 transition"
                        >
                          + iCal (.ics)
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-[130px]">
          <div>
            <span className="text-4xl font-semibold md:text-5xl text-footer">
              Past{" "}
            </span>
            <span className="text-4xl font-bold md:text-5xl text-red">
              Events
            </span>
          </div>
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="text-lg text-gray-400">Loading events...</span>
            </div>
          ) : (
            <div className="flex mt-[30px] md:mx-[170px] overflow-hidden mx-[30px] relative">
              <div className="absolute w-[8px] bg-red rounded-lg h-[4500px] mt-[15px] ml-[8px] hidden md:block"></div>
              <div className="w-full">
                <PastEvents events={pastEvents} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
