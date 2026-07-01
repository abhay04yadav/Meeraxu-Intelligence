import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginTitle = "Admin Portal";
  const loginSubtitle = "Sign in with your admin or super-admin credentials.";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminName", data.admin.name);
        localStorage.setItem("adminRole", data.admin.role);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Error logging in. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full blur-[100px] opacity-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-purple-500 -top-[200px] -left-[200px] animate-[float_15s_ease-in-out_infinite]"></div>
        <div className="absolute rounded-full blur-[100px] opacity-20 w-[400px] h-[400px] bg-gradient-to-br from-emerald-500 to-emerald-700 -bottom-[150px] -right-[150px] animate-[float_20s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute rounded-full blur-[100px] opacity-20 w-[350px] h-[350px] bg-gradient-to-br from-amber-500 to-amber-600 top-1/2 right-[10%] animate-[float_18s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[620px] p-4 sm:p-5 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-[20px] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_0_1px_rgba(255,255,255,0.5)] p-8 sm:px-10 py-8 border border-white/80 animate-[slideIn_0.6s_ease-out] w-full">
          <div className="mb-[18px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-extrabold text-white shadow-[0_8px_24px_rgba(59,130,246,0.3)]">
                M
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight m-0">
                  MEERAXU
                </h1>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-[1px] mt-0.5">
                  {loginTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-[18px]">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
              Welcome Back
            </h2>
            <p className="text-[13px] text-slate-500 mb-3.5 font-medium">
              {loginSubtitle}
            </p>

            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-xl mb-5 text-sm font-semibold border-l-4 border-red-600 animate-[slideIn_0.3s_ease-out]">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mb-6">
              <div className="mb-[18px]">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-[0.8px]"
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-lg pointer-events-none text-slate-500">
                    ✉️
                  </span>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@meeraxu.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-[11px] pr-4 pl-11 border-2 border-slate-200 rounded-xl text-[13px] font-medium transition-all duration-300 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-300"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-[18px]">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-800 mb-2 uppercase tracking-[0.8px]"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-lg pointer-events-none text-slate-500">
                    🔐
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-[11px] pr-[40px] pl-11 border-2 border-slate-200 rounded-xl text-[13px] font-medium transition-all duration-300 bg-white text-slate-900 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] placeholder:text-slate-300"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 bg-transparent border-none cursor-pointer text-lg p-1.5 flex items-center justify-center transition-all duration-200 text-slate-500 hover:text-blue-500 hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="mb-4" />

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 tracking-[0.5px] shadow-[0_8px_20px_rgba(59,130,246,0.3)] uppercase mb-4 hover:not-disabled:-translate-y-[2px] hover:not-disabled:shadow-[0_12px_28px_rgba(59,130,246,0.4)] hover:not-disabled:from-blue-600 hover:not-disabled:to-blue-700 active:not-disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center pt-3 border-t border-slate-200">
            <p className="text-slate-400 text-[11px] m-0 font-medium">
              © 2026 MEERAXU. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login;
