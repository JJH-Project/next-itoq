/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    experimental: {
        turbo: {
            resolveAlias: {
                '@vercel/turbopack-next/internal/font/google/font': 'next/font/google',
            },
        },
    },
}

module.exports = nextConfig 