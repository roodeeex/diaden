/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['html5-qrcode'],
  images: {
    domains: [
      'cdn.dribbble.com',
    ],
  },
};

export default nextConfig;
