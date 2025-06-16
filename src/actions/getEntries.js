"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUserEntries() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) redirect("/login");

    const { data: entries, error: entriesError } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (entriesError) {
      return { entries: [], user, error: entriesError.message };
    }

    return { entries, user };
  } catch (err) {
    console.error("Failed to fetch entries:", err);
    return { entries: [], user: null, error: "Something went wrong." };
  }
}
