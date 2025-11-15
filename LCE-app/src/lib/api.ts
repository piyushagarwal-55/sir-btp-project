// API utility functions for making authenticated requests
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

// Helper to create headers with auth token
export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper for authenticated GET requests
export const authenticatedFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  return fetch(url, config);
};

// Helper for authenticated POST requests
export const authenticatedPost = async (endpoint: string, data: any, options: RequestInit = {}) => {
  return authenticatedFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  });
};

// Helper for authenticated PUT requests
export const authenticatedPut = async (endpoint: string, data: any, options: RequestInit = {}) => {
  return authenticatedFetch(endpoint, {
    method: "PUT", 
    body: JSON.stringify(data),
    ...options,
  });
};

// Helper for authenticated DELETE requests
export const authenticatedDelete = async (endpoint: string, options: RequestInit = {}) => {
  return authenticatedFetch(endpoint, {
    method: "DELETE",
    ...options,
  });
};