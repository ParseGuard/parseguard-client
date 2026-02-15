import { useAuthStore } from '../store/authStore';
import { apiService } from '../services/ApiService';
import type { LoginCredentials, RegisterData } from '~/types/api';

/**
 * Authentication hook
 * Provides auth state and actions
 * 
 * @returns Auth state and methods
 * @example
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const { user, token, isAuthenticated, isLoading, setLoading, clearAuth } = useAuthStore();

  /**
   * Login user
   * 
   * @param credentials - Login credentials
   * @throws Error if login fails
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true);
      await apiService.login(credentials);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  /**
   * Register new user
   * 
   * @param data - Registration data
   * @throws Error if registration fails
   */
  const register = async (data: RegisterData): Promise<void> => {
    try {
      setLoading(true);
      await apiService.register(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    await apiService.logout();
    clearAuth();
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
}
