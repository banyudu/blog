import { rest } from '../utils'
import { Gist } from '../types'

const BLOG_GIST_REGEX = /(.+)\.blog\.md$/

const ONE_DAY = 24 * 60 * 60 * 1000

export const getGists = async (since?: Date): Promise<Gist[]> => {
  if (!since || isNaN(since.getTime())) {
    since = new Date(new Date().getTime() - ONE_DAY)
  }
  const res = await rest.get('https://api.github.com/users/banyudu/gists', {
    params: { since }
  })

  const result: Gist[] = []

  for (const gist of res.data || []) {
    const files = gist.files || {}
    for (const filename in files) {
      if (BLOG_GIST_REGEX.test(filename)) {
        const id = gist.id
        const url = files[filename].raw_url
        const title = gist.description
        const createdAt = new Date(gist.created_at)
        const updatedAt = new Date(gist.updated_at)
        result.push({ id, url, title, createdAt, updatedAt, filename })
      }
    }
  }
  return result
}
