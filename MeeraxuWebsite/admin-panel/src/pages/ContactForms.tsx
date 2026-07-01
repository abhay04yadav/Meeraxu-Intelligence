import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface ContactForm {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const API_URL = "http://localhost:5000/api";

export const ContactForms: React.FC = () => {
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "new" | "read" | "replied"
  >("all");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchContactForms();
  }, [token, navigate]);

  const fetchContactForms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/contact-forms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      } else {
        setError("Failed to fetch contact forms");
      }
    } catch (err) {
      setError("Error fetching contact forms");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "new" | "read" | "replied",
  ) => {
    try {
      const response = await fetch(`${API_URL}/contact-forms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchContactForms();
        if (selectedForm?._id === id) {
          setSelectedForm(null);
        }
      } else {
        setError("Failed to update status");
      }
    } catch (err) {
      setError("Error updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        const response = await fetch(`${API_URL}/contact-forms/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          fetchContactForms();
          if (selectedForm?._id === id) {
            setSelectedForm(null);
          }
        } else {
          setError("Failed to delete form");
        }
      } catch (err) {
        setError("Error deleting form");
      }
    }
  };

  const filteredForms =
    filterStatus === "all"
      ? forms
      : forms.filter((form) => form.status === filterStatus);

  if (loading)
    return (
      <div className="p-8 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="w-6 h-6 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="font-semibold text-lg m-0">Loading submissions...</p>
        </div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50 font-sans max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0 mb-1">Contact Submissions</h1>
          <p className="text-slate-500 text-sm m-0">Manage and reply to inquiries</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center gap-3 shadow-sm">
          <span className="text-xl">⚠️</span>
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
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
            <h2 className="text-base font-bold text-slate-900 m-0">Inbox ({filteredForms.length})</h2>
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
                  <div
                    key={form._id}
                    className={`p-4 sm:p-5 cursor-pointer transition-all hover:bg-slate-50 border-l-4 ${
                      selectedForm?._id === form._id 
                        ? "bg-blue-50/50 border-l-blue-600 shadow-[inset_0_0_15px_rgba(0,0,0,0.02)]" 
                        : form.status === 'new' 
                          ? "border-l-emerald-500 bg-emerald-50/30" 
                          : "border-l-transparent"
                    }`}
                    onClick={() => setSelectedForm(form)}
                  >
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className={`text-sm m-0 truncate ${form.status === 'new' ? 'font-extrabold text-slate-900' : 'font-bold text-slate-700'}`}>
                        {form.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                        form.status === 'new' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        form.status === 'read' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {form.status}
                      </span>
                    </div>
                    <p className={`text-xs m-0 mb-2 truncate ${form.status === 'new' ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{form.subject}</p>
                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <p className="m-0 truncate max-w-[120px]">{form.email}</p>
                      <p className="m-0 whitespace-nowrap">
                        {new Date(form.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
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
                  <h2 className="text-2xl font-extrabold text-slate-900 m-0 mb-2">{selectedForm.subject}</h2>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-bold text-slate-800">{selectedForm.name}</span>
                    <span className="text-slate-300">•</span>
                    <a href={`mailto:${selectedForm.email}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium">
                      {selectedForm.email}
                    </a>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-500 whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  {new Date(selectedForm.createdAt).toLocaleString(undefined, { 
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                  })}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 sm:p-6 mb-8 text-sm leading-relaxed text-slate-700 border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] min-h-[200px] whitespace-pre-wrap">
                {selectedForm.message}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Update Status</label>
                  <div className="flex gap-2">
                    <button
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedForm.status === "new" 
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                      onClick={() => handleStatusChange(selectedForm._id, "new")}
                    >
                      New
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedForm.status === "read" 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                      onClick={() => handleStatusChange(selectedForm._id, "read")}
                    >
                      Read
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedForm.status === "replied" 
                          ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                      onClick={() => handleStatusChange(selectedForm._id, "replied")}
                    >
                      Replied
                    </button>
                  </div>
                </div>

                {role === "super-admin" && (
                  <button
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all flex items-center gap-2 mt-auto"
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
              <h3 className="text-xl font-bold text-slate-700 m-0 mb-2">Select a submission</h3>
              <p className="text-slate-500 text-sm m-0">Choose a contact form from the list to view its details</p>
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
