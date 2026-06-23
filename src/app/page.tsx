import { Metadata } from "next";
import { redirect } from "next/navigation";

import { sitioEnConstruccion } from "@/lib/construccion";

export const metadata: Metadata = {
  title: "UKUXBOX - Sitio en Construcción",
  description: "Estamos trabajando para brindarte la mejor experiencia. Próximamente.",
};

export const dynamic = "force-dynamic";

export default async function EnConstruccionPage() {
  // Si el sitio ya está habilitado, la raíz lleva al sitio real.
  if (!(await sitioEnConstruccion())) {
    redirect("/sitio");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-blue-900 text-white px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            <span className="text-accent">UKU</span>XBOX
          </h1>
          <div className="flex justify-center gap-1.5 mb-8">
            <span className="w-3 h-3 rounded-sm bg-accent"></span>
            <span className="w-3 h-3 rounded-sm bg-white/40"></span>
          </div>
        </div>

        <div className="mb-8">
          <svg className="w-20 h-20 mx-auto mb-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Sitio en Construcción
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Estamos trabajando para brindarte la mejor experiencia. Muy pronto estaremos listos.
          </p>
        </div>

      </div>
    </div>
  );
}
