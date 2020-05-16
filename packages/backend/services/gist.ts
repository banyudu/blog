import { rest, debug } from '../utils'
import { GistFile, GistSeries } from '../types'

const BLOG_GIST_REGEX = /(.+)\.blog\.md$/
const SERIES_GIST_REGEX = /(.+)\.series\.md$/

const ONE_DAY = 24 * 60 * 60 * 1000

export const getGists = async (since?: Date): Promise<[GistSeries[], GistFile[]]> => {
  if (!since || isNaN(since.getTime())) {
    since = new Date(new Date().getTime() - ONE_DAY)
  }
  const res = await rest.get('https://api.github.com/users/banyudu/gists', {
    params: { since }
  })

  const files: GistFile[] = []
  const series: GistSeries[] = []

  for (const gist of res.data || []) {
    let seriesItem: GistSeries | undefined
    const gistFiles = gist.files || {}
    for (const filename in gistFiles) {
      const url = gistFiles[filename].raw_url
      const gistTitle = gist.description
      const createdAt = new Date(gist.created_at)
      const updatedAt = new Date(gist.updated_at)
      if (BLOG_GIST_REGEX.test(filename)) {
        const id = gist.id
        files.push({ id, url, title: gistTitle, createdAt, updatedAt, filename })
      } else if (SERIES_GIST_REGEX.test(filename)) {
        if (!seriesItem) {
          seriesItem = {
            id: gist.id,
            title: gistTitle,
            files: [],
            createdAt,
            updatedAt
          }
        }
        const match = filename.match(SERIES_GIST_REGEX)
        const basename = match[1]
        const id = [gist.id, basename].join(':') // One gist, multiple files. Add filename to id
        const newFile: GistFile = { id, url, series: `gist:${gist.id}`, title: [gistTitle, basename].join(' - '), filename }
        files.push(newFile)
        seriesItem.files.push(newFile)
      }
    }
    if (seriesItem) {
      series.push(seriesItem)
    }
  }
  debug('series are: ', series)
  debug('files are: ', files)
  return [series, files]
}
