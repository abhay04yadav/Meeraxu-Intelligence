const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getAuthToken = () => localStorage.getItem("adminToken") || "";

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    return data;
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch profile");
    return response.json();
  },
};

export const servicesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/services`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch services");
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch service");
    return response.json();
  },

  create: async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.shortCode) formData.append("shortCode", data.shortCode);
    if (data.iconUrl) formData.append("iconUrl", data.iconUrl);
    if (data.iconFile) formData.append("icon", data.iconFile);

    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create service");
    }
    return response.json();
  },

  update: async (id, data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.shortCode) formData.append("shortCode", data.shortCode);
    if (data.iconUrl) formData.append("iconUrl", data.iconUrl);
    if (data.iconFile) formData.append("icon", data.iconFile);

    const response = await fetch(`${API_URL}/services/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update service");
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete service");
    }
    return response.json();
  },
};

export const projectsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch project");
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create project");
    }
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update project");
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete project");
    }
    return response.json();
  },
};

export const contactFormsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/contact-forms`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch contact forms");
    }
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/contact-forms/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch contact form");
    return response.json();
  },

  update: async (id, status) => {
    const response = await fetch(`${API_URL}/contact-forms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update contact form");
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/contact-forms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete contact form");
    }
    return response.json();
  },
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminName");
  localStorage.removeItem("adminRole");
};
