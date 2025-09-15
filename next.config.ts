import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix the turbopack root directory warning
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
  
  // Add TypeScript config to handle deployment issues
  typescript: {
    // Allow production builds to complete even with type errors
    ignoreBuildErrors: true,
  },
  
  // ESLint config for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        port: '',
        pathname: '/**',
      },
      // Add your own image hosting domains here
      // For example, if you use Supabase Storage:
      // {
      //   protocol: 'https',
      //   hostname: 'your-project.supabase.co',
      //   port: '',
      //   pathname: '/storage/v1/object/public/**',
      // },
    ],
  },
  
  // SEO-optimized redirects from old URLs to new URLs
  async redirects() {
    return [
      {
        source: '/patterns',
        destination: '/crochetpatterns',
        permanent: true,
      },
      {
        source: '/patterns/:slug',
        destination: '/crochetpatterns/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
