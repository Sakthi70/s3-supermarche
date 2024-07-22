/** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: { theme: "DEFAULT", currency: "EUR" },
//   publicRuntimeConfig: { theme: "DEFAULT", currency: "EUR" },
//   images: {
//     remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }]
//   },
//   node : {
//     fs: 'empty'
//   }
// };

module.exports = {
  webpack5: true,
  env: { theme: "DEFAULT", currency: "EUR", API_SECRET: process.env.API_SECRET,
    API_KEY :process.env.API_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "EUR" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
