import { type Database } from '@/lib/typescript/types/database.types'
import { type SupabaseClient } from '@supabase/supabase-js'

export type TypedSupabaseClient = SupabaseClient<Database>


