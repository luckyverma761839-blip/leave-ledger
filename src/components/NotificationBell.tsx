"use client";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function NotificationBell() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false });

    setNotifications(data || []);
    setCount((data || []).filter((item) => !item.is_read).length);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-slate-900 p-3 rounded-xl hover:bg-slate-800"
      >
        <Bell size={20} />

        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl z-50">
          <div className="border-b border-slate-800 p-4 font-semibold">
            Notifications
          </div>

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-400">
              No notifications
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className="border-b border-slate-800 p-4 hover:bg-slate-800"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {item.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}