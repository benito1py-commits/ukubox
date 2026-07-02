import { NextRequest, NextResponse } from "next/server";
import { getDepartamentos, HelgaError } from "../../../_lib/helga";

// GET /cliente/api/ubicacion/departamentos?pais=PY
export async function GET(request: NextRequest) {
  const pais = request.nextUrl.searchParams.get("pais");
  if (!pais) {
    return NextResponse.json({ error: "Falta el país" }, { status: 400 });
  }
  try {
    return NextResponse.json(await getDepartamentos(pais));
  } catch (error) {
    if (error instanceof HelgaError) {
      return NextResponse.json(error.data, { status: error.status });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
