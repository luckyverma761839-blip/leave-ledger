"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { supabase } from "../../lib/supabase";

export default function HRPanel() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    checkRole();
  }, []);

  async function checkRole() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", session.user.email)
      .single();

    if (data?.role !== "hr") {
      alert("Access Denied!");
      router.push("/dashboard");
      return;
    }

    setLoading(false);
    fetchLeaves();
  }

  async function fetchLeaves() {
    const { data } = await supabase
      .from("leaves")
      .select("*")
      .order("created_at", { ascending: false });

    setLeaves(data || []);
  }

  async function updateStatus(id: string, status: string) {
    await supabase
      .from("leaves")
      .update({ status })
      .eq("id", id);

    fetchLeaves();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Checking Permission...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="flex bg-slate-950 text-white min-h-screen">
        <Sidebar />

        <section className="flex-1 p-10">
          <Topbar />

          <div className="bg-slate-900 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-8">
              HR Leave Approval
            </h1>

            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 text-left">Employee</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-slate-800">
                    <td className="py-4">{leave.employee_name}</td>
                    <td>{leave.leave_type}</td>
                    <td>{leave.from_date}</td>
                    <td>{leave.to_date}</td>
                    <td>{leave.status}</td>

                    <td className="flex gap-2 py-3">
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "Approved")
                        }
                        className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(leave.id, "Rejected")
                        }
                        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}