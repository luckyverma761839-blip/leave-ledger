import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between mb-10">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          Welcome back, Lucky 👋
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

        <button className="bg-slate-900 p-3 rounded-xl hover:bg-slate-800">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl">

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            L
          </div>

          <div>

            <h3 className="font-semibold">
              Lucky
            </h3>

            <p className="text-sm text-gray-400">
              Employee
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}