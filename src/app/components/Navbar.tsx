export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-slate-900 border-b border-slate-700">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-500">
        LeaveLedger
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-blue-400 transition">
          Login
        </button>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
}