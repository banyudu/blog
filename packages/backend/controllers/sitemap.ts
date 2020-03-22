import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'
import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'

export const getSiteMap: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const posts = await Blog.scan().attributes(['filename', 'category', 'extract', 'id', 'url', 'title', 'tags', 'createdAt', 'updatedAt']).exec()
  const smStream = new SitemapStream({ hostname: 'https://banyudu.com/' })
  const pipeline = smStream.pipe(createGzip())
  for (const post of posts) {
    smStream.write({ url: `/posts/${post.url}`, lastmod: post.updatedAt })
  }
  smStream.write({ url: '/', changefreq: 'daily' })
  smStream.end()
  console.log('before to string')
  const result = (await streamToPromise(pipeline)).toString('base64')
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Content-Encoding': 'gzip'
    },
    isBase64Encoded: true,
    body: result
  }
})
