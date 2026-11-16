    /** @type {import('next').NextConfig} */
    const nextConfig = {
      typescript: {
        ignoreBuildErrors: true,
      },
      reactStrictMode: false,
      allowedDevOrigins: ['192.168.1.130'],
    };

    export default nextConfig;

