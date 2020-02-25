import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import * as fs from 'fs'
import * as path from 'path'

const demoMarkdown = `
# Backend

这是博客系统的后端，它由Serverless框架搭建，使用AWS平台进行部署。

## 这是个二级标题

## 测试代码

\`\`\`javascript
var a = 1 + 2
\`\`\`
`

export const getPosts: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: {
        posts: [
          {
            id: '9cac989b-d145-4da5-8d3a-22cced623133',
            extract: '这是一篇关于Serverless的文章，讲述了如何使用Serverless搭建一个博客系统的过程',
            category: 'Serverless',
            tags: ['Serverless'],
            createdAt: '2020-02-29T00:00:00Z',
            updatedAt: '2020-02-29T00:00:00Z',
          },
          {
            id: 'a03ab935-4d25-469c-b9a9-869a292e8e94',
            extract: '什么是Redis缓存穿透？有什么危害，我们又应该怎么解决它？',
            category: 'Redis',
            tags: ['Redis'],
            createdAt: '2020-02-28T03:00:00Z',
            updatedAt: '2020-02-29T10:00:00Z',
          }
        ],
        page: 1,
        pageSize: 15,
        pageCount: 2
      }
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
        extract: '这是一篇关于Serverless的文章，讲述了如何使用Serverless搭建一个博客系统的过程',
        content: demoMarkdown,
        category: 'Serverless',
        tags: ['Serverless'],
        createdAt: '2020-02-29T00:00:00Z',
        updatedAt: '2020-02-29T00:00:00Z',
      }
    })
  }
})

export const syncPost: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: 'success'
    })
  }
})
