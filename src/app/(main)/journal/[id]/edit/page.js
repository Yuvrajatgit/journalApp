import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EditJournalForm from "./EditJournalForm";

export default async function EditEntryPage({ params }) {
  const supabase = await createClient();
  const { id } = await params;
  if (!id) return notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: entry } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!entry) notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <EditJournalForm entry={entry} />
    </div>
  );
}
