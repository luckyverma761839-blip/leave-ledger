export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-blue-500">Leave</span>Ledger
        </h1>

        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <a href="#" className="hover:text-blue-400 transition">
            Features
          </a>

          <a href="#" className="hover:text-blue-400 transition">
            Pricing
          </a>

          <a href="#" className="hover:text-blue-400 transition">
            Contact
          </a>

        </div>

        <div className="flex items-center gap-4">

          <button className="text-gray-300 hover:text-white transition">
            Login
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition">
            Sign Up
          </button>

        </div>

      </nav>
    </header>
  );
}