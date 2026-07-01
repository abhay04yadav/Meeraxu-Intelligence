import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = localStorage.getItem("adminName") || "Admin";
  const role = localStorage.getItem("adminRole")?.replace("-", " ") || "Portal";

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminRole");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto border-r border-slate-800 transition-all duration-300 z-50">
      <div className="p-6 border-b border-slate-800">
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
  );
};

export default Sidebar;
