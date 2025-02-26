import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org' ,
        port: '',
        pathname: '/t/p/w500/**',
      },
    ],
  },
}

export default nextConfig;
