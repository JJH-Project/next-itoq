/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    turbopack: {
      resolveAlias: {
        '@vercel/turbopack-next/internal/font/google/font': 'next/font/google',
      },
    },
  }
  
  module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    ...nextConfig,
  }