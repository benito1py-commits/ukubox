import { mockUser } from "@/lib/mock-data";

export function ProfileCard() {
  return (
    <div className="border border-border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Mis Datos</h3>
      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm text-muted-foreground">Código</p>
          <p className="font-medium">{mockUser.codigo}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Nombre</p>
          <p className="font-medium">{mockUser.nombre}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Teléfono</p>
          <p className="font-medium">{mockUser.telefono}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Correo Electrónico</p>
          <p className="font-medium">{mockUser.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Oficina</p>
          <p className="font-medium">{mockUser.oficina}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Dirección</p>
          <p className="font-medium">{mockUser.direccion}</p>
        </div>
      </div>
    </div>
  );
}
