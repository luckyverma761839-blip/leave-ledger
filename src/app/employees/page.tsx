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
  status: string;
};

export default function EmployeesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    const { data, error } = await supabase
      .from("leaves")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setLeaves(data || []);
    }
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("leaves")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert(`Leave ${status}`);
    fetchLeaves();
  }

  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Topbar />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Employee Leave Requests
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="py-4">Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
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

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
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

                  <td className="space-x-2">

                    <button
                      onClick={() =>
                        updateStatus(leave.id, "Approved")
                      }
                      className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(leave.id, "Rejected")
                      }
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
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
  );
}