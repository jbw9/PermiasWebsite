import { supabase } from "../supabaseClient";
import { UpcomingEvent } from "../types";
import { formatDatePretty } from "../utils/eventDateUtils";

export interface ArchiveResult {
  archivedCount: number;
  archivedEvents: string[];
  error?: string;
}

/**
 * Inserts an upcoming event into past_events, keeping its ticketing, RSVP,
 * cover photo and location. Returns the insert error, if any.
 */
async function insertAsPastEvent(event: UpcomingEvent, displayOrder: number) {
  const prettyDate = formatDatePretty(new Date(event.date));
  const date = event.location ? `${prettyDate}, ${event.location}` : prettyDate;
  const images = event.cover_image ? [event.cover_image] : [];

  const { error } = await supabase.from("past_events").insert({
    name: event.title,
    date,
    event_date: event.date,
    location: event.location || "",
    description: event.description || "",
    images,
    display_order: displayOrder,
    rsvp_url: event.rsvp_url || "",
    ticket_url: event.ticket_url || "",
    ticket_price: event.ticket_price || "",
    capacity: event.capacity || 0,
  });
  if (!error) return null;

  // The additive columns (event_date, location, ...) may not exist yet on a
  // database that hasn't run supabase/events-additive-upgrade.sql.
  const { error: legacyError } = await supabase.from("past_events").insert({
    name: event.title,
    date,
    images,
    display_order: displayOrder,
  });
  return legacyError;
}

/**
 * Moves every upcoming event whose date has passed into past_events.
 */
export async function autoArchivePastUpcomingEvents(): Promise<ArchiveResult> {
  try {
    const { data: passedEvents, error: fetchError } = await supabase
      .from("upcoming_events")
      .select("*")
      .lt("date", new Date().toISOString());

    if (fetchError) {
      return {
        archivedCount: 0,
        archivedEvents: [],
        error: fetchError.message,
      };
    }

    if (!passedEvents || passedEvents.length === 0) {
      return { archivedCount: 0, archivedEvents: [] };
    }

    const { data: existingPast } = await supabase
      .from("past_events")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1);

    let maxOrder = existingPast?.[0]?.display_order ?? -1;
    const archivedTitles: string[] = [];

    for (const event of passedEvents as UpcomingEvent[]) {
      maxOrder += 1;
      const insertError = await insertAsPastEvent(event, maxOrder);
      if (insertError) {
        console.error("Failed to archive event:", event.title, insertError);
        continue;
      }

      await supabase.from("upcoming_events").delete().eq("id", event.id);
      archivedTitles.push(event.title);
    }

    return {
      archivedCount: archivedTitles.length,
      archivedEvents: archivedTitles,
    };
  } catch (err: any) {
    return {
      archivedCount: 0,
      archivedEvents: [],
      error: err?.message || "Unexpected error during event auto-archive",
    };
  }
}

/**
 * Moves a single event to past_events.
 */
export async function moveSingleEventToPast(
  event: UpcomingEvent
): Promise<{ success: boolean; error?: string }> {
  try {
    const insertError = await insertAsPastEvent(event, 0);
    if (insertError) {
      return { success: false, error: insertError.message };
    }

    const { error: deleteError } = await supabase
      .from("upcoming_events")
      .delete()
      .eq("id", event.id);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}
