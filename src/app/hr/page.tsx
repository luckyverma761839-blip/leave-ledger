"use client";

import { exportToCSV } from "../../utils/exportCSV";
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
  employee_email: string;
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
      .select(`
  id,
  employee_name,
  employee_email,
  leave_type,
  from_date,
  to_date,
  status
`)
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
    async function updateStatus(id: string, status: LeaveStatus) {
  console.log("Button Clicked", id, status);

  setUpdatingId(id);
  setError("");

  // baaki code...
}
    setUpdatingId(id);
    setError("");

    // 1. Update leave status
    const { error: updateError } = await supabase
      .from("leaves")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      console.log("Leave Update Error:", updateError);
      setError("The leave status could not be updated.");
      setUpdatingId(null);
      return;
    }

    // 2. Find selected leave
    const leave = leaves.find((item) => item.id === id);

    if (!leave) {
      console.log("Leave not found");
      setUpdatingId(null);
      return;
    }

    console.log("Leave Data:", leave);

    // 3. Insert notification
    const { data: notificationData, error: notificationError } =
      await supabase
        .from("notifications")
        .insert([
          {
            user_email: leave.employee_email,
            title: `Leave ${status}`,
            message: `Your ${leave.leave_type} request has been ${status}.`,
            is_read: false,
          },
        ])
        .select();

    if (notificationError) {
      console.log("Notification Error:", notificationError);
    } else {
      console.log("Notification Inserted:", notificationData);
    }

    // 4. Update UI
    setLeaves((currentLeaves) =>

      currentLeaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );

    setUpdatingId(null);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
                      <tr
                        key={leave.id}
                        className="border-b border-slate-800 transition-all hover:bg-slate-800/40"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                              {leave.employee_name?.charAt(0).toUpperCase() ?? "?"}
                            </div>

                            <div>
                              <p className="font-semibold">
                                {leave.employee_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{leave.leave_type}</td>
                        <td>{formatDate(leave.from_date)}</td>
                        <td>{formatDate(leave.to_date)}</td>
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
                        <td className="py-3">
                          {leave.status === "Pending" ? (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => void updateStatus(leave.id, "Approved")}
                                disabled={isUpdating}
                                className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isUpdating ? "Updating..." : "Approve"}
                              </button>
                              <button
                                type="button"
                                onClick={() => void updateStatus(leave.id, "Rejected")}
                                disabled={isUpdating}
                                className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isUpdating ? "Updating..." : "Reject"}
                              </button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">No Action</span>
                          )}
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
