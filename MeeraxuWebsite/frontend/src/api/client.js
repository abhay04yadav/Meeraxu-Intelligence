// API configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Services API
export const servicesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/services/${id}`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  getOne: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },
};

// Contact Forms API
export const contactFormsAPI = {
  submit: async (data) => {
    const response = await fetch(`${API_URL}/contact-forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
  },
};
