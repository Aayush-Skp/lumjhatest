import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Policy Vault was renamed to Lumjha Vault; keep old links working.
  async redirects() {
    return [{ source: "/policy-vault", destination: "/lumjha-vault", permanent: true }];
  },
};

export default nextConfig;
