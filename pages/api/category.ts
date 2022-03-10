
import { run } from '../../utils'
import Blog from '../../models/blog'
import * as _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

const getCategories = run(async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await Blog.scan().attributes(['category']).exec()
  const categoryMap = posts.reduce((res: {[x: string]: number}, post) => {
    if (post.category) {
      res[post.category] = (res[post.category] ?? 0) + 1
    }
    return res
  }, {})
  let categories = Object.keys(categoryMap).filter(category => category?.trim()).map(tag => ({ name: tag, postCount: categoryMap[tag] }))
  categories = _.sortBy(categories, 'postCount').reverse()
  return res.setHeader('Cache-Control', 'max-age=1800, public')
    .status(200).json({
      code: 0,
      data: categories
    })
})

export default getCategories
