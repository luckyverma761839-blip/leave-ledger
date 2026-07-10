export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Top Bar */}
      <header className="border-b border-slate-800 px-8 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
          Apply Leave
        </button>

      </header>

      <div className="max-w-7xl mx-auto p-8">

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-gray-400">Total Leaves</h2>
            <p className="text-5xl font-bold mt-4 text-blue-500">24</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-gray-400">Pending</h2>
            <p className="text-5xl font-bold mt-4 text-yellow-400">3</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-gray-400">Approved</h2>
            <p className="text-5xl font-bold mt-4 text-green-400">18</p>
          </div>

        </div>

        {/* Recent Requests */}

        <div className="mt-12 bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Leave Requests
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b border-slate-800">

                <th className="py-3">Employee</th>
                <th>Type</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b border-slate-800">

                <td className="py-4">Rahul</td>
                <td>Casual Leave</td>
                <td className="text-yellow-400">Pending</td>

              </tr>

              <tr className="border-b border-slate-800">

                <td className="py-4">Anjali</td>
                <td>Sick Leave</td>
                <td className="text-green-400">Approved</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}