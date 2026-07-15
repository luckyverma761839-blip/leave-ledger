"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", user.email)
      .single();

    setProfile(data);
    setName(data?.name || "");
  }

  async function saveProfile() {
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        name,
      })
      .eq("email", user.email);

    if (error) {
      alert("❌ Profile update failed.");
    } else {
      alert("✅ Profile Updated!");

      setProfile({
        ...profile,
        name,
      });
    }

    setSaving(false);
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />

        <section className="flex-1 p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-5xl rounded-2xl bg-slate-900 p-8">

            {/* Premium Header */}

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8">

              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl"></div>

              <div className="relative flex items-center gap-6">

                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white/20 text-5xl font-bold backdrop-blur">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>

                <div>
                  <h1 className="text-4xl font-bold">
                    {name || "User"}
                  </h1>

                  <p className="mt-2 text-blue-100">
                    {profile?.email}
                  </p>

                  <span className="mt-4 inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
                    {profile?.role === "hr"
                      ? "👨‍💼 HR Manager"
                      : "👨‍💻 Employee"}
                  </span>
                </div>

              </div>

            </div>

            {/* Details */}

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-gray-400">
                  Full Name
                </p>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full rounded-xl bg-slate-700 p-3 outline-none"
                />
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-gray-400">
                  Email
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  {profile?.email}
                </h2>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-gray-400">
                  Role
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  {profile?.role}
                </h2>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-gray-400">
                  Joined
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-IN")
                    : "-"}
                </h2>
              </div>

            </div>

            {/* Stats */}

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              <div className="rounded-xl bg-slate-800 p-6">
                <p className="text-gray-400">
                  Leave Requests
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  12
                </h2>
              </div>

              <div className="rounded-xl bg-slate-800 p-6">
                <p className="text-gray-400">
                  Approved
                </p>

                <h2 className="mt-3 text-4xl font-bold text-green-400">
                  8
                </h2>
              </div>

              <div className="rounded-xl bg-slate-800 p-6">
                <p className="text-gray-400">
                  Pending
                </p>

                <h2 className="mt-3 text-4xl font-bold text-yellow-400">
                  4
                </h2>
              </div>

            </div>

            {/* Save */}

            <div className="mt-10">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="rounded-xl bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "💾 Save Changes"}
              </button>
            </div>

          </div>

        </section>
      </main>
    </ProtectedRoute>
  );
}