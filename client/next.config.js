/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost:4000'],
    remotePatterns: [{
      hostname: 'localhost',
      pathname: '**',
      protocol: 'http',
      port: '4000'
    }]
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  experimental: {
    serverActions: true
  },
}

module.exports = nextConfig
