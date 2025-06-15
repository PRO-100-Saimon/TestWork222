import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, APIError } from '@/types/api';
import { authAPI } from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authAPI.login(credentials);

          // Store token in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
          }

          set({
            user: response,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const apiError = error as APIError;
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: apiError.message,
          });
          throw error;
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
