import { NextResponse } from "next/server";
import { registrar, HelgaError, type RegistroInput } from "../../_lib/helga";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistroInput;

    console.log(
      `[cliente/registro] → creando cliente en Helga (email=${body?.email})`
    );
    const data = await registrar(body);
    console.log(`[cliente/registro] ← Helga OK: cliente creado`);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    if (error instanceof HelgaError) {
      console.log(
        `[cliente/registro] ← Helga rechazó (HTTP ${error.status}):`,
        error.data
      );
      return NextResponse.json(error.data, { status: error.status });
    }
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
