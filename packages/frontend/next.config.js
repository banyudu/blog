// next.config.js
const withImages = require('next-images')
const withFonts = require('next-fonts')
const { nanoid } = require('nanoid')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
require('dotenv').config()

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA
} = process.env

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA

process.env.SENTRY_DSN = SENTRY_DSN

const basePath = ''

module.exports = (withFonts(withImages((({
  /* config options here */
  target: 'serverless',
  env: {
    API: process.env.API,
    random: nanoid(6)
  },
  serverRuntimeConfig: {
    rootDir: __dirname
  },
  enableSvg: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        COMMIT_SHA &&
        NODE_ENV === 'production'
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            stripPrefix: ['webpack://_N_E/'],
            urlPrefix: `~${basePath}/_next`,
            release: COMMIT_SHA
          })
        )
      }
    } else {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }
    return config
  }
})))))
