import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 px-6">

      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto text-center">

        <span className="inline-block bg-blue-600/20 text-blue-400 border border-blue-500/30 px-5 py-2 rounded-full text-sm font-semibold mb-8">
          🚀 Smart Leave Management Platform
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Manage Employee
          <br />
          <span className="text-blue-500">Leaves Smarter</span>
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-8">
          A modern leave management platform for organizations to
          manage leave requests, approvals, employee records and leave
          history from one beautiful dashboard.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">

          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-lg shadow-blue-600/30">
            Get Started
            <ArrowRight size={20} />
          </button>

          <button className="flex items-center justify-center gap-2 border border-slate-600 hover:border-blue-500 hover:bg-slate-900 px-8 py-4 rounded-xl transition duration-300">
            <PlayCircle size={20} />
            Live Demo
          </button>

        </div>

        {/* Stats */}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-blue-500">500+</h2>
            <p className="mt-2 text-gray-400">Companies</p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-blue-500">25K+</h2>
            <p className="mt-2 text-gray-400">Employees</p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-blue-500">99.9%</h2>
            <p className="mt-2 text-gray-400">Uptime</p>
          </div>

        </div>

      </div>

    </section>
  );
}