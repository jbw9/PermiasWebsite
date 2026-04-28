import React, { useState, useEffect } from "react";
import PastEvents from "../components/events/pastEvents";
import { supabase } from "../supabaseClient";
import { PastEvent, UpcomingEvent } from "../types";

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
      if (pastResult.data) {
        const sortedPastEvents = [...pastResult.data].sort((a, b) => {
          const dateA = new Date(a.date.split(",")[0]).getTime();
          const dateB = new Date(b.date.split(",")[0]).getTime();
          if (isNaN(dateA) || isNaN(dateB)) return 0;
          return dateB - dateA;
        });

        setPastEvents(
          sortedPastEvents.map((e) => ({
            ...e,
            images: normalizeImages(e.images || []),
          }))
        );
      }
      if (upcomingResult.data) setUpcomingEvents(upcomingResult.data);
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
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 text-left border border-gray-100"
                >
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
                    <div className="text-gray-500 mt-1">{event.location}</div>
                  )}
                  {event.description && (
                    <div className="text-gray-700 mt-3">{event.description}</div>
                  )}
                </div>
              ))}
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
              <div className="">
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
