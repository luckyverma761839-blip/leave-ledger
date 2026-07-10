export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center">

        <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          🚀 Smart Leave Management
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Manage Employee
          <span className="text-blue-500"> Leaves </span>
          Smarter
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          LeaveLedger helps companies manage employee leave requests,
          approvals and leave history with a modern dashboard.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition">
            Get Started
          </button>

          <button className="border border-slate-600 hover:border-blue-500 px-8 py-4 rounded-xl transition">
            Live Demo
          </button>
        </div>

      </div>
    </section>
  );
}