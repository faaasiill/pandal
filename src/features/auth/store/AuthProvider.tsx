import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../../../lib/supabase'
import type { AuthState, AuthUser } from '../types/auth.types'

const AuthContext = createContext<AuthState | undefined>(undefined)

function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? '',
    fullName: (user.user_metadata.full_name as string | undefined) ?? '',
    role: (user.user_metadata.role as AuthUser['role'] | undefined) ?? 'employee',
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session ? toAuthUser(data.session.user) : null)
      setIsLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? toAuthUser(session.user) : null)
      setIsLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const value: AuthState = { user, isLoading, isAuthenticated: user !== null }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}