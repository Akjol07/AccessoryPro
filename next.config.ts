import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  },
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokemon.465275.xyz",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
