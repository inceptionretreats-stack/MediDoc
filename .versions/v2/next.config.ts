import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Image domains for doctor/clinic photos (Supabase Storage added during the storage step).
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
