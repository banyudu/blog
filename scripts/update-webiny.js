const { request, gql } = require('graphql-request')
const axios = require('axios')
const _ = require('lodash')
const dayjs = require('dayjs')

const updateBlogPostQuery = gql`
mutation UpdateBlogPost($revision: ID!, $data: BlogPostInput!) {
  createBlogPostFrom(revision: $revision, data: $data) {
		data {
      id,
    },
    error {
      message
    }
  }
}
`

const getBlogPosts = gql`
{
  listBlogPosts(where: {}, sort: [createdAt_DESC], limit: 100) {
    data {
      id,
      title,
      content,
      cover,
      category {
        id
      },
      url,
      extract,
      createdAt,
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
  const cmsPosts = (await request(graphqlEndpoint, getBlogPosts, {}, headers)).listBlogPosts.data || []
  const postMap = _.keyBy(posts, 'title')
  for (const post of cmsPosts) {
    console.log(post.title, ' ...')
    const postData = postMap[post.title]
    const content = await axios.get(`https://api.banyudu.com/blog/post/${encodeURIComponent(post.url)}`).then(res => res.data?.data?.content)
    const res = await request(graphqlEndpoint, updateBlogPostQuery, {
      revision: post.id,
      data: {
        title: post.title,
        extract: post.extract,
        content: content,
        cover: postData.cover ?? '',
        category: {
          id: '6239e4dff3bc4300099e5503#0002',
          modelId: 'category'
        },
        url: postData.url,
        createdAt: dayjs(postData.createdAt).format('YYYY-MM-DD'),
      }
    }, headers)

    const newId = res.createBlogPostFrom?.data?.id
    if (newId) {
      await request(graphqlEndpoint, publishBlogPostQuery, {
        revision: res.createBlogPostFrom?.data?.id
      }, headers)
    }
  }
}

sync().catch(console.error)
