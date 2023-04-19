/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    HOST: process.env.HOST,
    FAUNADB_SECRET: process.env.FAUNADB_SECRET
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    };

    return config;
  },
}
