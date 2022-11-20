import React from 'react'
import Document, { Head, Main, NextScript, Html } from 'next/document'

const GA_TRACKING_ID = 'UA-136109877-1'

class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
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
          {/* <script src='//unpkg.com/mermaid@8.4.8/dist/mermaid.min.js' /> */}
          {/* <script>mermaid.initialize({'{startOnLoad: true}'});</script> */}
        </body>
      </Html>
    )
  }
}

export default MyDocument
