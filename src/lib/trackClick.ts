import { supabase } from "../supabaseClient";

export async function trackLinkClick(linkName: string): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from("link_clicks")
      .select("count")
      .eq("link_name", linkName)
      .single();

    if (existing) {
      await supabase
        .from("link_clicks")
        .update({ count: existing.count + 1, updated_at: new Date().toISOString() })
        .eq("link_name", linkName);
    } else {
      await supabase
        .from("link_clicks")
        .insert({ link_name: linkName, count: 1 });
    }
  } catch {
    // Non-critical — never break navigation on analytics failure
  }
}
