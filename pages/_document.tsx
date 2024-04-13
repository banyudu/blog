import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'

const GA_TRACKING_ID = 'UA-136109877-1'

class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <meta name='application-name' content='鱼肚' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta name='apple-mobile-web-app-title' content='鱼肚' />
          <meta name='description' content='鱼肚的博客' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='apple-touch-icon' href='/fish.png' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/fish-152.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/fish-180.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='167x167'
            href='/fish-167.png'
          />

          <link
            rel='icon'
            type='image/x-icon'
            sizes='16x16'
            href='/favicon.ico'
          />
          <link rel='manifest' href='/manifest.json' />
          <link
            rel='mask-icon'
            href='/fish.svg'
            color='#5bbad5'
          />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional'
          />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
