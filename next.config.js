/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/PaperLastCheck' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/PaperLastCheck/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/PaperLastCheck' : '',
  },
}

module.exports = nextConfig
