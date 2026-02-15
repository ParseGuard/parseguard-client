import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
    }
  )
);
