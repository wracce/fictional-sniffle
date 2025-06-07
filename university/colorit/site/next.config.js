const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    hostname: '0.0.0.0'
  }
};

module.exports = nextConfig;