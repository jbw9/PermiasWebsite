import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { UpcomingEvent } from "../../types";
import { upcomingEventsData } from "../../data/upcoming_events";

const NextEventBanner: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<UpcomingEvent | null>(null);

  useEffect(() => {
    supabase
      .from("upcoming_events")
      .select("*")
      .gte("date", new Date().toISOString())
      .order("date", { ascending: true })
      .limit(1)
      .single()
      .then(
        ({ data }) => {
          if (data) {
            setNextEvent(data);
          } else {
            setNextEvent(upcomingEventsData[0] || null);
          }
        },
        () => {
          setNextEvent(upcomingEventsData[0] || null);
        }
      );
  }, []);

  if (!nextEvent) return null;

  const eventDate = new Date(nextEvent.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mt-[100px] text-center w-full">
      <div>
        <span className="text-4xl font-semibold md:text-5xl text-footer">
          Upcoming{" "}
        </span>
        <span className="text-4xl font-bold md:text-5xl text-red">Event</span>
      </div>
      <div className="mt-[30px] flex justify-center">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 text-left border border-gray-100">
          {nextEvent.cover_image && (
            <img
              src={
                nextEvent.cover_image.startsWith("http")
                  ? nextEvent.cover_image
                  : process.env.PUBLIC_URL + nextEvent.cover_image
              }
              alt={nextEvent.title}
              className="w-full h-44 object-cover rounded-xl mb-4"
            />
          )}
          <div className="text-2xl font-semibold text-footer">
            {nextEvent.title}
          </div>
          <div className="text-red mt-1 font-medium">
            {formattedDate} &middot; {formattedTime}
          </div>
          {nextEvent.location && (
            <div className="text-gray-500 mt-1">{nextEvent.location}</div>
          )}
          {nextEvent.description && (
            <div className="text-gray-700 mt-3">{nextEvent.description}</div>
          )}
          {(nextEvent.rsvp_url || nextEvent.ticket_price) && (
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              {nextEvent.ticket_price && (
                <span className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium border border-amber-200">
                  🎟️ {nextEvent.ticket_price}
                </span>
              )}
              {nextEvent.rsvp_url && (
                <a
                  href={nextEvent.rsvp_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition"
                >
                  RSVP
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-[20px] flex justify-center">
        <Link to="/events" className="inline-block mb-4">
          <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
            <span className="text-white">View All Events</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NextEventBanner;
