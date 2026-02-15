import { apiClient, setToken, clearToken } from '../axios';
import { useAuthStore } from '../store/authStore';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData,
  User,
  ComplianceItem,
  DashboardStats,
  ActivityItem,
} from '~/types/api';

/**
 * Singleton API Service
 * Centralizes all API calls with authentication handling
 */
class ApiService {
  private static instance: ApiService;

  /**
   * Private constructor for singleton pattern
   */
  private constructor() {}

  /**
   * Get singleton instance
   * 
   * @returns ApiService instance
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // ============ AUTHENTICATION ============

  /**
   * Login user
   * 
   * @param credentials - Login credentials
   * @returns Auth response with token and user
   * @throws Error if login fails
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token and update auth state
      setToken(token);
      useAuthStore.getState().setAuth(user, token);
      
      return response.data;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  /**
   * Register new user
   * 
   * @param data - Registration data
   * @returns Auth response with token and user
   * @throws Error if registration fails
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      const { token, user } = response.data;
      
      // Store token and update auth state
      setToken(token);
      useAuthStore.getState().setAuth(user, token);
      
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Email may already be in use.');
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    clearToken();
    useAuthStore.getState().clearAuth();
  }

  /**
   * Refresh authentication token
   * 
   * @returns New auth response
   */
  async refresh(): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/refresh');
      const { token, user } = response.data;
      
      setToken(token);
      useAuthStore.getState().setAuth(user, token);
      
      return response.data;
    } catch (error) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }
  }

  // ============ DASHBOARD ============

  /**
   * Get dashboard statistics
   * 
   * @returns Dashboard stats
   * @throws Error if request fails
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get<DashboardStats>('/dashboard/stats');
      return response.data;
    } catch (error) {
      throw new Error('Failed to load dashboard statistics.');
    }
  }

  /**
   * Get recent activity
   * 
   * @param limit - Number of items to fetch
   * @returns Array of activity items
   * @throws Error if request fails
   */
  async getActivity(limit = 10): Promise<ActivityItem[]> {
    try {
      const response = await apiClient.get<ActivityItem[]>('/dashboard/activity', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to load activity.');
    }
  }

  // ============ COMPLIANCE ============

  /**
   * Get all compliance items
   * 
   * @returns Array of compliance items
   * @throws Error if request fails
   */
  async getComplianceItems(): Promise<ComplianceItem[]> {
    try {
      const response = await apiClient.get<ComplianceItem[]>('/compliance');
      return response.data;
    } catch (error) {
      throw new Error('Failed to load compliance items.');
    }
  }

  /**
   * Get single compliance item
   * 
   * @param id - Compliance item ID
   * @returns Compliance item
   * @throws Error if request fails
   */
  async getComplianceItem(id: string): Promise<ComplianceItem> {
    try {
      const response = await apiClient.get<ComplianceItem>(`/compliance/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load compliance item.');
    }
  }

  /**
   * Create compliance item
   * 
   * @param data - Compliance item data
   * @returns Created compliance item
   * @throws Error if creation fails
   */
  async createComplianceItem(data: Partial<ComplianceItem>): Promise<ComplianceItem> {
    try {
      const response = await apiClient.post<ComplianceItem>('/compliance', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create compliance item.');
    }
  }

  /**
   * Update compliance item
   * 
   * @param id - Compliance item ID
   * @param data - Updated data
   * @returns Updated compliance item
   * @throws Error if update fails
   */
  async updateComplianceItem(id: string, data: Partial<ComplianceItem>): Promise<ComplianceItem> {
    try {
      const response = await apiClient.put<ComplianceItem>(`/compliance/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update compliance item.');
    }
  }

  /**
   * Delete compliance item
   * 
   * @param id - Compliance item ID
   * @throws Error if deletion fails
   */
  async deleteComplianceItem(id: string): Promise<void> {
    try {
      await apiClient.delete(`/compliance/${id}`);
    } catch (error) {
      throw new Error('Failed to delete compliance item.');
    }
  }
}

/**
 * Singleton API service instance
 * Use this throughout the application
 * 
 * @example
 * const stats = await apiService.getDashboardStats();
 */
export const apiService = ApiService.getInstance();
