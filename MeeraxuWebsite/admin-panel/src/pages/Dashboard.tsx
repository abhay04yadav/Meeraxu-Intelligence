import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { servicesAPI, projectsAPI, contactFormsAPI } from "../api/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    services: 0,
    projects: 0,
    leads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const [services, projects, leads] = await Promise.all([
          servicesAPI.getAll(),
          projectsAPI.getAll(),
          contactFormsAPI.getAll(),
        ]);
        setCounts({
          services: services.length,
          projects: projects.length,
          leads: leads.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      label: "Total Services",
      value: counts.services.toString(),
      icon: "🔧",
      color: "border-blue-500 bg-blue-50 text-blue-500",
      trend: "+2 this month",
      path: "/services",
    },
    {
      label: "Total Projects",
      value: counts.projects.toString(),
      icon: "📁",
      color: "border-purple-500 bg-purple-50 text-purple-500",
      trend: "+3 this month",
      path: "/projects",
    },
    {
      label: "Contact Leads",
      value: counts.leads.toString(),
      icon: "✉️",
      color: "border-pink-500 bg-pink-50 text-pink-500",
      trend: "+8 this month",
      path: "/contact-forms",
    },
  ];

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="w-6 h-6 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="font-semibold text-lg m-0">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 m-0 mb-1 tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-sm m-0">Welcome back to your admin panel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row lg:flex-col items-start gap-4 sm:gap-0 relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => navigate(stat.path)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(stat.path);
              }
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-blue-600 hidden lg:block group-hover:bg-blue-600"></div>
            
            <div className="flex flex-col sm:flex-col lg:flex-row items-start lg:justify-between mb-0 sm:mb-0 lg:mb-5 w-full">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-xl border-2 flex items-center justify-center text-2xl lg:text-4xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[11px] lg:text-xs text-emerald-600 font-bold m-0 mt-3 sm:mt-3 lg:mt-0 py-1.5 px-2.5 lg:py-2 lg:px-3.5 bg-emerald-50 rounded-lg border-l-2 lg:border-l-[3px] border-emerald-600 whitespace-nowrap">
                {stat.trend}
              </p>
            </div>
            
            <div className="flex-1 w-full">
              <p className="text-[11px] lg:text-xs text-slate-500 mb-1 lg:mb-2 uppercase tracking-wide font-bold">{stat.label}</p>
              <h3 className="text-2xl lg:text-4xl font-extrabold text-slate-900 m-0 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
