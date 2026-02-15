import { apiClient } from '../axios';
import type { DashboardStats, ActivityItem } from '../../types/api';

/**
 * Dashboard API client
 */
export const dashboardApi = {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  /**
   * Get recent activity
   */
  async getActivity(limit = 10): Promise<ActivityItem[]> {
    const response = await apiClient.get<ActivityItem[]>('/dashboard/activity', {
      params: { limit },
    });
    return response.data;
  },
};
