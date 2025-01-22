/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.seeklogo.com', 'source.unsplash.com'],
  },
  assetPrefix: 'http://localhost:3000', // 정적 파일 경로
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/admin/:path*",
        destination: `/admin/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.localhost:3000',
          },
        ],
        destination: 'http://admin.localhost:3000/:path*', // admin.localhost로 리디렉션
        permanent: false,
      }
    ];
  },
  basePath: '',
};

export default nextConfig;
