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
      assets: {
        Row: {
          appreciation_rate: number | null
          category: string
          created_at: string
          currency: string | null
          id: string
          liquidity: string | null
          name: string
          updated_at: string
          user_id: string
          value: number
        }
        Insert: {
          appreciation_rate?: number | null
          category: string
          created_at?: string
          currency?: string | null
          id?: string
          liquidity?: string | null
          name: string
          updated_at?: string
          user_id: string
          value: number
        }
        Update: {
          appreciation_rate?: number | null
          category?: string
          created_at?: string
          currency?: string | null
          id?: string
          liquidity?: string | null
          name?: string
          updated_at?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      budgets: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string | null
          id: string
          period: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string | null
          id?: string
          period: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string | null
          id?: string
          period?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      debt_accounts: {
        Row: {
          created_at: string
          creditor: string
          currency: string | null
          current_balance: number
          id: string
          initial_balance: number
          interest_period: string | null
          interest_rate: number | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          creditor: string
          currency?: string | null
          current_balance: number
          id?: string
          initial_balance: number
          interest_period?: string | null
          interest_rate?: number | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          creditor?: string
          currency?: string | null
          current_balance?: number
          id?: string
          initial_balance?: number
          interest_period?: string | null
          interest_rate?: number | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      makes: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          date: string
          id: string
          source: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          date: string
          id?: string
          source: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          date?: string
          id?: string
          source?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recurring_expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string | null
          id: string
          name: string
          next_billing_date: string
          period: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string | null
          id?: string
          name: string
          next_billing_date: string
          period: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string | null
          id?: string
          name?: string
          next_billing_date?: string
          period?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saves: {
        Row: {
          account: string
          amount: number
          created_at: string
          currency: string | null
          date: string
          id: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account: string
          amount: number
          created_at?: string
          currency?: string | null
          date: string
          id?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account?: string
          amount?: number
          created_at?: string
          currency?: string | null
          date?: string
          id?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      savings_accounts: {
        Row: {
          balance: number
          created_at: string
          currency: string | null
          id: string
          interest_period: string | null
          interest_rate: number | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance: number
          created_at?: string
          currency?: string | null
          id?: string
          interest_period?: string | null
          interest_rate?: number | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string | null
          id?: string
          interest_period?: string | null
          interest_rate?: number | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      spends: {
        Row: {
          category: string | null
          cost: number
          created_at: string
          currency: string | null
          date: string
          id: string
          item: string
          necessity: string | null
          store: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          cost: number
          created_at?: string
          currency?: string | null
          date: string
          id?: string
          item: string
          necessity?: string | null
          store?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          cost?: number
          created_at?: string
          currency?: string | null
          date?: string
          id?: string
          item?: string
          necessity?: string | null
          store?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          interval: string | null
          interval_count: number | null
          price_amount: number | null
          price_id: string | null
          role: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          trial_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          interval?: string | null
          interval_count?: number | null
          price_amount?: number | null
          price_id?: string | null
          role?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          interval?: string | null
          interval_count?: number | null
          price_amount?: number | null
          price_id?: string | null
          role?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
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
      [_ in never]: never
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
