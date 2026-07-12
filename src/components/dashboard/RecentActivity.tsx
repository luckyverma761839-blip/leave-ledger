"use client";

interface Activity {
  id: number;
  leave_type: string;
  status: string;
  from_date: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-400">
          No leave requests found.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-slate-800 pb-3"
            >
              <div>
                <h3 className="font-semibold">
                  {item.leave_type}
                </h3>

                <p className="text-sm text-gray-400">
                  {item.from_date}
                </p>
              </div>

              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full
                ${
                  item.status === "Approved"
                    ? "bg-green-600/20 text-green-400"
                    : item.status === "Pending"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}