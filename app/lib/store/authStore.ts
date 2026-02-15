import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '~/types/api';

/**
 * Authentication state type
 */
type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

/**
 * Authentication actions type
 */
type AuthActions = {
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  setLoading: (isLoading: boolean) => void
}

/**
 * Authentication store type
 */
type AuthStore = AuthState & AuthActions

/**
 * Global authentication store using Zustand
 * Persisted to localStorage for session management
 * 
 * @example
 * const { user, setAuth } = useAuthStore();
 * setAuth(userData, 'jwt-token');
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      /**
       * Set authenticated user and token
       * 
       * @param user - User data
       * @param token - JWT token
       */
      setAuth: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      /**
       * Clear authentication state (logout)
       */
      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      /**
       * Set loading state
       * 
       * @param isLoading - Loading state
       */
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
    name: 'auth-storage',
    storage: createJSONStorage(() => ({
      getItem: (name: string) => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(name);
      },
      setItem: (name: string, value: string) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(name, value);
          // Also store token separately for axios interceptor
          const state = JSON.parse(value);
          if (state?.state?.token) {
            localStorage.setItem('auth_token', state.state.token);
          }
        }
      },
      removeItem: (name: string) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(name);
          localStorage.removeItem('auth_token');
        }
      },
    })),
  }
)
);
