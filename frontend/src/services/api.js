const API_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token || ''
    };
};

// Auth endpoints
export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
};

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
};

// Task endpoints
export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`, {
        headers: getAuthHeaders()
    });
    return response.json();
};

export const createTask = async (title) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title })
    });
    return response.json();
};

export const updateTask = async (id, completed) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ completed })
    });
    return response.json();
};

export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return response.json();
};