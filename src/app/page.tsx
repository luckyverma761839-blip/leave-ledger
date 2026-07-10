import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            LeaveLedger
          </h1>

          <p className="text-gray-400 text-lg">
            Employee Leave Management System
          </p>

          <button className="mt-8 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </main>
    </>
  );
}