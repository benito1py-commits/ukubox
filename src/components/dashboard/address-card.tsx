import { mockUser } from "@/lib/mock-data";

export function AddressCard() {
  const addr = mockUser.direccionUS;
  if (!addr) return null;
  return (
    <div className="border border-border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Mi Dirección</h3>
      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm text-muted-foreground">Nombre completo</p>
          <p className="font-medium">{addr.nombre}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Address Line 1</p>
          <p className="font-medium">{addr.address1}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Address Line 2</p>
          <p className="font-medium">{addr.address2}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">City</p>
          <p className="font-medium">{addr.city}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">State</p>
          <p className="font-medium">{addr.state}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Zipcode</p>
          <p className="font-medium">{addr.zipcode}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Teléfono</p>
          <p className="font-medium">{addr.telefono}</p>
        </div>
      </div>
    </div>
  );
}
