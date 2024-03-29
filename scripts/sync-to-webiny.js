const { request, gql } = require('graphql-request')
const axios = require('axios')
const dayjs = require('dayjs')

const createBlogPostQuery = gql`
mutation CreateBlogPost($data: BlogPostInput!) {
  createBlogPost(data: $data) {
		data {
      id,
      title
    },
    error {
      message
    }
  }
}
`

const publishBlogPostQuery = gql`
mutation Publish ($revision: ID!) {
  publishBlogPost(revision: $revision) {
    data {
      id,
      title
    },
    error {
      message
    }
  }
}
`

const headers = {
  Authorization: process.env.WEBINY_TOKEN
}

const graphqlEndpoint = 'https://cmsapi.banyudu.com/cms/manage/zh-Hans-CN'

const sync = async () => {
  const posts = (await axios.get('https://api.banyudu.com/blog/posts')).data?.data ?? []
  for (const post of posts) {
    const { data } = await request(graphqlEndpoint, createBlogPostQuery, {
      data: {
        title: post.title,
        extract: post.extract,
        content: post.content,
        cover: post.cover ?? '',
        category: {
          id: '6239e4dff3bc4300099e5503#0002',
          modelId: 'category'
        },
        url: post.url,
        createdAt: dayjs(post.createdAt).format('YYYY-MM-DD'),
      }
    }, headers)
    const id = data?.createBlogPost?.data?.id
    if (id) {
      await request(graphqlEndpoint, publishBlogPostQuery, {
        revision: id
      }, headers)
    }
  }
}

sync().catch(console.error)
