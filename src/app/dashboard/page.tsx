import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
export default function Dashboard() {
  return (
    <main className="flex bg-slate-950 text-white">

      <Sidebar />

      <section className="flex-1 p-10">
<Topbar />
        
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-gray-400">
              Total Leaves
            </h2>

            <p className="text-5xl font-bold text-blue-500 mt-3">
              24
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-gray-400">
              Pending
            </h2>

            <p className="text-5xl font-bold text-yellow-400 mt-3">
              3
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-gray-400">
              Approved
            </h2>

            <p className="text-5xl font-bold text-green-400 mt-3">
              18
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}