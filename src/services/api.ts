import axios from 'axios';

const API_BASE_URL = 'https:api.gymledger.in.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to add the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authApi = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const membersApi = {
  getMembers: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/members`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },
  addMember: async (memberData: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(memberData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: any = new Error(errorData.message || 'Failed to add member');
      error.status = response.status;
      throw error;
    }
    return response.json();
  },
  editMember: async (id: number, memberData: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(memberData)
    });
    if (!response.ok) throw new Error('Failed to edit member');
    return response.json();
  },
  renewMember: async (id: number, planDays: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/members/${id}/renew`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ plan_days: planDays })
    });
    if (!response.ok) throw new Error('Failed to renew member');
    return response.json();
  },
  deleteMember: async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete member');
    return response.json();
  },
  getMemberStatus: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/members/status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch status');
    return response.json();
  },
};

export default api;
