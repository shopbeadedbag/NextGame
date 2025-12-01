/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.gamemonetize.com'],
    unoptimized: true,
  },
}

module.exports = nextConfig