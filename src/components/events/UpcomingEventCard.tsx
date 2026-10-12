import React from "react";
import { UpcomingEvent } from "../../types";
import { getImageSrc } from "../../utils/imageSrc";
import {
  getGoogleCalendarUrl,
  getIcsDataUrl,
} from "../../utils/eventDateUtils";

const UpcomingEventCard: React.FC<{ event: UpcomingEvent }> = ({ event }) => {
  const calendarEvent = {
    title: event.title,
    date: event.date,
    location: event.location,
    description: event.description,
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 text-left border border-gray-100 flex flex-col sm:flex-row gap-6 items-start">
      {event.cover_image && (
        <img
          src={getImageSrc(event.cover_image)}
          alt={event.title}
          className="w-full sm:w-44 h-44 object-cover rounded-xl border border-gray-200 flex-shrink-0"
        />
      )}
      <div className="flex-1 w-full">
        <div className="text-2xl font-semibold text-footer">{event.title}</div>
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
            href={getGoogleCalendarUrl(calendarEvent)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            + Google Calendar
          </a>
          <a
            href={getIcsDataUrl(calendarEvent)}
            download={`${event.title.toLowerCase().replace(/\s+/g, "-")}.ics`}
            className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            + iCal (.ics)
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventCard;
