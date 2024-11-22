/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['html5-qrcode'],
  images: {
    domains: [
      'cdn.dribbble.com',
      // Add other domains you're using for images
    ],
  },
};

export default nextConfig;
