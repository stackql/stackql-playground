/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 360,
}

const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  serverRuntimeConfig: {
    middlewareScheme: process.env.MIDDLEWARE_SCHEME,
    middlewareHost: process.env.MIDDLEWARE_HOST,
    middlewarePort: process.env.MIDDLEWARE_PORT,
  },
  experimental: { esmExternals: true },
  ...nextConfig
});