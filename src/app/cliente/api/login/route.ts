import { NextResponse } from "next/server";
import { getToken, setSession, HelgaError } from "../../_lib/helga";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    console.log(
      `[cliente/login] → consultando API Helga: POST ${process.env.HELGA_BASE_URL}/oauth/token (username=${username})`
    );
    const tokens = await getToken(username, password);
    console.log(
      `[cliente/login] ← Helga OK: token recibido (expira en ${tokens.expires_in}s)`
    );
    await setSession(tokens);

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof HelgaError) {
      console.log(
        `[cliente/login] ← Helga rechazó (HTTP ${error.status}):`,
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
