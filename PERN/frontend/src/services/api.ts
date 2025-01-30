const API_URL = 'http://localhost:5000/api';

export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  return data.token;
};

export const fetchNotes = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.json();
};

export const createNote = async (title: string, content: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  if (!response.ok) throw new Error('Failed to create note');
  return response.json();
};