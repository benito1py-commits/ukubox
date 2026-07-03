import { NextResponse } from "next/server";
import { getValidAccessToken, getPaquetes, HelgaError } from "../../_lib/helga";

/**
 * Historial de paquetes del casillero, paginado contra Helga.
 * GET /cliente/api/paquetes?page=N&q=texto
 */
export async function GET(request: Request) {
  try {
    const token = await getValidAccessToken();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const q = searchParams.get("q")?.trim() || undefined;

    const data = await getPaquetes(token, { page, str_busqueda: q });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof HelgaError) {
      return NextResponse.json(error.data, { status: error.status });
    }
    // Sin sesión válida u otro error interno.
    return NextResponse.json(
      { error: "No se pudo obtener el historial de paquetes" },
      { status: 401 }
    );
  }
}
