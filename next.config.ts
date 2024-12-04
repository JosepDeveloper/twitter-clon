import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: ''
      }
    ]
  }
}

export default nextConfig
