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
      categorias: {
        Row: {
          created_at: string;
          id: string;
          nombre: string;
          orden: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          nombre: string;
          orden?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          nombre?: string;
          orden?: number;
        };
        Relationships: [];
      };
      configuracion: {
        Row: {
          alias: string | null;
          banco: string | null;
          documento: string | null;
          en_construccion: boolean;
          id: boolean;
          instrucciones: string | null;
          numero_cuenta: string | null;
          titular: string | null;
          updated_at: string;
        };
        Insert: {
          alias?: string | null;
          banco?: string | null;
          documento?: string | null;
          en_construccion?: boolean;
          id?: boolean;
          instrucciones?: string | null;
          numero_cuenta?: string | null;
          titular?: string | null;
          updated_at?: string;
        };
        Update: {
          alias?: string | null;
          banco?: string | null;
          documento?: string | null;
          en_construccion?: boolean;
          id?: boolean;
          instrucciones?: string | null;
          numero_cuenta?: string | null;
          titular?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      pedidos: {
        Row: {
          cantidad: number;
          comentario: string | null;
          comprobante_path: string | null;
          created_at: string;
          direccion_entrega: string | null;
          estado: string;
          id: string;
          notas_admin: string | null;
          precio_cotizado: number | null;
          precio_unitario: number | null;
          producto_id: string | null;
          producto_nombre: string;
          telefono: string | null;
          updated_at: string;
          usuario_id: string;
        };
        Insert: {
          cantidad?: number;
          comentario?: string | null;
          comprobante_path?: string | null;
          created_at?: string;
          direccion_entrega?: string | null;
          estado?: string;
          id?: string;
          notas_admin?: string | null;
          precio_cotizado?: number | null;
          precio_unitario?: number | null;
          producto_id?: string | null;
          producto_nombre: string;
          telefono?: string | null;
          updated_at?: string;
          usuario_id: string;
        };
        Update: {
          cantidad?: number;
          comentario?: string | null;
          comprobante_path?: string | null;
          created_at?: string;
          direccion_entrega?: string | null;
          estado?: string;
          id?: string;
          notas_admin?: string | null;
          precio_cotizado?: number | null;
          precio_unitario?: number | null;
          producto_id?: string | null;
          producto_nombre?: string;
          telefono?: string | null;
          updated_at?: string;
          usuario_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pedidos_producto_id_fkey";
            columns: ["producto_id"];
            referencedRelation: "productos";
            referencedColumns: ["id"];
          },
        ];
      };
      productos: {
        Row: {
          activo: boolean;
          bajo_pedido: boolean;
          categoria: string | null;
          categoria_id: string | null;
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
          bajo_pedido?: boolean;
          categoria?: string | null;
          categoria_id?: string | null;
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
          bajo_pedido?: boolean;
          categoria?: string | null;
          categoria_id?: string | null;
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
      crear_pedido: {
        Args: {
          p_producto_id: string;
          p_cantidad: number;
          p_comentario: string;
          p_direccion: string;
          p_telefono: string;
        };
        Returns: string;
      };
      sitio_en_construccion: {
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
export type Pedido = Database["public"]["Tables"]["pedidos"]["Row"];
export type PedidoInsert = Database["public"]["Tables"]["pedidos"]["Insert"];
export type PedidoUpdate = Database["public"]["Tables"]["pedidos"]["Update"];
export type Configuracion = Database["public"]["Tables"]["configuracion"]["Row"];
export type Categoria = Database["public"]["Tables"]["categorias"]["Row"];

export type EstadoPedido =
  | "pendiente"
  | "cotizado"
  | "pago_informado"
  | "pagado"
  | "completado"
  | "rechazado";

export const ESTADOS_PEDIDO: { valor: EstadoPedido; label: string }[] = [
  { valor: "pendiente", label: "Pendiente" },
  { valor: "cotizado", label: "Cotizado" },
  { valor: "pago_informado", label: "Pago informado" },
  { valor: "pagado", label: "Pagado" },
  { valor: "completado", label: "Completado" },
  { valor: "rechazado", label: "Rechazado" },
];
