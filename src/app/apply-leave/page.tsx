"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { supabase } from "../../lib/supabase";

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Check login user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first!");
      return;
    }

    if (!fromDate || !toDate || !reason.trim()) {
      alert("Please complete all fields.");
      return;
    }

    if (toDate < fromDate) {
      alert("End date cannot be before the start date.");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("name")
      .eq("email", user.email)
      .single();

    if (profileError || !profile?.name) {
      alert("Your profile could not be loaded. Please try again.");
      return;
    }

    const { error } = await supabase.from("leaves").insert([
      {
        employee_name: profile.name,
        employee_email: user.email,
        leave_type: leaveType,
        from_date: fromDate,
        to_date: toDate,
        reason: reason.trim(),
        status: "Pending",
      },
    ]);
    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("✅ Leave Request Submitted!");

    setLeaveType("Casual Leave");
    setFromDate("");
    setToDate("");
    setReason("");
  }

  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Topbar />

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h2 className="text-3xl font-bold mb-8">
            Apply for Leave
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-2 text-gray-300">
                Leave Type
              </label>

              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
              >
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Paid Leave</option>
                <option>Work From Home</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 text-gray-300">
                  Start Date
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">
                  End Date
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
                />
              </div>

            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Reason
              </label>

              <textarea
                rows={5}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write your reason..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Submit Leave Request
            </button>

          </form>
        </div>
      </section>
    </main>
  );
}
