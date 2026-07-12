"use client";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import StatsCard from "../../components/dashboard/StatsCard";
import {
  FileText,
  Clock3,
  CheckCircle,
  XCircle,
} from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  interface Activity {
  id: number;
  leave_type: string;
  status: string;
  from_date: string;
}

const [activities, setActivities] = useState<Activity[]>([]);

  const [name, setName] = useState("");
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

  // Profile fetch
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, name")
    .eq("email", user.email)
    .single();

  if (profileError) {
    console.log(profileError);
    return;
  }

  setName(profile.name);

  // Leaves query
  let query = supabase
    .from("leaves")
    .select("*")
    .order("created_at", { ascending: false });

  // Employee ko sirf apni leaves dikhao
  if (profile.role !== "hr") {
    query = query.eq("employee_email", user.email);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return;
  }

  // Recent Activity
  setActivities(data.slice(0, 5));

  // Stats
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
          <WelcomeCard name={name} />
          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <StatsCard
              title="Total Leaves"
              value={totalLeaves}
              subtitle="All Requests"
              icon={<FileText className="text-blue-500" size={28} />}
              color="text-blue-500"
            />

            <StatsCard
              title="Pending"
              value={pendingLeaves}
              subtitle="Waiting for Approval"
              icon={<Clock3 className="text-yellow-400" size={28} />}
              color="text-yellow-400"
            />

            <StatsCard
              title="Approved"
              value={approvedLeaves}
              subtitle="Successfully Approved"
              icon={<CheckCircle className="text-green-500" size={28} />}
              color="text-green-500"
            />

            <StatsCard
   
              title="Rejected"
              value={rejectedLeaves}
              subtitle="Rejected Requests"
              icon={<XCircle className="text-red-500" size={28} />}
              color="text-red-500"
            />

          </div>
                   <div className="grid lg:grid-cols-2 gap-6 mt-8">

  <RecentActivity activities={activities} />

  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-center">
    <h2 className="text-xl font-semibold text-gray-400">
      📊 Leave Analytics
      <br />
      Coming Next...
    </h2>
  </div>

</div>

        </section>

      </main>
    </ProtectedRoute>
  );
}