import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // beforeFiles runs before filesystem routes, so this overrides the
      // existing app/page.tsx and serves the /another-one page at the root.
      beforeFiles: [{ source: "/", destination: "/another-one" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
