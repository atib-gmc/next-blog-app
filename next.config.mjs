/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [{
      hostname: "images.unsplash.com",
      protocol: "https",
    }]
  },
};

export default nextConfig;
