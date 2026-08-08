/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'site_build',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
