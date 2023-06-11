/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
    },
    images: {
      domains: ['files.stripe.com'],
    }
  }
  
  module.exports = nextConfig
  