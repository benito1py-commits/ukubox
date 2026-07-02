import { NextRequest, NextResponse } from "next/server";
import { getCiudades, HelgaError } from "../../../_lib/helga";

// GET /cliente/api/ubicacion/ciudades?departamento=524
export async function GET(request: NextRequest) {
  const departamento = request.nextUrl.searchParams.get("departamento");
  if (!departamento) {
    return NextResponse.json({ error: "Falta el departamento" }, { status: 400 });
  }
  try {
    return NextResponse.json(await getCiudades(departamento));
  } catch (error) {
    if (error instanceof HelgaError) {
      return NextResponse.json(error.data, { status: error.status });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
