/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.gravatar.com", "*.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
