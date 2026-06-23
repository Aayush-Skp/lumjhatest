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
  async redirects() {
    return [
      // The page is served only at the root; hitting /another-one directly
      // bounces back to / so the content lives on a single canonical URL.
      { source: "/another-one", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
