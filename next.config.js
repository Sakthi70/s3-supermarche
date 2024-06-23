/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "EUR" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "EUR" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }]
  }
};

module.exports = nextConfig;
