export default function DashboardLoading() {
  return (
    <div className="p-6 max-w-5xl mx-auto animate-pulse">
      <div className="h-8 w-1/3 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-6" />

      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-sm w-full h-48 rounded-lg p-4 flex gap-4"
          >
            <div className="w-1/3 h-full bg-gray-200 rounded-md" />
            <div className="w-2/3 flex flex-col justify-between py-2">
              <div className="h-6 bg-gray-200 w-3/4 rounded" />
              <div className="h-4 bg-gray-100 w-full rounded mt-2" />
              <div className="h-4 bg-gray-100 w-5/6 rounded mt-2" />
              <div className="h-4 bg-gray-100 w-4/6 rounded mt-2" />
              <div className="flex justify-end mt-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
