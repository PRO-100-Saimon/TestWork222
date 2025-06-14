import axios, { AxiosError } from 'axios';
import { LoginCredentials, LoginResponse, RegisterCredentials, ProductsResponse, APIError } from '@/types/api';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: APIError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<void> => {
    // Since DummyJSON doesn't have a real register endpoint, we'll simulate it
    // In a real app, this would be a POST to /auth/register
    const response = await api.post('/users/add', {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },
};

export const productsAPI = {
  getProducts: async (limit: number = 12): Promise<ProductsResponse> => {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  },

  getProductsByCategory: async (category: string, limit: number = 12): Promise<ProductsResponse> => {
    const response = await api.get(`/products/category/${category}?limit=${limit}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  searchProducts: async (query: string, limit: number = 12): Promise<ProductsResponse> => {
    const response = await api.get(`/products/search?q=${query}&limit=${limit}`);
    return response.data;
  },
};

export default api;