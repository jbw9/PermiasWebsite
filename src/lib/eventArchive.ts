import { supabase } from "../supabaseClient";
import { UpcomingEvent } from "../types";
import { formatDatePretty } from "../utils/eventDateUtils";

export interface ArchiveResult {
  archivedCount: number;
  archivedEvents: string[];
  error?: string;
}

/**
 * Automatically identifies all passed events in upcoming_events (where date < NOW())
 * and moves them cleanly into past_events, maintaining all ticketing, rsvp,
 * cover photos, and location data.
 */
export async function autoArchivePastUpcomingEvents(): Promise<ArchiveResult> {
  try {
    const nowIso = new Date().toISOString();

    // 1. Fetch passed upcoming events
    const { data: passedEvents, error: fetchError } = await supabase
      .from("upcoming_events")
      .select("*")
      .lt("date", nowIso);

    if (fetchError) {
      return { archivedCount: 0, archivedEvents: [], error: fetchError.message };
    }

    if (!passedEvents || passedEvents.length === 0) {
      return { archivedCount: 0, archivedEvents: [] };
    }

    // 2. Fetch existing max display_order in past_events
    const { data: existingPast } = await supabase
      .from("past_events")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1);

    let maxOrder = existingPast?.[0]?.display_order ?? -1;

    const archivedTitles: string[] = [];

    // 3. Move each passed event to past_events
    for (const event of passedEvents as UpcomingEvent[]) {
      maxOrder += 1;
      const eventDateObj = new Date(event.date);
      const formattedPretty = formatDatePretty(eventDateObj);
      const textDateWithLocation = event.location
        ? `${formattedPretty}, ${event.location}`
        : formattedPretty;

      const imagesArray: string[] = [];
      if (event.cover_image) {
        imagesArray.push(event.cover_image);
      }

      // Insert into past_events
      const { error: insertError } = await supabase.from("past_events").insert({
        name: event.title,
        date: textDateWithLocation,
        event_date: event.date,
        location: event.location || "",
        description: event.description || "",
        images: imagesArray,
        display_order: maxOrder,
        rsvp_url: event.rsvp_url || "",
        ticket_url: event.ticket_url || "",
        ticket_price: event.ticket_price || "",
        capacity: event.capacity || 0,
      });

      if (insertError) {
        // If columns like event_date don't exist yet on the legacy table, fallback to legacy schema
        const { error: fallbackError } = await supabase.from("past_events").insert({
          name: event.title,
          date: textDateWithLocation,
          images: imagesArray,
          display_order: maxOrder,
        });

        if (fallbackError) {
          console.error("Failed to archive event:", event.title, fallbackError);
          continue;
        }
      }

      // Delete from upcoming_events
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
 * Moves a single passed event by ID to past_events.
 */
export async function moveSingleEventToPast(event: UpcomingEvent): Promise<{ success: boolean; error?: string }> {
  try {
    const eventDateObj = new Date(event.date);
    const formattedPretty = formatDatePretty(eventDateObj);
    const textDateWithLocation = event.location
      ? `${formattedPretty}, ${event.location}`
      : formattedPretty;

    const imagesArray: string[] = [];
    if (event.cover_image) {
      imagesArray.push(event.cover_image);
    }

    // Insert into past_events
    const { error: insertError } = await supabase.from("past_events").insert({
      name: event.title,
      date: textDateWithLocation,
      event_date: event.date,
      location: event.location || "",
      description: event.description || "",
      images: imagesArray,
      display_order: 0,
      rsvp_url: event.rsvp_url || "",
      ticket_url: event.ticket_url || "",
      ticket_price: event.ticket_price || "",
      capacity: event.capacity || 0,
    });

    if (insertError) {
      // Fallback if additive columns not yet applied in Supabase
      const { error: fallbackError } = await supabase.from("past_events").insert({
        name: event.title,
        date: textDateWithLocation,
        images: imagesArray,
        display_order: 0,
      });
      if (fallbackError) {
        return { success: false, error: fallbackError.message };
      }
    }

    // Delete from upcoming_events
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
