/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gamespot.com",
        port: "",
        pathname: "/a/uploads/**",
      },
    ],
  },
};
export default nextConfig;
