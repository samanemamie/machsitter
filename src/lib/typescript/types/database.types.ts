
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          created_at: string
          file_id: string
          file_name: string
          format: string
          id: number
          key: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          file_id?: string
          file_name: string
          format: string
          id?: number
          key: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          file_id?: string
          file_name?: string
          format?: string
          id?: number
          key?: string
          user_id?: string | null
        }
        Relationships: []
      }
      integrations: {
        Row: {
          company_id: string | null
          connected: string | null
          created_at: string
          id: string
          name: string | null
          platform: Database["public"]["Enums"]["platforms"]
          token: Json | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          connected?: string | null
          created_at?: string
          id?: string
          name?: string | null
          platform: Database["public"]["Enums"]["platforms"]
          token?: Json | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          connected?: string | null
          created_at?: string
          id?: string
          name?: string | null
          platform?: Database["public"]["Enums"]["platforms"]
          token?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_type: Database["public"]["Enums"]["business_type"] | null
          company_name: string | null
          country: string | null
          created_at: string
          employees_count: number | null
          full_name: string | null
          id: number
          income: number | null
          profile_image_url: string | null
          province: string | null
          role: Database["public"]["Enums"]["role"] | null
          user_id: string
        }
        Insert: {
          business_type?: Database["public"]["Enums"]["business_type"] | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          employees_count?: number | null
          full_name?: string | null
          id?: number
          income?: number | null
          profile_image_url?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          user_id: string
        }
        Update: {
          business_type?: Database["public"]["Enums"]["business_type"] | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          employees_count?: number | null
          full_name?: string | null
          id?: number
          income?: number | null
          profile_image_url?: string | null
          province?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      business_type:
        | "SERVICE_COMPANY"
        | "ONLINE_CLOTHING_STORE"
        | "RESTAURANT_MANAGEMENT"
      platforms: "quickbooks"
      role: "ADMIN" | "OWNER" | "ACCOUNTANT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
      | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
      | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
      | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
      | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
      | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
