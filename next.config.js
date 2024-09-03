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
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }],
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.fallback = { fs: false };

    return config;
  },
};
