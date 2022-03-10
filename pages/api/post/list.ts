
import { run } from '../../../utils'
import Blog from '../../../models/blog'
import * as _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

const getPosts = run(async (req: NextApiRequest, res: NextApiResponse) => {
  let posts = await Blog.scan().attributes(['filename', 'category', 'extract', 'cover', 'id', 'url', 'title', 'tags', 'createdAt', 'updatedAt']).exec()
  const query = req.query as Record<string, string> ?? {}
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

  res.setHeader('Cache-Control', 'max-age=1800, public')
    .status(200).json({
      code: 0,
      data: posts
    })
})

export default getPosts
