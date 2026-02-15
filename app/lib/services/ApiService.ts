import { apiClient } from '../axios';
import { setAuthToken, removeAuthToken } from '../auth/cookie';
import { useAuthStore } from '../store/authStore';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData,
  User,
  ComplianceItem,
  DashboardStats,
  ActivityItem,
  DocumentAnalysis,
  RiskAssessment,
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
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials, {
        params: { return_token: true }
      });
      const { access_token, user } = response.data;
      
      const token = access_token;
      
      if (token) {
        // Store token and update auth state
        setAuthToken(token);
        useAuthStore.getState().setAuth(user, token);
      } else {
        throw new Error('Login succeeded but no token returned');
      }
      
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
      const response = await apiClient.post<AuthResponse>('/auth/register', data, {
        params: { return_token: true }
      });
      const { access_token, user } = response.data;
      
      const token = access_token;

      if (token) {
        // Store token and update auth state
        setAuthToken(token);
        useAuthStore.getState().setAuth(user, token);
      }
      
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Email may already be in use.');
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    removeAuthToken();
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
      const { access_token, user } = response.data;
      
      const token = access_token;

      if (token) {
        setAuthToken(token);
        useAuthStore.getState().setAuth(user, token);
      }
      
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
   * @param headers - Optional headers for SSR
   * @returns Dashboard stats
   * @throws Error if request fails
   */
  async getDashboardStats(headers?: Record<string, string>): Promise<DashboardStats> {
    try {
      const config = headers ? { headers } : {};
      const response = await apiClient.get<DashboardStats>('/dashboard/stats', config);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load dashboard statistics.');
    }
  }

  /**
   * Get recent activity
   * 
   * @param limit - Number of items to fetch
   * @param headers - Optional headers for SSR
   * @returns Array of activity items
   * @throws Error if request fails
   */
  async getActivity(limit = 10, headers?: Record<string, string>): Promise<ActivityItem[]> {
    try {
      const config = {
        params: { limit },
        ...(headers ? { headers } : {})
      };
      const response = await apiClient.get<ActivityItem[]>('/dashboard/activity', config);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load activity.');
    }
  }

  // ============ COMPLIANCE ============

  /**
   * Get all compliance items
   * 
   * @param headers - Optional headers for SSR
   * @returns Array of compliance items
   * @throws Error if request fails
   */
  async getComplianceItems(headers?: Record<string, string>): Promise<ComplianceItem[]> {
    try {
      const config = headers ? { headers } : {};
      const response = await apiClient.get<ComplianceItem[]>('/compliance', config);
      return response.data;
    } catch (error) {
      throw new Error('Failed to load compliance items.');
    }
  }

  /**
   * Get single compliance item
   * 
   * @param id - Compliance item ID
   * @param headers - Optional headers for SSR
   * @returns Compliance item
   * @throws Error if request fails
   */
  async getComplianceItem(id: string, headers?: Record<string, string>): Promise<ComplianceItem> {
    try {
      const config = headers ? { headers } : {};
      const response = await apiClient.get<ComplianceItem>(`/compliance/${id}`, config);
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

  // ============ AI SERVICE ============

  /**
   * Analyze document text
   * 
   * @param text - Text content to analyze
   * @returns Analysis result
   */
  async analyzeDocument(text: string): Promise<DocumentAnalysis> {
    try {
      const response = await apiClient.post<DocumentAnalysis>('/ai/analyze', { text });
      return response.data;
    } catch (error) {
      throw new Error('Failed to analyze document.');
    }
  }

  /**
   * Assess risk for compliance item
   * 
   * @param title - Item title
   * @param description - Item description
   * @returns Risk assessment
   */
  async assessRisk(title: string, description?: string): Promise<RiskAssessment> {
    try {
      const response = await apiClient.post<RiskAssessment>('/ai/assess-risk', { 
        title, 
        description 
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to assess risk.');
    }
  }

  /**
   * Create document from text content
   * 
   * @param title - Document title
   * @param content - Text content
   * @returns Created document
   */
  async createDocumentFromText(title: string, content: string): Promise<void> {
    try {
      await apiClient.post('/documents/text', { title, content });
    } catch (error) {
      throw new Error('Failed to save document.');
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
