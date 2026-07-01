import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
  shortCode: string;
  createdAt?: string;
}

const API_URL = "http://localhost:5000/api";
const BASE_URL = "http://localhost:5000";

function getIconUrl(icon: string): string | null {
  if (!icon) return null;
  if (icon.startsWith("http")) return icon;
  if (icon.startsWith("/uploads")) return `${BASE_URL}${icon}`;
  return null; // it's a short code, render as text
}

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortCode: "",
    iconUrl: "",
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [iconMode, setIconMode] = useState<"file" | "url">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchServices();
  }, [token, navigate]);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setError("");
    setTimeout(() => setSuccess(""), 3500);
  };

  const showError = (msg: string) => {
    setError(msg);
    setSuccess("");
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        const errData = await response.json().catch(() => ({}));
        showError(errData.message || "Failed to fetch services");
      }
    } catch (err) {
      showError("Cannot connect to backend. Make sure the server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", shortCode: "", iconUrl: "" });
    setIconFile(null);
    setPreviewImage("");
    setEditingId(null);
    setShowForm(false);
    setIconMode("file");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      showError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const fd = new FormData();
      fd.append("name", formData.name.trim());
      fd.append("description", formData.description.trim());
      if (formData.shortCode.trim()) {
        fd.append("shortCode", formData.shortCode.trim().toUpperCase());
      }

      if (iconMode === "file" && iconFile) {
        fd.append("icon", iconFile);
      } else if (iconMode === "url" && formData.iconUrl) {
        fd.append("iconUrl", formData.iconUrl);
      }

      const url = editingId
        ? `${API_URL}/services/${editingId}`
        : `${API_URL}/services`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (response.ok) {
        await fetchServices();
        resetForm();
        showSuccess(editingId ? "Service updated successfully!" : "Service created successfully!");
      } else {
        const errData = await response.json().catch(() => ({}));
        showError(errData.message || "Failed to save service");
      }
    } catch (err) {
      showError("Network error. Please check your connection.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      shortCode: service.shortCode,
      iconUrl: service.icon.startsWith("http") ? service.icon : "",
    });
    const iconUrl = getIconUrl(service.icon);
    setPreviewImage(iconUrl || "");
    setIconMode(service.icon.startsWith("http") ? "url" : "file");
    setIconFile(null);
    setEditingId(service._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setDeleteConfirm(null);
        await fetchServices();
        showSuccess("Service deleted successfully!");
      } else {
        const errData = await response.json().catch(() => ({}));
        showError(errData.message || "Failed to delete service");
      }
    } catch (err) {
      showError("Network error. Please check your connection.");
    }
  };

  const renderServiceIcon = (service: Service, size = 40) => {
    const url = getIconUrl(service.icon);
    if (url) {
      return (
        <img
          src={url}
          alt={service.name}
          className="object-cover rounded-md"
          style={{ width: size, height: size }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      );
    }
    return (
      <div
        className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center font-bold text-white font-mono"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.3,
        }}
      >
        {service.shortCode?.substring(0, 2) || service.name?.[0]}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight m-0 mb-1">Services Management</h1>
          <p className="text-slate-500 text-sm m-0">
            {services.length} service{services.length !== 1 ? "s" : ""} published on the website
          </p>
        </div>
        {!showForm && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:-translate-y-0.5"
            onClick={() => { resetForm(); setShowForm(true); }}
          >
            + Add New Service
          </button>
        )}
      </div>

      {error && (
        <div className="mb-5 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center gap-2 shadow-sm text-sm sm:text-base">
          ⚠️ {error}
        </div>
      )}
      {success && (
        <div className="mb-5 p-3 sm:p-4 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-700 rounded-lg font-medium text-sm shadow-sm flex items-center gap-2">
          ✓ {success}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-8 mb-8 animate-[slideIn_0.3s_ease-out]">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 m-0">{editingId ? "✏️ Edit Service" : "➕ Add New Service"}</h2>
              <button type="button" onClick={resetForm} className="bg-transparent border-none cursor-pointer text-slate-400 hover:text-slate-600 text-xl px-2 py-1">✕</button>
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Service Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. AI Agents"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 focus:bg-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this service offers..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium bg-slate-50 focus:bg-white min-h-[100px] resize-y"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Service Icon</label>
              <div 
                className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors mt-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {previewImage ? (
                  <div className="flex items-center gap-3 justify-center">
                    <img src={previewImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                    <div className="text-left">
                      <div className="text-sm font-bold text-slate-900">
                        {iconFile?.name || "Current icon"}
                      </div>
                      <div className="text-xs text-slate-500">Click to change</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-2">📷</div>
                    <div className="text-sm text-slate-500 font-medium">
                      Click to upload an image (JPG, PNG, GIF, WebP — max 5MB)
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-2 font-medium">
                If no icon is provided, a placeholder will be shown.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-slate-100">
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)] disabled:opacity-70"
                disabled={saving}
              >
                {saving ? "Saving..." : editingId ? "Update Service" : "Create Service"}
              </button>
              <button 
                type="button" 
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 px-6 rounded-xl transition-all" 
                onClick={resetForm} 
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 m-0">📋 Published Services</h2>
          <button
            onClick={fetchServices}
            className="bg-transparent border-none cursor-pointer text-blue-600 text-xs sm:text-sm font-bold hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="text-3xl mb-3 animate-spin w-8 h-8 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            <p className="text-slate-500 font-medium m-0">Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="text-5xl mb-3">🔧</div>
            <p className="text-slate-700 font-bold m-0 mb-1">No services yet</p>
            <p className="text-slate-500 text-sm m-0 mb-4">
              Add your first service to display it on the website
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl transition-all shadow-sm flex items-center gap-2" 
              onClick={() => { resetForm(); setShowForm(true); }}
            >
              + Add First Service
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <th className="p-4 pl-6 font-bold">Icon</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold hidden md:table-cell">Description</th>
                  <th className="p-4 pr-6 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4 pl-6 w-[80px]">
                      {renderServiceIcon(service, 40)}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-sm text-slate-900">{service.name}</div>
                      {service.createdAt && (
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Added {new Date(service.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm text-slate-500 hidden md:table-cell max-w-[250px] lg:max-w-[350px] truncate">
                      {service.description}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition-colors border-none cursor-pointer"
                          onClick={() => handleEdit(service)}
                          title="Edit service"
                        >
                          ✏️
                        </button>
                        {role === "super-admin" && (
                          deleteConfirm === service._id ? (
                            <div className="flex items-center gap-1.5 animate-[slideIn_0.2s_ease-out]">
                              <button
                                onClick={() => handleDelete(service._id)}
                                className="bg-red-600 hover:bg-red-700 text-white border-none rounded-md px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5 text-[11px] font-bold cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 flex items-center justify-center transition-colors border-none cursor-pointer"
                              onClick={() => setDeleteConfirm(service._id)}
                              title="Delete service"
                            >
                              🗑️
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-5 p-3.5 sm:p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-600 flex items-start gap-3 shadow-sm">
        <span className="text-lg leading-none">💡</span> 
        <p className="m-0 leading-relaxed font-medium"><strong className="text-slate-800">Tip:</strong> Services added here will automatically appear on the website's home page and services page. Changes are reflected in real-time.</p>
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Services;
