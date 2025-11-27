import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Disable optimization in dev to avoid Turbopack cache issues
    // Production will use full optimization for performance
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig
