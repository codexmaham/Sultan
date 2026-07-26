import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The division placeholders ship as inline SVGs so the project builds and
    // demonstrates layout before real photography is dropped in. Swapping in
    // JPG/WEBP files later requires no config change; you can drop this flag.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
