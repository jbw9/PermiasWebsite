import React, { useState, useEffect } from "react";
import PastEvents from "../components/events/pastEvents";
import UpcomingEventCard from "../components/events/UpcomingEventCard";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { supabase } from "../supabaseClient";
import { PastEvent, UpcomingEvent } from "../types";
import { pastEvents as defaultPastEvents } from "../data/past_events";
import { upcomingEventsData as defaultUpcomingEvents } from "../data/upcoming_events";
import { sortPastEventsChronologically } from "../utils/eventDateUtils";
import { getImageSrc } from "../utils/imageSrc";

const eventKey = (name: string) => name.toLowerCase().trim();

const withImageUrls = (event: PastEvent): PastEvent => ({
  ...event,
  images: (event.images || []).map(getImageSrc),
});

// The bundled past events always show; a database event with the same name
// only replaces a bundled one that has no photos.
function mergePastEvents(dbEvents: PastEvent[]): PastEvent[] {
  const byName = new Map<string, PastEvent>();
  defaultPastEvents.forEach((e) =>
    byName.set(eventKey(e.name), withImageUrls(e))
  );

  dbEvents.forEach((e) => {
    const key = eventKey(e.name);
    const existing = byName.get(key);
    if (!existing) {
      byName.set(key, withImageUrls(e));
    } else if (
      existing.images.length === 0 &&
      e.images &&
      e.images.length > 0
    ) {
      byName.set(key, withImageUrls({ ...existing, ...e }));
    }
  });

  return sortPastEventsChronologically(Array.from(byName.values()), true);
}

// Database events come first; bundled events fill in any titles it lacks.
function mergeUpcomingEvents(dbEvents: UpcomingEvent[]): UpcomingEvent[] {
  if (dbEvents.length === 0) return defaultUpcomingEvents;
  const titles = new Set(dbEvents.map((e) => eventKey(e.title)));
  return [
    ...dbEvents,
    ...defaultUpcomingEvents.filter((e) => !titles.has(eventKey(e.title))),
  ];
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
      setPastEvents(mergePastEvents(pastResult.data || []));
      setUpcomingEvents(mergeUpcomingEvents(upcomingResult.data || []));
      setLoading(false);
    });
  }, []);

  return (
    <div className="mb-[100px] overflow-hidden">
      <PageBanner src={getImageSrc("/events/welcoming_event_2024/one.png")} />
      <div className="text-center mt-[50px]">
        {upcomingEvents.length > 0 && (
          <div className="mb-[80px]">
            <SectionHeading lead="Upcoming" emphasis="Events" />
            <div className="mt-[40px] flex flex-col items-center gap-6 px-[30px] md:px-[170px]">
              {upcomingEvents.map((event) => (
                <UpcomingEventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-[130px]">
          <SectionHeading lead="Past" emphasis="Events" />
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
