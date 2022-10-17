/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 360,
  env:{
    MUI_KEY : process.env.MUI_KEY,
  }
}

const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  publicRuntimeConfig: {
    middlewareScheme: process.env.MIDDLEWARE_SCHEME || "http",
    middlewareHost: process.env.MIDDLEWARE_HOST || "localhost",
    middlewarePort: process.env.MIDDLEWARE_PORT || "8080",
  },
  experimental: { esmExternals: true },
  ...nextConfig
});