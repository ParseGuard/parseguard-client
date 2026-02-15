import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { getAuthToken, removeAuthToken } from './auth/cookie';

/**
 * API client configuration
 */
const API_BASE_URL = typeof window !== 'undefined' 
  ? (import.meta.env.VITE_API_URL || 'http://localhost:8000')
  : 'http://localhost:8000';

/**
 * API error response type
 */
export type ApiErrorResponse = {
  message: string
  code?: string
}

/**
 * Create configured Axios instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios request interceptor
 * Adds auth token to every request if available
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get fresh token from cookie on every request
    const token = getAuthToken();
    
    console.log('🔄 [Interceptor] Request to:', config.url);
    console.log('🔑 [Interceptor] Token found:', token ? 'Yes (starts with ' + token.substring(0, 10) + '...)' : 'No');
    
    if (config.headers && config.headers.Authorization) {
      console.log('✅ [Interceptor] Using existing Authorization header');
      return config;
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ [Interceptor] Attached Authorization header from cookie');
    } else {
      console.warn('⚠️ [Interceptor] No token attached to request');
    }
    
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

/**
 * Response interceptor - Handle errors
 */
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
