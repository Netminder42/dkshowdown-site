/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  // Force dynamic rendering for API routes
  outputFileTracingRoot: undefined,
};

module.exports = nextConfig;
