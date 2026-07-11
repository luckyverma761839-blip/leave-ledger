"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { supabase } from "../../lib/supabase";

type Leave = {
  id: string;
  employee_name: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  reason: string;
  status: string;
};

export default function LeaveHistoryPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    const { data, error } = await supabase
      .from("leaves")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setLeaves(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Topbar />

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

          <h1 className="text-3xl font-bold mb-8">
            Leave History
          </h1>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : leaves.length === 0 ? (
            <p className="text-gray-400">
              No leave requests found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-slate-700 text-left">
                    <th className="py-4">Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {leaves.map((leave) => (
                    <tr
                      key={leave.id}
                      className="border-b border-slate-800"
                    >
                      <td className="py-4">
                        {leave.employee_name}
                      </td>

                      <td>{leave.leave_type}</td>

                      <td>{leave.from_date}</td>

                      <td>{leave.to_date}</td>

                      <td>{leave.reason}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            leave.status === "Approved"
                              ? "bg-green-600"
                              : leave.status === "Rejected"
                              ? "bg-red-600"
                              : "bg-yellow-500 text-black"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}