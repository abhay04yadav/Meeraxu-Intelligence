import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const name = localStorage.getItem("adminName") || "Admin";
  const role = localStorage.getItem("adminRole")?.replace("-", " ") || "Portal";

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminRole");
    navigate("/admin/login");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open admin menu"
        className="lg:hidden fixed top-4 left-4 z-40 w-11 h-11 flex items-center justify-center bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800"
      >
        <span className="text-xl">☰</span>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside
        className={`w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto border-r border-slate-800 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-xl shadow-lg">
              ⚙️
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight m-0 text-white">
                MEERAXU
              </h2>
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider m-0">
                  {name || "Admin"}
                </p>
                <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider m-0">
                  {role?.replace("-", " ") || "Portal"}
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close admin menu"
            className="lg:hidden text-slate-400 hover:text-white text-xl leading-none p-1"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 py-6">
          <ul className="list-none p-0 m-0 flex flex-col gap-2 px-4">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive("/admin/dashboard") ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/services"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive("/admin/services") ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className="text-lg">🔧</span>
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/projects"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive("/admin/projects") ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className="text-lg">📁</span>
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/contact-forms"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive("/admin/contact-forms") ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                <span className="text-lg">✉️</span>
                <span>Contact Forms</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-slate-800 flex flex-col gap-3 mt-auto">
          <button
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-red-500/10 text-slate-300 hover:text-red-500 border border-slate-700 hover:border-red-500/50 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer text-center"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
