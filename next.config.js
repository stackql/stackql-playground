/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 360,
}

const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  serverRuntimeConfig: {
    middlewareScheme: process.env.MIDDLEWARE_SCHEME || "http",
    middlewareHost: process.env.MIDDLEWARE_HOST || "localhost",
    middlewarePort: process.env.MIDDLEWARE_PORT || "8080",
  },
  experimental: { esmExternals: true },
  ...nextConfig
});

//export MIDDLEWARE_SCHEME=http