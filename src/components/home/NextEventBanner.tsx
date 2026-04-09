import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { UpcomingEvent } from "../../types";

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
      .then(({ data }) => {
        if (data) setNextEvent(data);
      });
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
