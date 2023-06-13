/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  target: "serverless",
  experimental: {
    appDir: true,
  },
}

export default nextConfig
