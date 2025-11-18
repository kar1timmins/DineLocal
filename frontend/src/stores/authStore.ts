import { create } from 'zustand'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  registeredAsHost: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

// Dummy user data for testing
export const DUMMY_USER: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  registeredAsHost: false, // Change to true to test "Switch to Host"
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Start with no user (unregistered state)
  isAuthenticated: false,
  isLoading: false,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),
}))
