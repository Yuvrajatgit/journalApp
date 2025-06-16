export default function JournalEntryLoading() {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      <div className="h-10 w-2/3 bg-gray-200 rounded mb-6" />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 w-full h-64 bg-gray-200 rounded-lg" />
        <div className="md:w-2/3 w-full space-y-3">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-4/5" />
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-4">
        <div className="h-10 w-20 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
}