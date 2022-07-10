/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  env: {
    HOST: process.env.HOST,
    FAUNADB_SECRET: process.env.FAUNADB_SECRET
  }
}

module.exports = nextConfig
