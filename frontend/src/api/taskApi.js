import { request } from './client';

export const taskApi = {
  list: ({ status, search } = {}) => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    const query = params.toString();
    return request(`/tasks${query ? `?${query}` : ''}`);
  },
  get: (id) => request(`/tasks/${id}`),
  create: (task) => request('/tasks', { method: 'POST', body: task }),
  update: (id, task) => request(`/tasks/${id}`, { method: 'PUT', body: task }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};
