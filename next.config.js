/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true', // Enable only when ANALYZE is true
});

const nextConfig = {
    reactStrictMode: false, // Recommended to catch potential issues in development
    // Other Next.js configurations can go here
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                punycode: false,
            };
        }
        return config;
    },
};

module.exports = withBundleAnalyzer(nextConfig);
