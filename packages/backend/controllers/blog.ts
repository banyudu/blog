import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'

export const getBlogs: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const blogs = await Blog.scan().exec()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: blogs
    })
  }
})
