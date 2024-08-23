import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Adjust based on your backend server URL
});

export const fetchTemplates = () => api.get('/templates');
export const createTemplate = (data) => api.post('/templates', data);
export const updateTemplate = (id, data) => api.put(`/templates/${id}`, data);
export const deleteTemplate = (id) => api.delete(`/templates/${id}`);

export const sendEmail = (data) => api.post('/email/send', data);

export default api;
