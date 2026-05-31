export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      productos: {
        Row: {
          activo: boolean;
          categoria: string | null;
          created_at: string;
          creado_por: string | null;
          descripcion: string | null;
          id: string;
          imagen_url: string | null;
          nombre: string;
          precio: number | null;
          updated_at: string;
        };
        Insert: {
          activo?: boolean;
          categoria?: string | null;
          created_at?: string;
          creado_por?: string | null;
          descripcion?: string | null;
          id?: string;
          imagen_url?: string | null;
          nombre: string;
          precio?: number | null;
          updated_at?: string;
        };
        Update: {
          activo?: boolean;
          categoria?: string | null;
          created_at?: string;
          creado_por?: string | null;
          descripcion?: string | null;
          id?: string;
          imagen_url?: string | null;
          nombre?: string;
          precio?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          nombre: string | null;
          role: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          nombre?: string | null;
          role?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          nombre?: string | null;
          role?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      es_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Tipos de conveniencia para usar en la app
export type Producto = Database["public"]["Tables"]["productos"]["Row"];
export type ProductoInsert = Database["public"]["Tables"]["productos"]["Insert"];
export type ProductoUpdate = Database["public"]["Tables"]["productos"]["Update"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
