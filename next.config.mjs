/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The project lives inside a OneDrive-synced folder; keep builds deterministic.
  poweredByHeader: false,
};

export default nextConfig;
