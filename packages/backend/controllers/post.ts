import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'
import * as _ from 'lodash'
import { AnyObject } from '../types'

export const getPosts: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  let posts = await Blog.scan().attributes(['filename', 'category', 'extract', 'id', 'url', 'title', 'tags', 'createdAt', 'updatedAt']).exec()
  const query: AnyObject<string> = event.queryStringParameters ?? {}
  posts = posts.filter(post => {
    if (query.category && query.category !== post.category) {
      return false
    }
    if (query.tag) {
      const tags = (post.tags || '').split(/[\s|,]+/)
      if (!tags.includes(query.tag)) {
        return false
      }
    }
    return true
  })
  posts = _.orderBy(posts, e => new Date(e.createdAt).getTime(), ['desc'])
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: posts
    }),
    headers: { 'cache-control': 'max-age=1800, public' }
  }
})

export const getPost: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const id = event.pathParameters.id
  let post
  if (id) {
    const url = decodeURIComponent(id)
    post = await Blog.queryOne({ url }).exec()
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: post
    }),
    headers: { 'cache-control': 'max-age=1800, public' }
  }
})
