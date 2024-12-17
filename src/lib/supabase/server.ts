import type { Database } from '@/lib/typescript/types/database.types'
import { getErrorMessage } from '@/lib/utils'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getSupabase = cache(async () => {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            getErrorMessage(error)
          }
        },
      },
    }
  )
})

export const getCurrentUser = cache(async () => {
  const supabase = await getSupabase()
  return await supabase.auth.getUser()
})
