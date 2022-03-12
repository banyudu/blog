
import { run } from '../../utils'
import Blog from '../../models/blog'
import * as _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

const getTags = run(async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await Blog.scan().attributes(['tags']).exec()
  const tagMap = posts.reduce((res: { [x: string]: number }, post) => {
    const tags = (post.tags ?? '').split('|')
    tags.forEach(tag => {
      res[tag] = (res[tag] ?? 0) + 1
    })
    return res
  }, {})
  let tags = Object.keys(tagMap).filter(tag => tag?.trim()).map(tag => ({ name: tag, postCount: tagMap[tag] }))
  tags = _.sortBy(tags, 'postCount').reverse()
  res.setHeader('Cache-Control', 'max-age=1800, public')
  return {
    code: 0,
    data: tags
  }
})

export default getTags
