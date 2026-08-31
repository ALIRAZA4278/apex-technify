/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "apextechnify.com" }],
        destination: "https://www.apextechnify.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
