'use client'
import { createContext, memo, type PropsWithChildren, useContext, useState } from 'react'
import { createStore, type StoreApi, useStore } from 'zustand'
import type {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignOut,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js'
import useSupabase from '@/lib/supabase/client'

type AuthProvider = {
  user: User | null
  authorized: boolean
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<AuthTokenResponsePassword>
  signUp: (payload: SignUpWithPasswordCredentials) => Promise<AuthResponse>
  signOut: (options?: SignOut) => Promise<{ error: AuthError | null }>
}

type UserProviderProps = PropsWithChildren & {
  initial: Pick<AuthProvider, 'user'>
}

const authContext = createContext<StoreApi<AuthProvider> | undefined>(undefined)
const AuthProvider = memo(function UserProvider({ children, initial }: UserProviderProps) {
  const supabaseClient = useSupabase()
  const [store] = useState(() =>
    createStore<AuthProvider>((set) => ({
      authorized: Boolean(initial.user),
      signIn: async (credentials) => {
        const result = await supabaseClient.auth.signInWithPassword(credentials)
        set({ user: result.data.user })
        return result
      },
      signUp: async (credentials) => {
        const result = await supabaseClient.auth.signUp(credentials)
        await supabaseClient.auth.signOut()
        set({ user: null })
        return result
      },
      signOut: async () => {
        const result = await supabaseClient.auth.signOut()
        if (!result.error) set({ user: null })
        return result
      },
      ...initial,
    }))
  )
  return <authContext.Provider value={store}>{children}</authContext.Provider>
})

export default AuthProvider

export function useUserStore<T>(selector: (state: AuthProvider) => T) {
  const context = useContext(authContext)
  if (!context) throw new Error(`userContext.Provider is missing!`)
  return useStore(context, selector)
}