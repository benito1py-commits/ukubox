import { NextResponse } from "next/server";
import { clearSession } from "../../_lib/helga";

export async function POST() {
  await clearSession();
  return NextResponse.json({ ok: true });
}
