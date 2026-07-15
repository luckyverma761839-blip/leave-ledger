"use client";

import NotificationBell from "./NotificationBell";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || "");

        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", user.email)
          .single();

        setRole(data?.role ?? "");
      }
    }

    void getUser();
  }, []);

  const firstLetter = email ? email.charAt(0).toUpperCase() : "U";

  return (
    <>
      <div className="bg-background text-foreground p-4 rounded-xl mb-4">
        Theme Working
      </div>

      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="text-gray-400 mt-1">
            Welcome back 👋
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-900 rounded-xl px-4 py-3">
            <Search size={18} className="text-gray-400" />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none ml-3"
            />
          </div>

          <NotificationBell />

          <button
            onClick={toggleTheme}
            className="rounded-xl bg-slate-900 p-3 hover:bg-slate-800 transition"
          >
            {theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {firstLetter}
            </div>

            <div>
              <h3 className="font-semibold">
                {email || "Loading..."}
              </h3>

              <p className="text-sm text-gray-400">
                {role === "hr" ? "HR" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}