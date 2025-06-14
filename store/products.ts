import { create } from 'zustand';
import { Product, APIError } from '@/types/api';
import { productsAPI } from '@/lib/api';

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchDiscountedProducts: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  clearError: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await productsAPI.getProducts(12);
      set({
        products: response.products,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as APIError;
      set({
        products: [],
        isLoading: false,
        error: apiError.message,
      });
    }
  },

  fetchProductsByCategory: async (category: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = category 
        ? await productsAPI.getProductsByCategory(category, 12)
        : await productsAPI.getProducts(12);
      
      set({
        products: response.products,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as APIError;
      set({
        products: [],
        isLoading: false,
        error: apiError.message,
      });
    }
  },

  fetchDiscountedProducts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await productsAPI.getProducts(30);
      // Фильтруем товары со скидкой больше 10%
      const discountedProducts = response.products
        .filter(product => product.discountPercentage > 10)
        .slice(0, 12);
      
      set({
        products: discountedProducts,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as APIError;
      set({
        products: [],
        isLoading: false,
        error: apiError.message,
      });
    }
  },

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await productsAPI.searchProducts(query, 12);
      set({
        products: response.products,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as APIError;
      set({
        products: [],
        isLoading: false,
        error: apiError.message,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));