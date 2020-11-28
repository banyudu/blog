import { APIGatewayProxyHandler } from 'aws-lambda'
import { run } from '../utils'
import Blog from '../models/blog'
import * as _ from 'lodash'

export const getCategories: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const posts = await Blog.scan().attributes(['category']).exec()
  const categoryMap = posts.reduce((res: {[x: string]: number}, post) => {
    if (post.category) {
      res[post.category] = (res[post.category] ?? 0) + 1
    }
    return res
  }, {})
  let categories = Object.keys(categoryMap).filter(category => category?.trim()).map(tag => ({ name: tag, postCount: categoryMap[tag] }))
  categories = _.sortBy(categories, 'postCount').reverse()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: categories
    })
  }
})
