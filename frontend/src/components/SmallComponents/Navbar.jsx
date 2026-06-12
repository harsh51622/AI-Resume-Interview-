import { User, LogOut } from "lucide-react";

export default function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    localStorage.clear();

    window.location.replace("/login");
  };

  return (
    <nav className="relative bg-black border-b border-gray-800 text-white overflow-hidden">

      {/* Side Glow Effects */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-600/30 blur-3xl rounded-full"></div>
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400 tracking-wide">
          AI Interviewer
        </h1>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">

          <a
            href="/profile"
            className="flex items-center gap-2 bg-gray-900/70 hover:bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 transition"
          >
            <User size={18} />
            Profile
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}