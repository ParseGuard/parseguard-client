/**
 * Type definitions for ParseGuard API
 * All types use 'type' keyword, no interfaces
 */

/**
 * User type
 */
export type User = {
  id: string
  email: string
  name?: string
  createdAt: string
  updatedAt: string
}

/**
 * Login credentials type
 */
export type LoginCredentials = {
  email: string
  password: string
}

/**
 * Registration data type
 */
export type RegisterData = {
  email: string
  password: string
  name?: string
}

/**
 * Auth response type
 */
export type AuthResponse = {
  token: string
  user: User
}

/**
 * Compliance item type
 */
export type ComplianceItem = {
  id: string
  userId: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate?: string
  createdAt: string
  updatedAt: string
}

/**
 * Create compliance DTO
 */
export type CreateComplianceDto = {
  title: string
  description?: string
  status?: string
  priority?: string
  dueDate?: string
}

/**
 * Update compliance DTO
 */
export type UpdateComplianceDto = Partial<CreateComplianceDto>

/**
 * Document type
 */
export type Document = {
  id: string
  userId: string
  title: string
  filePath?: string
  fileSize?: number
  mimeType?: string
  aiAnalysis?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

/**
 * Dashboard stats type
 */
export type DashboardStats = {
  totalCompliance: number
  totalDocuments: number
  pendingItems: number
  highRiskItems: number
}

/**
 * Activity item type
 */
export type ActivityItem = {
  id: string
  type: string
  title: string
  description?: string
  timestamp: string
}

/**
 * API error type
 */
export type ApiError = {
  message: string
  code?: string
  status?: number
}
