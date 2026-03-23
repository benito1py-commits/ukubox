import { mockUser } from "@/lib/mock-data";

export function UserInfo() {
  return (
    <div className="text-right">
      <p className="font-bold text-sm">{mockUser.nombre}</p>
      <p className="text-xs text-muted-foreground">
        NÚMERO DE CASILLERO {mockUser.codigo}
      </p>
    </div>
  );
}
