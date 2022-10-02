/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  experimental: { esmExternals: true },
  ...nextConfig
});

