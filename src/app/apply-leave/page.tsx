import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function ApplyLeave() {
  return (
    <main className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <section className="flex-1 p-10">

        <Topbar />

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">

          <h2 className="text-3xl font-bold mb-8">
            Apply for Leave
          </h2>

          <form className="space-y-6">

            <div>
              <label className="block mb-2 text-gray-300">
                Leave Type
              </label>

              <select className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4">
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Paid Leave</option>
                <option>Work From Home</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 text-gray-300">
                  Start Date
                </label>

                <input
                  type="date"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">
                  End Date
                </label>

                <input
                  type="date"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
                />
              </div>

            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Reason
              </label>

              <textarea
                rows={5}
                placeholder="Write your reason..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
              ></textarea>
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Submit Leave Request
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}