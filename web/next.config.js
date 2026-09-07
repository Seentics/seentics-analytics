/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // esbuild uses native platform binaries — tell Next.js not to bundle it,
  // just require() it at runtime from node_modules.
  serverExternalPackages: ['esbuild'],
  // Allow large tracker payloads (replay FullSnapshot + session batches often exceed 10MB).
  // Next.js 16 renamed middleware to proxy; keeping this under `experimental` avoids
  // silently falling back to the 10 MB default during a production deployment.
  experimental: {
    proxyClientMaxBodySize: '128mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/s2/favicons/**',
      }
    ],
  },
  // CORS headers removed - API gateway handles CORS for API requests
  async rewrites() {
    return [
      {
        source: '/auth/google/callback',
        destination: '/auth/google/callback',
      },
      {
        source: '/api/v1/:path*',
        destination: `${process.env.API_GATEWAY_URL || 'http://localhost:8080'}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    // These headers are safe for both self-hosting and managed Next.js deployments.
    // TLS/HSTS belongs at the reverse proxy because localhost development must not
    // be pinned to HTTPS.
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
