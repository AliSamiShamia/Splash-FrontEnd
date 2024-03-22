/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseURL: process.env.BASE_URL,
    socketIO:process.env.SOCKET_IO_URL
  },
};

export default nextConfig;
