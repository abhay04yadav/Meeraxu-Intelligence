import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { contactFormsAPI } from "../api/client";

const ContactForms = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedForm, setSelectedForm] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const isSuperAdmin = localStorage.getItem("adminRole") === "super-admin";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchContactForms();
  }, [navigate]);

  const fetchContactForms = async () => {
    try {
      setLoading(true);
      const data = await contactFormsAPI.getAll();
      setForms(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch contact forms");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactFormsAPI.update(id, newStatus);
      if (selectedForm?._id === id) {
        setSelectedForm({ ...selectedForm, status: newStatus });
      }
      fetchContactForms();
    } catch (err) {
      setError(err.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;
    try {
      await contactFormsAPI.delete(id);
      if (selectedForm?._id === id) setSelectedForm(null);
      fetchContactForms();
    } catch (err) {
      setError(err.message || "Failed to delete form");
    }
  };

  const filteredForms =
    filterStatus === "all"
      ? forms
      : forms.filter((form) => form.status === filterStatus);

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-slate-50 flex items-center justify-center ml-64">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="w-6 h-6 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="font-semibold text-lg m-0">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50 font-sans max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0 mb-1">
            Contact Submissions
          </h1>
          <p className="text-slate-500 text-sm m-0">
            Manage and reply to inbound messages
          </p>
        </div>
        <button
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center gap-3 shadow-sm">
          <span className="text-xl">⚠️</span>
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Filter by Status:
        </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[150px] shadow-sm cursor-pointer"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-250px)] min-h-[500px]">
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900 m-0">
              Inbox ({filteredForms.length})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredForms.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <span className="text-4xl block mb-3 opacity-50">📭</span>
                <p className="font-medium text-sm m-0">No submissions found</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-slate-100">
                {filteredForms.map((form) => (
                  <button
                    type="button"
                    key={form._id}
                    className={`text-left p-4 sm:p-5 w-full cursor-pointer transition-all hover:bg-slate-50 border-l-4 ${
                      selectedForm?._id === form._id
                        ? "bg-blue-50/50 border-l-blue-600 shadow-[inset_0_0_15px_rgba(0,0,0,0.02)]"
                        : form.status === "new"
                          ? "border-l-emerald-500 bg-emerald-50/30"
                          : "border-l-transparent"
                    }`}
                    onClick={() => setSelectedForm(form)}
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3
                        className={`text-sm m-0 truncate ${form.status === "new" ? "font-extrabold text-slate-900" : "font-bold text-slate-700"}`}
                      >
                        {form.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                          form.status === "new"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : form.status === "read"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {form.status}
                      </span>
                    </div>
                    <p className="text-xs m-0 mb-2 truncate text-slate-500">
                      {form.subject || "No subject"}
                    </p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <p className="m-0 truncate max-w-[120px]">{form.email}</p>
                      <p className="m-0 whitespace-nowrap">
                        {new Date(form.createdAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/3 xl:w-3/4">
          {selectedForm ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 animate-[fadeIn_0.2s_ease-out]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-8 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 m-0 mb-2">
                    {selectedForm.subject || "No Subject"}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="font-bold text-slate-800">
                      {selectedForm.name}
                    </span>
                    <span className="text-slate-300">•</span>
                    <a
                      href={`mailto:${selectedForm.email}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                    >
                      {selectedForm.email}
                    </a>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-500 whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  {new Date(selectedForm.createdAt).toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 sm:p-6 mb-8 text-sm leading-relaxed text-slate-700 border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] min-h-[200px] whitespace-pre-wrap">
                {selectedForm.message}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Update Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["new", "read", "replied"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          selectedForm.status === status
                            ? status === "new"
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                              : status === "read"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                : "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                        onClick={() =>
                          handleStatusChange(selectedForm._id, status)
                        }
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {isSuperAdmin && (
                  <button
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2"
                    onClick={() => handleDelete(selectedForm._id)}
                  >
                    <span className="text-sm">🗑️</span> Delete Submission
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 opacity-20">✉️</div>
              <h3 className="text-xl font-bold text-slate-700 m-0 mb-2">
                Select a submission
              </h3>
              <p className="text-slate-500 text-sm m-0">
                Choose a contact form from the list to view its details
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ContactForms;
