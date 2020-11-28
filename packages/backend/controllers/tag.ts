import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'
import * as _ from 'lodash'

export const getTags: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const posts = await Blog.scan().attributes(['tags']).exec()
  const tagMap = posts.reduce((res: {[x: string]: number}, post) => {
    const tags = (post.tags ?? '').split('|')
    tags.forEach(tag => {
      res[tag] = (res[tag] ?? 0) + 1
    })
    return res
  }, {})
  let tags = Object.keys(tagMap).filter(tag => tag?.trim()).map(tag => ({ name: tag, postCount: tagMap[tag] }))
  tags = _.sortBy(tags, 'postCount').reverse()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: tags
    })
  }
})
