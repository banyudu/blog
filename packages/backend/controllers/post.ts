import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'

export const getPosts: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const posts = await Blog.scan().exec()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: posts
    })
  }
})

export const getPost: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: {
        id: '9cac989b-d145-4da5-8d3a-22cced623133',
        title: '使用Serverless搭建博客',
        extract: '这是一篇关于Serverless的文章，讲述了如何使用Serverless搭建一个博客系统的过程',
        content: '',
        category: 'Serverless',
        tags: ['Serverless'],
        createdAt: '2020-02-29T00:00:00Z',
        updatedAt: '2020-02-29T00:00:00Z',
      }
    })
  }
})
