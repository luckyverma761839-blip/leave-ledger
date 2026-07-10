export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">

      <h2 className="text-4xl font-bold text-center mb-14">
        Why Choose LeaveLedger?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
          <div className="text-5xl mb-4">📅</div>

          <h3 className="text-2xl font-bold mb-4">
            Fast Leave Requests
          </h3>

          <p className="text-gray-400">
            Employees can request leave in seconds with a clean and simple interface.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
          <div className="text-5xl mb-4">👨‍💼</div>

          <h3 className="text-2xl font-bold mb-4">
            Admin Dashboard
          </h3>

          <p className="text-gray-400">
            HR can approve or reject leave requests instantly.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
          <div className="text-5xl mb-4">📊</div>

          <h3 className="text-2xl font-bold mb-4">
            Live Leave Status
          </h3>

          <p className="text-gray-400">
            Track approved, pending and rejected leaves in real time.
          </p>
        </div>

      </div>

    </section>
  );
}