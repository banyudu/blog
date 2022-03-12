
import { run } from '../../../utils'
import Blog from '../../../models/blog'
import * as _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

const getPost = run(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string
  let post
  if (id) {
    const url = decodeURIComponent(id)
    post = await Blog.queryOne({ url }).exec()
  }
  res.setHeader('Cache-Control', 'max-age=1800, public')
  return {
    code: 0,
    data: post
  }
})

export default getPost
