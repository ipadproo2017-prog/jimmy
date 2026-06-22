/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three / drei ship ESM that benefits from transpilation in the app bundle
  transpilePackages: ["three"],
  webpack: (config) => {
    // Allow importing .glsl/.vs/.fs shader chunks as raw strings if added later
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
