import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  registeredAsHost: boolean
  phone?: string
  role?: 'user' | 'host' | 'staff'
  bio?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token?: string

  // Actions
  login: (user: User, token?: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (user: Partial<User>) => void
}

// Dummy user data for testing
export const DUMMY_USER: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  registeredAsHost: false, // Change to true to test "Switch to Host"
  role: 'user',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, // Start with no user (unregistered state)
      isAuthenticated: false,
      isLoading: false,
      token: undefined,

      login: (user, token) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          token,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          token: undefined,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)
