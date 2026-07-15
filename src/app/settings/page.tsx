"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  async function changePassword() {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setSavingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("✅ Password Updated Successfully!");

      setNewPassword("");
      setConfirmPassword("");
    }

    setSavingPassword(false);
  }

  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Topbar />

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-8 text-3xl font-bold">
            Settings
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Lucky Verma"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300">
                Email
              </label>

              <input
                type="email"
                defaultValue="luckyverma761839@gmail.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4"
              />
            </div>

            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700">
              Save Changes
            </button>
          </div>

          {/* Change Password */}

          <div className="mt-12 border-t border-slate-800 pt-8">
            <h3 className="mb-6 text-2xl font-bold">
              🔐 Change Password
            </h3>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-4"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-4"
            />

            <button
              onClick={changePassword}
              disabled={savingPassword}
              className="rounded-xl bg-green-600 px-8 py-4 font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}