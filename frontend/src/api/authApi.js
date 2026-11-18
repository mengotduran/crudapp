import { request } from './client';

export const authApi = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  register: (details) => request('/auth/register', { method: 'POST', body: details }),
  me: () => request('/auth/me'),
};
