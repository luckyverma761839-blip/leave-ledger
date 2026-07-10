import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function SettingsPage() {
  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Topbar />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Settings
          </h2>

          <div className="space-y-6">

            <div>
              <label className="block mb-2 text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Lucky Verma"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                Email
              </label>

              <input
                type="email"
                defaultValue="luckyverma761839@gmail.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
              Save Changes
            </button>

          </div>

        </div>

      </section>
    </main>
  );
}