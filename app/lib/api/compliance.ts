import { apiClient } from '../axios';
import type { ComplianceItem, CreateComplianceDto, UpdateComplianceDto } from '../../types/api';

/**
 * Compliance API client
 */
export const complianceApi = {
  /**
   * List all compliance items
   */
  async list(): Promise<ComplianceItem[]> {
    const response = await apiClient.get<ComplianceItem[]>('/compliance');
    return response.data;
  },

  /**
   * Get single compliance item
   */
  async get(id: string): Promise<ComplianceItem> {
    const response = await apiClient.get<ComplianceItem>(`/compliance/${id}`);
    return response.data;
  },

  /**
   * Create compliance item
   */
  async create(data: CreateComplianceDto): Promise<ComplianceItem> {
    const response = await apiClient.post<ComplianceItem>('/compliance', data);
    return response.data;
  },

  /**
   * Update compliance item
   */
  async update(id: string, data: UpdateComplianceDto): Promise<ComplianceItem> {
    const response = await apiClient.put<ComplianceItem>(`/compliance/${id}`, data);
    return response.data;
  },

  /**
   * Delete compliance item
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/compliance/${id}`);
  },
};
