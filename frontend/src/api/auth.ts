/**
 * Authentication API
 *
 * Handles user registration, login, and authentication-related operations
 */

import { apiClient } from './client'

export enum UserRole {
  USER = 'user',
  HOST = 'host',
  STAFF = 'staff',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  status: UserStatus
  profileImage?: string
  bio?: string
  preferences?: Record<string, any>
  // Host-specific fields
  businessName?: string
  businessDescription?: string
  businessAddress?: string
  businessPhone?: string
  rating?: number
  totalReviews: number
  createdAt: string
  updatedAt: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role?: UserRole
  profileImage?: string
  bio?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token?: string
  message?: string
}

export const authApi = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/users', data)
  },

  /**
   * Login user (placeholder - needs auth endpoint in backend)
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    // TODO: Replace with actual auth endpoint when implemented
    // For now, this is a placeholder
    return apiClient.post<AuthResponse>('/auth/login', data)
  },

  /**
   * Get current user profile
   */
  async getProfile(userId: string): Promise<User> {
    return apiClient.get<User>(`/users/${userId}`)
  },

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: Partial<RegisterRequest>): Promise<User> {
    return apiClient.patch<User>(`/users/${userId}`, data)
  },

  /**
   * Switch user role (e.g., from USER to HOST)
   */
  async switchRole(userId: string, newRole: UserRole): Promise<User> {
    return apiClient.patch<User>(`/users/${userId}/role`, { newRole })
  },
}
