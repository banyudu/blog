import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'

export const getPosts: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const posts = await Blog.scan().attributes(['filename', 'category', 'id', 'url', 'title', 'tags', 'createdAt', 'updatedAt']).exec()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: posts
    })
  }
})

export const getPost: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const id = event.pathParameters.id
  const post = await Blog.queryOne({ url: id }).exec()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: post
    })
  }
})
