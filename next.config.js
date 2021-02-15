const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  env: {
    NEXT_PUBLIC_ENV_VAR: process.env.NEXT_PUBLIC_ENV_VAR,
  },
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
