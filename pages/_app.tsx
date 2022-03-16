import React from 'react'
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import getConfig from 'next/config'
import Router from 'next/router'
import { SWRConfig } from 'swr'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'tailwindcss/tailwind.css'
import './global.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig()
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename?.replace(distDir, 'app:///_next')
          return frame
        }
      })
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN
  })
}

function localStorageProvider() {
  if (typeof window === 'undefined') {
    return new Map()
  }
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}

export default function App ({ Component, pageProps, err }) {
  // Workaround for https://github.com/vercel/next.js/issues/8592
  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <Component {...pageProps} err={err} />
    </SWRConfig>
  )
}
