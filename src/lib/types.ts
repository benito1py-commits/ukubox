export interface User {
  codigo: string;
  nombre: string;
  telefono: string;
  email: string;
  oficina: string;
  direccion: string;
  direccionUS: DireccionUS;
}

export interface DireccionUS {
  nombre: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  telefono: string;
}

export type PackageStatus =
  | "En Miami"
  | "En Tránsito"
  | "En Aduana"
  | "Listo para Retiro"
  | "Entregado";

export interface Package {
  id: string;
  tracking: string;
  descripcion: string;
  tienda: string;
  peso: number;
  pesoUnit: "lbs" | "kg";
  precio: number;
  estado: PackageStatus;
  fechaIngreso: string;
  fechaEntrega?: string;
}

export interface PreAlerta {
  id: string;
  tracking: string;
  tienda: string;
  descripcion: string;
  valor: number;
  fecha: string;
}

export interface Oficina {
  id: string;
  nombre: string;
  direccion: string;
}

export interface FAQ {
  pregunta: string;
  respuesta: string;
}
