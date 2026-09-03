export type UserRole = 'admin' | 'employee'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: UserRole
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginResult {
  success: boolean
  error?: string
}

export interface RegisterResult {
  success: boolean
  error?: string
  needsEmailConfirmation?: boolean
}