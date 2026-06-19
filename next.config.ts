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
      {
        protocol: 'https',
        hostname: 'petra.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'martianwallet.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sui.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'core.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.exodus.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.keplr.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'atomicwallet.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.leapwallet.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cakewallet.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'guarda.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crypto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jup.ag',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rabby.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stargazer-wallet.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tangem.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'near.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'starkey.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nabox.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tap.global',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
