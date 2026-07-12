"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [rejectedLeaves, setRejectedLeaves] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // User ka role nikalo
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", user.email)
      .single();

    let query = supabase.from("leaves").select("*");

    // Agar employee hai to sirf apni leaves
    if (profile?.role !== "hr") {
      query = query.eq("employee_email", user.email);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
      return;
    }

    setTotalLeaves(data.length);

    setPendingLeaves(
      data.filter((leave) => leave.status === "Pending").length
    );

    setApprovedLeaves(
      data.filter((leave) => leave.status === "Approved").length
    );

    setRejectedLeaves(
      data.filter((leave) => leave.status === "Rejected").length
    );
  }

  return (
    <ProtectedRoute>
      <main className="flex bg-slate-950 text-white">

        <Sidebar />

        <section className="flex-1 p-10">

          <Topbar />

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-gray-400">
                Total Leaves
              </h2>

              <p className="text-5xl font-bold text-blue-500 mt-3">
                {totalLeaves}
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-gray-400">
                Pending
              </h2>

              <p className="text-5xl font-bold text-yellow-400 mt-3">
                {pendingLeaves}
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-gray-400">
                Approved
              </h2>

              <p className="text-5xl font-bold text-green-400 mt-3">
                {approvedLeaves}
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl">
              <h2 className="text-gray-400">
                Rejected
              </h2>

              <p className="text-5xl font-bold text-red-500 mt-3">
                {rejectedLeaves}
              </p>
            </div>

          </div>

        </section>

      </main>
    </ProtectedRoute>
  );
}