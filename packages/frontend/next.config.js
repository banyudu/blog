// next.config.js
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const nanoid = require('nanoid')
const withTM = require('next-transpile-modules')(['react-github-btn'])
require('dotenv').config()

module.exports = withTM(withFonts(withImages(withCSS(withLess({
  /* config options here */
  target: 'serverless',
  env: {
    API: process.env.API,
    random: nanoid(6)
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  enableSvg: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('ignore-styles')
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }
    return config
  }
})))))
