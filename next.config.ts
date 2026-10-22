import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // 90 is used for architectural renders, drawings and the hero; 75 is the default for everything else.
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
