"use client";

import Link from "next/link";
import { FilePlus2, History, Settings } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Apply Leave",
      description: "Request a new leave",
      href: "/apply-leave",
      icon: <FilePlus2 size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "Leave History",
      description: "View previous requests",
      href: "/leave-history",
      icon: <History size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Settings",
      description: "Manage your account",
      href: "/settings",
      icon: <Settings size={28} />,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group rounded-xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
          >
            <div
              className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
            >
              {action.icon}
            </div>

            <h3 className="text-lg font-semibold">
              {action.title}
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}