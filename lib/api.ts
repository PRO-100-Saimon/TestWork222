import axios, { AxiosError } from 'axios';
import { LoginCredentials, LoginResponse, ProductsResponse, APIError } from '@/types/api';

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
      message: (error.response?.data as any)?.message || error.message || 'An error occurred',
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
};

export const productsAPI = {
  getProducts: async (limit: number = 12): Promise<ProductsResponse> => {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  },

  getProductsByCategory: async (
    category: string,
    limit: number = 12
  ): Promise<ProductsResponse> => {
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
