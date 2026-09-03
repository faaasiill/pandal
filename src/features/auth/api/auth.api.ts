import { supabase } from '../../../lib/supabase'
import type { LoginInput, RegisterInput } from '../schemas/auth.schema'
import type { LoginResult, RegisterResult } from '../types/auth.types'

export async function signInWithPassword(input: LoginInput): Promise<LoginResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  })

  if (error) {
    return { success: false, error: mapAuthError(error.message) }
  }

  return { success: true }
}

export async function signUpWithPassword(input: RegisterInput): Promise<RegisterResult> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        // New sign-ups default to 'employee'. Admin accounts are promoted
        // manually in the Supabase dashboard or via a trusted server role.
        role: 'employee',
      },
    },
  })

  if (error) {
    return { success: false, error: mapAuthError(error.message) }
  }

  // Supabase returns a user with no session when email confirmation is required.
  const needsEmailConfirmation = data.user !== null && data.session === null

  return { success: true, needsEmailConfirmation }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}

export async function signInWithGoogle(): Promise<{ error?: string }> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  })

  // On success Supabase redirects the browser away, so this line only
  // runs when something went wrong (e.g. provider not configured).
  if (error) {
    return { error: mapAuthError(error.message) }
  }
  return {}
}

function mapAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'Incorrect email or password.'
  }
  if (message.includes('already registered') || message.includes('already exists')) {
    return 'An account with this email already exists.'
  }
  if (message.includes('Password should be')) {
    return 'Password is too weak. Use at least 8 characters.'
  }
  return 'Something went wrong. Please try again.'
}