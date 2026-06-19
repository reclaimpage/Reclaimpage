import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'phantom.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trustwallet.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bin.bnbstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.okx.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'solflare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ledger.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'trezor.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.bitgetimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
