import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { EntryActions } from "./EntryActions";

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { title: "Unauthorized" };

  const { data: entry } = await supabase
    .from("entries")
    .select("title, content, image_url")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!entry) {
    return { title: "Journal Not Found" };
  }

  const plainText = entry.content.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title: `${entry.title} – Journex`,
    description: plainText,
    openGraph: {
      title: entry.title,
      description: plainText,
      images: entry.image_url ? [entry.image_url] : [],
    },
  };
}

export default async function JournalEntryPage({ params }) {
  const supabase = await createClient();
  const { id } = await params;
  if (!id) return notFound();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return notFound();

  const { data: entry, error: entryError } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (entryError || !entry) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
        {entry.title}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {entry.image_url && (
          <div className="md:w-1/3 w-full h-64 md:h-auto">
            <img
              src={entry.image_url}
              alt="Entry Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div
          className={`prose max-w-none text-gray-700 ${
            entry.image_url ? "md:w-2/3" : "w-full"
          }`}
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </div>

      <EntryActions id={entry.id} />

      <p className="text-right text-sm text-gray-500 mt-2">
        Created on {format(new Date(entry.created_at), "dd MMM yyyy")}
      </p>
    </div>
  );
}
