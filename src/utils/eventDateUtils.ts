import { PastEvent } from "../types";

/**
 * Parses an event date string or structured timestamp into a valid Date object,
 * extracting any venue or location that was embedded in legacy text strings.
 */
export function parseEventDate(
  rawDate: string,
  structuredDate?: string
): {
  date: Date | null;
  formattedDate: string;
  extractedVenue: string;
} {
  // 1. If a structured ISO date is available, prioritize it
  if (structuredDate) {
    const d = new Date(structuredDate);
    if (!isNaN(d.getTime())) {
      return {
        date: d,
        formattedDate: formatDatePretty(d),
        extractedVenue: "",
      };
    }
  }

  if (!rawDate || typeof rawDate !== "string") {
    return { date: null, formattedDate: "", extractedVenue: "" };
  }

  // 2. Check if rawDate is an ISO string or standard parseable string
  const directDate = new Date(rawDate);
  if (!isNaN(directDate.getTime()) && rawDate.includes("-")) {
    return {
      date: directDate,
      formattedDate: formatDatePretty(directDate),
      extractedVenue: "",
    };
  }

  // 3. Handle legacy strings formatted like "August 31 2024, Scotts Park" or "March 23 2024"
  const commaIndex = rawDate.indexOf(",");
  let datePart = rawDate.trim();
  let extractedVenue = "";

  if (commaIndex !== -1) {
    datePart = rawDate.slice(0, commaIndex).trim();
    extractedVenue = rawDate.slice(commaIndex + 1).trim();
  }

  // Normalize month day year formats (e.g. "August 31 2024" -> parse)
  const parsed = new Date(datePart);
  if (!isNaN(parsed.getTime())) {
    return {
      date: parsed,
      formattedDate: formatDatePretty(parsed),
      extractedVenue,
    };
  }

  // Fallback regex attempt: e.g. "August 31 2024" anywhere in the string
  const dateRegex = /([A-Za-z]+)\s+([0-9]{1,2})\s+([0-9]{4})/;
  const match = rawDate.match(dateRegex);
  if (match) {
    const matchedDate = new Date(`${match[1]} ${match[2]}, ${match[3]}`);
    if (!isNaN(matchedDate.getTime())) {
      // Everything after the date might be the venue
      const afterDate = rawDate.replace(match[0], "").replace(/^[,\s-]+/, "").trim();
      return {
        date: matchedDate,
        formattedDate: formatDatePretty(matchedDate),
        extractedVenue: afterDate || extractedVenue,
      };
    }
  }

  // Unparseable string fallback
  return {
    date: null,
    formattedDate: rawDate,
    extractedVenue,
  };
}

/**
 * Returns a human-friendly date string (e.g. "Saturday, August 31, 2024")
 */
export function formatDatePretty(date: Date, includeTime = false): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return date.toLocaleDateString("en-US", options);
}

/**
 * Sorts past events chronologically (newest first by default) with zero NaN errors.
 */
export function sortPastEventsChronologically(
  events: PastEvent[],
  descending = true
): PastEvent[] {
  return [...events].sort((a, b) => {
    const timeA = parseEventTimestamp(a);
    const timeB = parseEventTimestamp(b);

    if (timeA === 0 && timeB === 0) {
      // Fallback to display_order if timestamps are unavailable
      return (a.display_order || 0) - (b.display_order || 0);
    }
    return descending ? timeB - timeA : timeA - timeB;
  });
}

function parseEventTimestamp(event: PastEvent): number {
  if (event.event_date) {
    const t = new Date(event.event_date).getTime();
    if (!isNaN(t)) return t;
  }
  const parsed = parseEventDate(event.date);
  if (parsed.date) {
    return parsed.date.getTime();
  }
  if (event.created_at) {
    const t = new Date(event.created_at).getTime();
    if (!isNaN(t)) return t;
  }
  return 0;
}

/**
 * Generates an "Add to Google Calendar" URL.
 */
export function getGoogleCalendarUrl(event: {
  title: string;
  date: string | Date;
  location?: string;
  description?: string;
}): string {
  const startDate = typeof event.date === "string" ? new Date(event.date) : event.date;
  if (!startDate || isNaN(startDate.getTime())) return "#";

  // Assume 2 hour default duration if no end time
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatCalTime = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatCalTime(startDate)}/${formatCalTime(endDate)}`,
    details: event.description || "",
    location: event.location || "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates an iCalendar (.ics) download data URI.
 */
export function getIcsDataUrl(event: {
  title: string;
  date: string | Date;
  location?: string;
  description?: string;
}): string {
  const startDate = typeof event.date === "string" ? new Date(event.date) : event.date;
  if (!startDate || isNaN(startDate.getTime())) return "#";

  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatIcsTime = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PERMIAS UIUC//Event Calendar//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@permiasuiuc.com`,
    `DTSTAMP:${formatIcsTime(new Date())}`,
    `DTSTART:${formatIcsTime(startDate)}`,
    `DTEND:${formatIcsTime(endDate)}`,
    `SUMMARY:${event.title.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
    `LOCATION:${(event.location || "").replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
