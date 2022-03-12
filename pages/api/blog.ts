
import { run } from '../../utils'
import Blog from '../../models/blog'
import { NextApiRequest, NextApiResponse } from 'next'

const getBlogs = run(async (req: NextApiRequest, res: NextApiResponse) => {
  const blogs = await Blog.scan().exec()
  return {
    code: 0,
    data: blogs
  }
})

export default getBlogs
