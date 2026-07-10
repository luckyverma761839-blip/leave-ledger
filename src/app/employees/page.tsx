import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function EmployeesPage() {
  return (
    <main className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-10">
        <Topbar />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Employees</h2>

            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl">
              + Add Employee
            </button>
          </div>

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="py-4">Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Leaves</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-slate-800">
                <td className="py-4">Rahul Sharma</td>
                <td>rahul@example.com</td>
                <td>Development</td>
                <td>12</td>
                <td className="text-green-400">Active</td>
              </tr>

              <tr className="border-b border-slate-800">
                <td className="py-4">Anjali Verma</td>
                <td>anjali@example.com</td>
                <td>HR</td>
                <td>8</td>
                <td className="text-green-400">Active</td>
              </tr>

              <tr>
                <td className="py-4">Rohit Singh</td>
                <td>rohit@example.com</td>
                <td>Marketing</td>
                <td>5</td>
                <td className="text-yellow-400">On Leave</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>
    </main>
  );
}