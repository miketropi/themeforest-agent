/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'previews.customer.envatousercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
