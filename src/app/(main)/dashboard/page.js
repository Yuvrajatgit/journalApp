import Link from "next/link";
import { getUserEntries } from "@/actions/getEntries";
import { Card, CardContent } from "@/components/ui/card";
import ClientToast from "@/components/ClientToast";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const metadata = {
  title: "Dashboard – Journex",
  description: "View and manage your journal entries.",
};

export default async function DashboardPage() {
  const { entries = [], error } = await getUserEntries();

  if (error) {
    return (
      <>
        <ClientToast
          message="Something went wrong while loading your entries. Please try again later."
          type="error"
        />
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
            Dashboard
          </h1>
          <p className="text-gray-600 font-medium mb-6 ml-3">
            Unable to load entries at the moment.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
        {entries.length === 0 ? "Your journals appear here..." : "Your Entries"}
      </h1>

      <p className="text-gray-600 font-medium mb-6 ml-3">
        {entries.length === 0
          ? "Click on the write new button to get started !"
          : `Showing ${entries.length} of ${entries.length} ${
              entries.length === 1 ? "entry" : "entries"
            }`}
      </p>

      <div className="flex flex-col gap-6">
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id} className="block">
            <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow w-full">
              <CardContent className="flex h-48 p-4 gap-4">
                {entry.image_url && (
                  <div className="w-1/3 h-full">
                    <img
                      src={entry.image_url}
                      alt="Journal"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                )}
                <div
                  className={`flex flex-col justify-between ${
                    entry.image_url ? "w-2/3" : "w-full"
                  }`}
                >
                  <div>
                    <h2 className="text-3xl font-semibold text-gray-800 truncate">
                      {entry.title}
                    </h2>
                    <div
                      className="text-gray-600 text-sm line-clamp-5 mt-1 prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: entry.content }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Badge className="text-xs bg-gray-100 text-gray-700">
                      {format(new Date(entry.created_at), "dd MMM yyyy")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
