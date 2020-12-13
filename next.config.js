// const isProd = process.env.NODE_ENV === "production";

// const withPWA = require("next-pwa")

// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/
// });

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

// module.exports = withBundleAnalyzer(withMDX(withPWA({
//   pageExtensions: ["tsx", "mdx"],
//   pwa: {
//     disable: !isProd,
//     dest: "public"
//   }
// })))

const nextConfig = {
  // any configs you need
}
module.exports = withBundleAnalyzer(nextConfig);