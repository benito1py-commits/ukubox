import { redirigirSiEnConstruccion } from "@/lib/construccion";

export const dynamic = "force-dynamic";

/**
 * Gate del sitio público: mientras el sitio esté "en construcción", solo los
 * admins pueden ver estas páginas; el resto va a la landing de construcción.
 * Las rutas de login/cuenta quedan fuera de este grupo a propósito, para que el
 * admin siempre pueda iniciar sesión y habilitar el sitio.
 */
export default async function PublicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await redirigirSiEnConstruccion();
  return <>{children}</>;
}
