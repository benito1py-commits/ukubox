import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dvvomybmfaulqdxoymbz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Imágenes placeholder para los productos de ejemplo (supabase/seed.sql).
        // Las imágenes reales se suben desde el admin al bucket de Supabase.
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
