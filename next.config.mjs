/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.dev', 'images.unsplash.com', 'source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
  env: {
    // Environment variables that will be available at build time
    SHOW_SUMMER_NOTICE: process.env.SHOW_SUMMER_NOTICE || 'false',
    SUMMER_CLOSURE: process.env.SUMMER_CLOSURE || 'false',
  },
  experimental: {
    // Enable if needed
    // serverActions: true,
  },
}

export default nextConfig
