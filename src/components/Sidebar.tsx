import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  History,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold mb-10">
        <span className="text-blue-500">Leave</span>Ledger
      </h1>

      <nav className="space-y-2">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/apply-leave"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <CalendarDays size={20} />
          Apply Leave
        </Link>

        <Link
        href="/apply-leave"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <History size={20} />
          Leave History
        </Link>

        <Link
          href="/apply-leave"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Users size={20} />
          Employees
        </Link>

        <Link
         href="/apply-leave"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>

      <button className="mt-16 flex items-center gap-3 text-red-400 hover:text-red-300">
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}