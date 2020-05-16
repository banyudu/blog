import { APIGatewayProxyHandler } from 'aws-lambda'
import { run, rest } from '../utils'
import { getGists as fetchGists } from '../services/gist'
import Blog from '../models/blog'
import Series from '../models/series'
import { StringObject, SeriesPost } from '../types'
import * as qs from 'qs'

export const getGists: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const [, gists] = await fetchGists()
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: gists
    })
  }
})

/**
 * 从Gist中同步博客。
 * 规则：凡是Gist中包含 *.blog.md 形式的文件的，均认为是博客文章。根据其最后更新时间，决定是否要同步
 */
export const syncGists: APIGatewayProxyHandler = run(async (event, _context) => { // eslint-disable-line @typescript-eslint/require-await
  const params = qs.parse(event.body)
  const [series, gists] = await fetchGists(new Date(params.since))

  // 因为同步间隔要小于每次同步时获取的时间范围，所以很有可能会重复获取，需要检查 updatedAt 决定是否需要更新
  // 又因为理论上来说，每次同步的时候只需要取一个较小的时间范围（如一天），所以记录数也不会有很多个（一般是个位数）。所以循环处理即可，比scan要快

  for (const seriesItem of series) {
    const id = `gist:${seriesItem.id}`
    let seriesRecord = await Series.get(id)
    if (!seriesRecord || seriesRecord.updatedAt < seriesItem.updatedAt) {
      const posts: SeriesPost[] = seriesItem.files.map(item => ({
        id: item.id,
        filename: item.filename,
        rawUrl: item.url
      }))
      seriesRecord = new Series({
        id,
        url: id,
        title: seriesItem.title,
        posts: JSON.stringify(posts),
        createdAt: seriesItem.createdAt,
        updatedAt: seriesItem.updatedAt
      })
      await seriesRecord.save()
    }
  }

  for (const gist of gists) {
    const id = `gist:${gist.id}`
    let record = await Blog.get(id)
    if (!record || record.updatedAt < gist.updatedAt) {
      if (!record) {
        const arr = gist.filename.split('.')
        arr.pop()
        arr.pop()
        const basename = arr.join('.')
        record = new Blog({
          id,
          title: gist.title,
          content: '',
          extract: '',
          url: `${basename}.${gist.id.substr(0, 6)}`,
          filename: gist.filename,
          category: 'other',
          series: gist.series,
          tags: '',
          createdAt: gist.createdAt,
          updatedAt: gist.updatedAt
        })
      }
      // 需要更新
      const markdownRes = await rest.get(gist.url)
      record.content = markdownRes.data
      // 从markdown中提取 cateogory、tags、extract信息

      const meta = parseMarkdownComments(record.content)
      record.category = meta.category || ''
      record.extract = meta.extract || ''
      record.tags = (meta.tags || '').split(/[, ]/).join('|')
    }
    await record.save()
  }
  // TODO: filter by database
  return {
    statusCode: 200,
    body: JSON.stringify({
      code: 0,
      data: gists
    })
  }
})

// 解析Markdown中的注释
const MARKDOWN_COMMENT_REGEX = /^\s*\[\/\/\]:\s+#\s+["(]([^:]+)\s*:\s*(.+)[")]\s*$/
const parseMarkdownComments = (markdown: string): StringObject => {
  // markdown中的注释，形如以下形式：
  // 1. [//]: # "category: serverless"
  // 2. [//]: # (category: serverless)
  const result: StringObject = {}
  const lines = markdown.split('\n')
  for (const line of lines) {
    const match = line.match(MARKDOWN_COMMENT_REGEX)
    if (match) {
      result[match[1]] = match[2]
    }
  }
  return result
}
