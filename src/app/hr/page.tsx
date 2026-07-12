"use client";

import { exportToCSV } from "../../untils/exportCSV";
import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { supabase } from "../../lib/supabase";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

interface LeaveRequest {
  id: string;
  employee_name: string | null;
  leave_type: string;
  from_date: string;
  to_date: string;
  status: LeaveStatus;
}

const statusOptions: Array<"All" | LeaveStatus> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
];

export default function HRPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeaveStatus>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchLeaves = useCallback(async () => {
    const { data, error: leavesError } = await supabase
      .from("leaves")
      .select("id, employee_name, leave_type, from_date, to_date, status")
      .order("created_at", { ascending: false });

    if (leavesError) {
      setError("Leave requests could not be loaded. Please try again.");
      return;
    }

    setLeaves((data ?? []) as LeaveRequest[]);
  }, []);

  useEffect(() => {
    async function checkRole() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("email", session.user.email)
        .single();

      if (profileError || data?.role !== "hr") {
        router.replace("/dashboard");
        return;
      }

      await fetchLeaves();
      setLoading(false);
    }

    void checkRole();
  }, [fetchLeaves, router]);

  const filteredLeaves = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return leaves.filter((leave) => {
      const matchesSearch = leave.employee_name
        ?.toLowerCase()
        .includes(normalizedSearch);
      const matchesStatus =
        statusFilter === "All" || leave.status === statusFilter;

      return Boolean(matchesSearch) && matchesStatus;
    });
  }, [leaves, search, statusFilter]);

  async function updateStatus(id: string, status: LeaveStatus) {
    setUpdatingId(id);
    setError("");

    const { error: updateError } = await supabase
      .from("leaves")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      setError("The leave status could not be updated. Please try again.");
      setUpdatingId(null);
      return;
    }

    setLeaves((currentLeaves) =>
      currentLeaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave,
      ),
    );
    setUpdatingId(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-2xl text-white">
        Checking permission...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />

        <section className="flex-1 p-6 md:p-10">
          <Topbar />

          <div className="rounded-2xl bg-slate-900 p-6 md:p-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                HR Leave Approval
              </h1>

              <button
                onClick={() =>
                  exportToCSV(filteredLeaves, "leave-requests")
                }
                className="rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700"
              >
                📥 Export CSV
              </button>
            </div>
            <div className="mb-8 flex flex-col gap-4 md:flex-row">
              <label className="flex flex-1 items-center rounded-xl bg-slate-800 px-4">
                <Search size={18} className="text-gray-400" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search employee..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="ml-2 w-full bg-transparent p-3 outline-none"
                  aria-label="Search employee"
                />
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as "All" | LeaveStatus)
                }
                className="rounded-xl bg-slate-800 px-4 py-3"
                aria-label="Filter by status"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-slate-700 text-left">
                    <th className="py-4">Employee</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave) => {
                    const isUpdating = updatingId === leave.id;

                    return (
                      <tr key={leave.id} className="border-b border-slate-800">
                        <td className="py-4">{leave.employee_name ?? "—"}</td>
                        <td>{leave.leave_type}</td>
                        <td>
                          {new Date(leave.from_date).toLocaleDateString("en-IN")}
                        </td>

                        <td>
                          {new Date(leave.to_date).toLocaleDateString("en-IN")}
                        </td>
                        <td>
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${leave.status === "Approved"
                              ? "bg-green-500/20 text-green-400"
                              : leave.status === "Rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                              }`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="flex gap-2 py-3">
                          <button
                            type="button"
                            onClick={() => void updateStatus(leave.id, "Approved")}
                            disabled={isUpdating || leave.status === "Approved"}
                            className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => void updateStatus(leave.id, "Rejected")}
                            disabled={isUpdating || leave.status === "Rejected"}
                            className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredLeaves.length === 0 && (
              <p className="py-8 text-center text-slate-400">No leave requests found.</p>
            )}
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
